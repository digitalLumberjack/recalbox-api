import solfege from "solfegejs";
import ioctl from "ioctl";
import Struct from "struct";
import Pad from "./Pad";
import uinput from "./lib/uinput";

/**
 * A virtual gamepad for SNES
 *
 * @see https://github.com/miroof/node-virtual-gamepads
 */
export default class PadSnes extends Pad
{
    /**
     * Constructor
     *
     * @param   {integer}   index   The gamepad index
     */
    constructor(index:int8)
    {
        super(index);

        this.uinputFile;
    }

    /**
     * The identifier of the direction NONE
     */
    static get DIRECTION_NONE()
    {
        return "none";
    }

    /**
     * The identifier of the direction LEFT
     */
    static get DIRECTION_LEFT()
    {
        return "left";
    }

    /**
     * The identifier of the direction RIGHT
     */
    static get DIRECTION_RIGHT()
    {
        return "right";
    }

    /**
     * The identifier of the direction UP
     */
    static get DIRECTION_UP()
    {
        return "up";
    }

    /**
     * The identifier of the direction DOWN
     */
    static get DIRECTION_DOWN()
    {
        return "down";
    }

    /**
     * The identifier of the button A
     */
    static get BUTTON_A()
    {
        return "a";
    }

    /**
     * The identifier of the button B
     */
    static get BUTTON_B()
    {
        return "b";
    }

    /**
     * The identifier of the button X
     */
    static get BUTTON_X()
    {
        return "x";
    }

    /**
     * The identifier of the button Y
     */
    static get BUTTON_Y()
    {
        return "y";
    }

    /**
     * The identifier of the button L
     */
    static get BUTTON_L()
    {
        return "tl";
    }

    /**
     * The identifier of the button R
     */
    static get BUTTON_R()
    {
        return "tr";
    }

    /**
     * The identifier of the button SELECT
     */
    static get BUTTON_SELECT()
    {
        return "select";
    }

    /**
     * The identifier of the button START
     */
    static get BUTTON_START()
    {
        return "start";
    }


    /**
     * Connect the gamepad
     */
    *connect()
    {
        this.uinputFile = yield solfege.util.Node.fs.open("/dev/uinput", "w+");

        // Initialize buttons
        ioctl(this.uinputFile, uinput.UI_SET_EVBIT, uinput.EV_KEY);
        ioctl(this.uinputFile, uinput.UI_SET_KEYBIT, uinput.BTN_A);
        ioctl(this.uinputFile, uinput.UI_SET_KEYBIT, uinput.BTN_B);
        ioctl(this.uinputFile, uinput.UI_SET_KEYBIT, uinput.BTN_X);
        ioctl(this.uinputFile, uinput.UI_SET_KEYBIT, uinput.BTN_Y);
        ioctl(this.uinputFile, uinput.UI_SET_KEYBIT, uinput.BTN_TL);
        ioctl(this.uinputFile, uinput.UI_SET_KEYBIT, uinput.BTN_TR);
        ioctl(this.uinputFile, uinput.UI_SET_KEYBIT, uinput.BTN_START);
        ioctl(this.uinputFile, uinput.UI_SET_KEYBIT, uinput.BTN_SELECT);

        // Initialize directions
        ioctl(this.uinputFile, uinput.UI_SET_EVBIT, uinput.EV_ABS);
        ioctl(this.uinputFile, uinput.UI_SET_ABSBIT, uinput.ABS_X);
        ioctl(this.uinputFile, uinput.UI_SET_ABSBIT, uinput.ABS_Y);

        let input_id = Struct()
            .word16Sle('bustype')
            .word16Sle('vendor')
            .word16Sle('product')
            .word16Sle('version');

        let uinput_user_dev = Struct()
            .chars('name', uinput.UINPUT_MAX_NAME_SIZE)
            .struct('id', input_id)
            .word32Sle('ff_effects_max')
            .array('absmax', uinput.ABS_CNT, 'word32Sle')
            .array('absmin', uinput.ABS_CNT, 'word32Sle')
            .array('absfuzz', uinput.ABS_CNT, 'word32Sle')
            .array('absflat', uinput.ABS_CNT, 'word32Sle');

        uinput_user_dev.allocate();
        let buffer = uinput_user_dev.buffer();

        let uidev = uinput_user_dev.fields;

        uidev.name = `Pad SNES API ${this.padIndex}`
        uidev.id.bustype = uinput.BUS_USB
        uidev.id.vendor = 0x3
        uidev.id.product = 0x3
        uidev.id.version = 2

        uidev.absmax[uinput.ABS_X] = 255
        uidev.absmin[uinput.ABS_X] = 0
        uidev.absfuzz[uinput.ABS_X] = 0
        uidev.absflat[uinput.ABS_X] = 15

        uidev.absmax[uinput.ABS_Y] = 255
        uidev.absmin[uinput.ABS_Y] = 0
        uidev.absfuzz[uinput.ABS_Y] = 0
        uidev.absflat[uinput.ABS_Y] = 15

        try {
            yield solfege.util.Node.fs.write(this.uinputFile, buffer, 0, buffer.length, null);
            ioctl(this.uinputFile, uinput.UI_DEV_CREATE);
        } catch (error) {
            console.error("API Gamepad sendEvent error: " + error);

            yield solfege.util.Node.fs.close(this.uinputFile);
            this.uinputFile = undefined;
        }
    }

    /**
     * Disconnect the gamepad
     */
    *disconnect()
    {
        if (this.uinputFile) {
            ioctl(this.uinputFile, uinput.UI_DEV_DESTROY);
            yield solfege.util.Node.fs.close(this.uinputFile);
            this.uinputFile = undefined;
        }
    }

    /**
     * Execute an action on the direction
     *
     * @param   {string}    id      The identifier of the direction
     * @param   {string}    state   The state
     */
    *executeDirection(id:string, state?:string)
    {
        switch (id) {
            case PadSnes.DIRECTION_NONE:
                yield this.directionHorizontalNone();
                yield this.directionVerticalNone();
                break;

            case PadSnes.DIRECTION_LEFT:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.directionHorizontalLeft();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.directionHorizontalNone();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.directionHorizontalLeft();
                        yield this.directionHorizontalNone();
                }
                break;

            case PadSnes.DIRECTION_RIGHT:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.directionHorizontalRight();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.directionHorizontalNone();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.directionHorizontalRight();
                        yield this.directionHorizontalNone();
                }
                break;

            case PadSnes.DIRECTION_UP:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.directionVerticalUp();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.directionVerticalNone();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.directionVerticalUp();
                        yield this.directionVerticalNone();
                }
                break;

            case PadSnes.DIRECTION_DOWN:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.directionVerticalDown();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.directionVerticalNone();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.directionVerticalDown();
                        yield this.directionVerticalNone();
                }
                break;
        }
    }

    /**
     * Execute an action on a button
     *
     * @param   {string}    id      The identifier of the button
     * @param   {string}    state   The state
     */
    *executeButton(id:string, state?:string)
    {
        switch (id) {
            case PadSnes.BUTTON_A:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.pressButtonA();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.releaseButtonA();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.pressButtonA();
                        yield this.releaseButtonA();
                }
                break;

            case PadSnes.BUTTON_B:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.pressButtonB();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.releaseButtonB();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.pressButtonB();
                        yield this.releaseButtonB();
                }
                break;

            case PadSnes.BUTTON_X:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.pressButtonX();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.releaseButtonX();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.pressButtonX();
                        yield this.releaseButtonX();
                }
                break;

            case PadSnes.BUTTON_Y:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.pressButtonY();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.releaseButtonY();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.pressButtonY();
                        yield this.releaseButtonY();
                }
                break;

            case PadSnes.BUTTON_L:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.pressButtonL();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.releaseButtonL();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.pressButtonL();
                        yield this.releaseButtonL();
                }
                break;

            case PadSnes.BUTTON_R:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.pressButtonR();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.releaseButtonR();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.pressButtonR();
                        yield this.releaseButtonR();
                }
                break;

            case PadSnes.BUTTON_SELECT:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.pressButtonSelect();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.releaseButtonSelect();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.pressButtonSelect();
                        yield this.releaseButtonSelect();
                }
                break;

            case PadSnes.BUTTON_START:
                switch (state) {
                    case Pad.STATE_PRESSED:
                        yield this.pressButtonStart();
                        break;
                    case Pad.STATE_RELEASED:
                        yield this.releaseButtonStart();
                        break;
                    default:
                    case Pad.STATE_PRESSED_AND_RELEASED:
                        yield this.pressButtonStart();
                        yield this.releaseButtonStart();
                }
                break;
        }
    }


    /**
     * Press the A button
     */
    *pressButtonA()
    {
        yield this.sendEvent({type: 0x01, code: 0x130, value: 1});
    }

    /**
     * Release the A button
     */
    *releaseButtonA()
    {
        yield this.sendEvent({type: 0x01, code: 0x130, value: 0});
    }

    /**
     * Press the B button
     */
    *pressButtonB()
    {
        yield this.sendEvent({type: 0x01, code: 0x131, value: 1});
    }

    /**
     * Release the B button
     */
    *releaseButtonB()
    {
        yield this.sendEvent({type: 0x01, code: 0x131, value: 0});
    }

    /**
     * Press the X button
     */
    *pressButtonX()
    {
        yield this.sendEvent({type: 0x01, code: 0x133, value: 1});
    }

    /**
     * Release the X button
     */
    *releaseButtonX()
    {
        yield this.sendEvent({type: 0x01, code: 0x133, value: 0});
    }

    /**
     * Press the Y button
     */
    *pressButtonY()
    {
        yield this.sendEvent({type: 0x01, code: 0x134, value: 1});
    }

    /**
     * Release the Y button
     */
    *releaseButtonY()
    {
        yield this.sendEvent({type: 0x01, code: 0x134, value: 0});
    }

    /**
     * Press the L button
     */
    *pressButtonL()
    {
        yield this.sendEvent({type: 0x01, code: 0x136, value: 1});
    }

    /**
     * Release the L button
     */
    *releaseButtonL()
    {
        yield this.sendEvent({type: 0x01, code: 0x136, value: 0});
    }

    /**
     * Press the R button
     */
    *pressButtonR()
    {
        yield this.sendEvent({type: 0x01, code: 0x137, value: 1});
    }

    /**
     * Release the R button
     */
    *releaseButtonR()
    {
        yield this.sendEvent({type: 0x01, code: 0x137, value: 0});
    }

    /**
     * Press the Select button
     */
    *pressButtonSelect()
    {
        yield this.sendEvent({type: 0x01, code: 0x13a, value: 1});
    }

    /**
     * Release the Select button
     */
    *releaseButtonSelect()
    {
        yield this.sendEvent({type: 0x01, code: 0x13a, value: 0});
    }

    /**
     * Press the Start button
     */
    *pressButtonStart()
    {
        yield this.sendEvent({type: 0x01, code: 0x13b, value: 1});
    }

    /**
     * Release the Start button
     */
    *releaseButtonStart()
    {
        yield this.sendEvent({type: 0x01, code: 0x13b, value: 0});
    }

    /**
     * No direction
     */
    *directionNone()
    {
        yield this.directionHorizontalNone();
        yield this.directionVerticalNone();
    }

    /**
     * Left
     */
    *directionLeft()
    {
        yield this.directionHorizontalLeft();
        yield this.directionVerticalNone();
    }

    /**
     * Right
     */
    *directionRight()
    {
        yield this.directionHorizontalRight();
        yield this.directionVerticalNone();
    }

    /**
     * Up
     */
    *directionUp()
    {
        yield this.directionHorizontalNone();
        yield this.directionverticalUp();
    }

    /**
     * Down
     */
    *directionDown()
    {
        yield this.directionHorizontalNone();
        yield this.directionverticalDown();
    }

    /**
     * Horizontal direction to the left
     */
    *directionHorizontalLeft()
    {
        yield this.sendEvent({type: 0x03, code: 0x00, value: 0});
    }

    /**
     * Horizontal direction to the right
     */
    *directionHorizontalRight()
    {
        yield this.sendEvent({type: 0x03, code: 0x00, value: 255});
    }

    /**
     * Horizontal direction to middle
     */
    *directionHorizontalNone()
    {
        yield this.sendEvent({type: 0x03, code: 0x00, value: 127});
    }

    /**
     * Vertical direction to UP
     */
    *directionVerticalUp()
    {
        yield this.sendEvent({type: 0x03, code: 0x01, value: 0});
    }

    /**
     * Vertical direction to DOWN
     */
    *directionVerticalDown()
    {
        yield this.sendEvent({type: 0x03, code: 0x01, value: 255});
    }

    /**
     * Vertical direction to middle
     */
    *directionVerticalNone()
    {
        yield this.sendEvent({type: 0x03, code: 0x01, value: 127});
    }

    /**
     * Send an event
     *
     * @param   {Object}    event   The event object
     */
    *sendEvent(event)
    {
        if (!this.uinputFile) {
            return;
        }
      
        let input_event = Struct()
            .struct('time', Struct().word32Sle('tv_sec').word32Sle('tv_usec'))
            .word16Ule('type')
            .word16Ule('code')
            .word32Sle('value');
        input_event.allocate();

        let ev_buffer = input_event.buffer();
        let ev = input_event.fields;

        ev.type = event.type;
        ev.code = event.code;
        ev.value = event.value;
        ev.time.tv_sec = Math.round(Date.now() / 1000);
        ev.time.tv_usec = Math.round(Date.now() % 1000 * 1000);

        let input_event_end = Struct()
            .struct('time', Struct().word32Sle('tv_sec').word32Sle('tv_usec'))
            .word16Ule('type')
            .word16Ule('code')
            .word32Sle('value');
        input_event_end.allocate()
      
        let ev_end_buffer = input_event_end.buffer();
        let ev_end = input_event_end.fields;

        ev_end.type = 0;
        ev_end.code = 0;
        ev_end.value = 0;
        ev_end.time.tv_sec = Math.round(Date.now() / 1000);
        ev_end.time.tv_usec = Math.round(Date.now() % 1000 * 1000);

        try {
            yield solfege.util.Node.fs.write(this.uinputFile, ev_buffer, 0, ev_buffer.length, null);
            yield solfege.util.Node.fs.write(this.uinputFile, ev_end_buffer, 0, ev_end_buffer.length, null);
        } catch (error) {
            console.error("API Gamepad sendEvent error: " + error);
        }
    }
}
