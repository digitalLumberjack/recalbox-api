/**
 * An abstract Pad
 */
export default class Pad
{
    /**
     * Constructor
     *
     * @param   {integer}   index   The gamepad index
     */
    constructor(index:int8)
    {
        this.padIndex = index;
    }

    /**
     * Constant of the state "pressed"
     */
    static get STATE_PRESSED()
    {
        return "pressed";
    }

    /**
     * Constant of the state "released"
     */
    static get STATE_RELEASED()
    {
        return "released";
    }

    /**
     * Constant of the state "pressedAndReleased"
     */
    static get STATE_PRESSED_AND_RELEASED()
    {
        return "pressedAndReleased";
    }

    /**
     * Connect the gamepad
     */
    *connect()
    {
    }

    /**
     * Disconnect the gamepad
     */
    *disconnect()
    {
    }

    /**
     * Execute an action on the direction
     *
     * @param   {string}    id      The identifier of the direction
     * @param   {string}    state   The state
     */
    *executeDirection(id:string, state?:string)
    {
    }

    /**
     * Execute an action on a button
     *
     * @param   {string}    id      The identifier of the button
     * @param   {string}    state   The state
     */
    *executeButton(id:string, state?:string)
    {
    }
}
