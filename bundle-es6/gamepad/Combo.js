import Pad from "./Pad";

/**
 * A chain of actions for a gamepad
 */
export default class Combo
{
    /**
     * Constructor
     *
     * @param   {Pad}   pad     A gamepad
     */
    constructor(pad:Pad)
    {
        this.pad = pad;
        this.actions = [];
    }

    /**
     * Parse a combo content in JSON
     *
     * @param   {string}    json    Combo content
     */
    *parseJson(json:string)
    {
        // Convert JSON to object
        let actions = JSON.parse(json);
        if (!Array.isArray(actions)) {
            throw new Error("The content is not an array");
        }

        this.actions = actions;
    }

    /**
     * Execute actions
     */
    *execute()
    {
        for (let action of this.actions) {
            if (typeof action !== "object") {
                continue;
            }
            if (!action.hasOwnProperty("type")) {
                continue;
            }

            switch (action.type) {
                case "direction":
                    yield this.executeDirection(action);
                    break;
                case "button":
                    yield this.executeButton(action);
                    break;
                case "wait":
                    yield this.executeWait(action);
                    break;
            }
        }
    }

    /**
     * Execute a direction
     *
     * @param   {Object}    action  The parameters
     */
    *executeDirection(action:Object)
    {
        if (!action.hasOwnProperty("id")) {
            return;
        }
        if (!action.hasOwnProperty("state")) {
            return;
        }

        let id = action.id;
        let state = action.state;

        yield this.pad.executeDirection(id, state);
    }

    /**
     * Execute a button
     *
     * @param   {Object}    action  The parameters
     */
    *executeButton(action:Object)
    {
        if (!action.hasOwnProperty("id")) {
            return;
        }
        if (!action.hasOwnProperty("state")) {
            return;
        }

        let id = action.id;
        let state = action.state;

        yield this.pad.executeButton(id, state);
    }

    /**
     * Execute a wait
     *
     * @param   {Object}    action  The parameters
     */
    *executeWait(action:Object)
    {
        if (!action.hasOwnProperty("value")) {
            return;
        }

        let value = parseInt(action.value);

        yield this.wait(value);
    }

    /**
     * The generator version of setTimeout
     *
     * @param   {integer}   milliseconds    The milliseconds to wait
     */
    wait(milliseconds:uint32)
    {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, milliseconds);
        });
    }


}
