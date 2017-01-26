import solfege from "solfegejs";
import Pad from "../gamepad/Pad";
import PadSnes from "../gamepad/PadSnes";
import Combo from "../gamepad/Combo";

/**
 * The access points of the virtual gamepads
 */
export default class Gamepad
{
    /**
     * Constructor
     */
    constructor()
    {
        this.pads = new Map;
    }

    /**
     * Connect a new virtual gamepad
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *connect(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "POST, HEAD, OPTIONS");

        // Get the gamepad type
        let padType = yield request.getRawBody();
        padType = padType.toString();


        // Find an index
        let index;
        let indexMax = 4;
        for (index = 1; index <= indexMax; index++) {
            if (!this.pads.has(index)) {
                break;
            }
        }
        if (index > indexMax) {
            response.status = 403;
            response.parameters = {
                error: "Too many gamepads"
            }
            return;
        }

        // Create the new gamepad
        // @todo Create a factory
        let pad;
        switch (padType) {
            default:
            case "snes":
                pad = new PadSnes(index);
                break;
        }

        yield pad.connect();
        this.pads.set(index, pad);
        response.status = 200;
        response.parameters = {
            message: `GamePad ${index} connected`,
            index: index
        };
    }

    /**
     * Disconnect a virtual gamepad
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *disconnect(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "DELETE, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        this.pads.delete(padIndex);
        yield pad.disconnect();

        response.status = 200;
        response.parameters = {
            message: `GamePad ${padIndex} disconnected`
        };
    }

    /**
     * Set the state of A button
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setButtonA(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeButton(PadSnes.BUTTON_A, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of B button
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setButtonB(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeButton(PadSnes.BUTTON_B, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of X button
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setButtonX(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeButton(PadSnes.BUTTON_X, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of Y button
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setButtonY(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeButton(PadSnes.BUTTON_Y, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of L button
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setButtonL(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeButton(PadSnes.BUTTON_L, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of R button
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setButtonR(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeButton(PadSnes.BUTTON_R, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of SELECT button
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setButtonSelect(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeButton(PadSnes.BUTTON_SELECT, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }


    /**
     * Set the state of START button
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setButtonStart(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeButton(PadSnes.BUTTON_START, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of the direction "none"
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setDirectionNone(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        yield pad.executeDirection(PadSnes.DIRECTION_NONE);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of the direction "left"
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setDirectionLeft(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeDirection(PadSnes.DIRECTION_LEFT, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of the direction "right"
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setDirectionRight(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeDirection(PadSnes.DIRECTION_RIGHT, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of the direction "up"
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setDirectionUp(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeDirection(PadSnes.DIRECTION_UP, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Set the state of the direction "down"
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setDirectionDown(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "PUT, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let value = yield request.getRawBody();
        value = value.toString();

        yield pad.executeDirection(PadSnes.DIRECTION_DOWN, value);

        response.status = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Create a combo
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *createCombo(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "POST, HEAD, OPTIONS");

        let padIndex = request.getParameter("index");
        padIndex = parseInt(padIndex);

        if (!this.pads.has(padIndex)) {
            response.status = 404;
            response.parameters = {
                error: `Gamepad ${padIndex} not found`
            };
            return;
        }

        let pad = this.pads.get(padIndex);
        let comboJson = yield request.getRawBody();
        comboJson = comboJson.toString();


        // Parse the combo
        let combo = new Combo(pad);
        try {
            yield combo.parseJson(comboJson);
            yield combo.execute();
        } catch (error) {
            console.error(error);

            response.status = 400;
            response.parameters = {
                error: "Bad request: " + error
            };
            return;
        }

        // Success
        response.status = 200;
        response.parameters = {
            success: true
        };
    }
}
