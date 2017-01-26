import {spawn} from "child_process";
import solfege from "solfegejs";
import IniFile from "../utils/IniFile";
import config from "../../config/config";
import defaultValues from "../../config/recalboxDefaultValues.json";
import * as ControllerUtil from "../utils/ControllerUtil";


/**
 * The access points of the device
 */
export default class Device
{
    /**
     * Reboot the device
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *requestReboot(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "POST, HEAD, OPTIONS");

        let command = spawn("reboot");

        response.statusCode = 200;
        response.parameters = {
            success: true
        };
    }

    /**
     * Shutdown the device
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *requestShutdown(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "POST, HEAD, OPTIONS");

        let command = spawn("shutdown");

        response.statusCode = 200;
        response.parameters = {
            success: true
        };
    }
}

