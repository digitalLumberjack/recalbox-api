import solfege from "solfegejs";
import os from "os";
import fs from "fs";
import xml2js from "xml2js";
import * as ControllerUtil from "../utils/ControllerUtil";
import IniFile from "../utils/IniFile";
import defaultValues from "../../config/recalboxDefaultValues.json";

/**
 * The access points of the game systems
 */
export default class GameSystem
{
    /**
     * Get the system list
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystems(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
        let list = [
            "atari2600",
            "atari7800",
            "fba",
            "fba_libretro",
            "fds",
            "gamegear",
            "gb",
            "gba",
            "gbc",
            "gw",
            "lutro",
            "lynx",
            "mame",
            "mastersystem",
            "megadrive",
            "msx",
            "n64",
            "neogeo",
            "nes",
            "ngp",
            "pcengine",
            "prboom",
            "psx",
            "scummvm",
            "sega32x",
            "segacd",
            "sg1000",
            "snes",
            "vectrex",
            "virtualboy",
            "wswan"
        ];

        response.statusCode = 200;
        response.parameters = list;
    }

    /**
     * Get the default system settings
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemsDefault(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
        yield ControllerUtil.getMainConfigurationParameters(/^global\./, request, response);
    }

    /**
     * Get the default video mode
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemsDefaultVideoMode(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        yield ControllerUtil.getMainConfigurationParameterValue("global.videomode", request, response);
    }

    /**
     * Set the default video mode
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemsDefaultVideoMode(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        yield ControllerUtil.setMainConfigurationParameterValue("global.videomode", request, response);

        // Display the new value
        yield this.getSystemsDefaultVideoMode(request, response);
    }

    /**
     * Get the default shaders
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemsDefaultShaders(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        yield ControllerUtil.getMainConfigurationParameterValue("global.shaders", request, response);
    }

    /**
     * Set the default shaders
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemsDefaultShaders(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        yield ControllerUtil.setMainConfigurationParameterValue("global.shaders", request, response);

        // Display the new value
        yield this.getSystemsDefaultShaders(request, response);
    }

    /**
     * Get the default ratio
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemsDefaultRatio(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        yield ControllerUtil.getMainConfigurationParameterValue("global.ratio", request, response);
    }

    /**
     * Set the default ratio
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemsDefaultRatio(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        yield ControllerUtil.setMainConfigurationParameterValue("global.ratio", request, response);

        // Display the new value
        yield this.getSystemsDefaultRatio(request, response);
    }

    /**
     * Get the default smooth setting
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemsDefaultSmooth(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        yield ControllerUtil.getMainConfigurationParameterValue("global.smooth", request, response);
    }

    /**
     * Set the default smooth setting
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemsDefaultSmooth(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        yield ControllerUtil.setMainConfigurationParameterValue("global.smooth", request, response);

        // Display the new value
        yield this.getSystemsDefaultSmooth(request, response);
    }

    /**
     * Get the default rewind setting
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemsDefaultRewind(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        yield ControllerUtil.getMainConfigurationParameterValue("global.rewind", request, response);
    }

    /**
     * Set the default rewind setting
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemsDefaultRewind(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        yield ControllerUtil.setMainConfigurationParameterValue("global.rewind", request, response);

        // Display the new value
        yield this.getSystemsDefaultRewind(request, response);
    }


    /**
     * Get the system settings
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystem(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");
        let systemId = request.getParameter("id");

        // Extract the settings from the main configuration
        let iniFile = new IniFile(request.configuration.mainConfigurationFilePath);
        iniFile.setDefaultValues(defaultValues);
        let globalParameters = yield iniFile.getParameters(/^global\./);
        let systemParameters = yield iniFile.getParameters(new RegExp("^"+systemId+"."));

        // Merge the values
        let parameters = {};
        for (let key in globalParameters) {
            let newKey = key.replace("global", systemId);
            parameters[newKey] = globalParameters[key];
        }
        for (let key in systemParameters) {
            if (systemParameters[key]) {
                parameters[key] = systemParameters[key];
            }
        }

        response.statusCode = 200;
        response.parameters = parameters;
    }

    /**
     * Get the video mode of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemVideoMode(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".videomode";
        let fallbackName = "global.videomode";

        yield ControllerUtil.getMainConfigurationParameterValue(
            parameterName,
            request,
            response,
            fallbackName
        );
    }

    /**
     * Set the video mode of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemVideoMode(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".videomode";

        yield ControllerUtil.setMainConfigurationParameterValue(parameterName, request, response);

        // Display the new value
        yield this.getSystemVideoMode(request, response);
    }

    /**
     * Get the shaders of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemShaders(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".shaders";
        let fallbackName = "global.shaders";

        yield ControllerUtil.getMainConfigurationParameterValue(
            parameterName,
            request,
            response,
            fallbackName
        );
    }

    /**
     * Set the shaders of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemShaders(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".shaders";

        yield ControllerUtil.setMainConfigurationParameterValue(parameterName, request, response);

        // Display the new value
        yield this.getSystemShaders(request, response);
    }

    /**
     * Get the ratio of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemRatio(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".ratio";
        let fallbackName = "global.ratio";

        yield ControllerUtil.getMainConfigurationParameterValue(
            parameterName,
            request,
            response,
            fallbackName
        );
    }

    /**
     * Set the ratio of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemRatio(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".ratio";

        yield ControllerUtil.setMainConfigurationParameterValue(parameterName, request, response);

        // Display the new value
        yield this.getSystemRatio(request, response);
    }

    /**
     * Get the smooth setting of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemSmooth(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".smooth";
        let fallbackName = "global.smooth";

        yield ControllerUtil.getMainConfigurationParameterValue(
            parameterName,
            request,
            response,
            fallbackName
        );
    }

    /**
     * Set the smooth setting of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemSmooth(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".smooth";

        yield ControllerUtil.setMainConfigurationParameterValue(parameterName, request, response);

        // Display the new value
        yield this.getSystemSmooth(request, response);
    }

    /**
     * Get the rewind setting of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemRewind(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".rewind";
        let fallbackName = "global.rewind";

        yield ControllerUtil.getMainConfigurationParameterValue(
            parameterName,
            request,
            response,
            fallbackName
        );
    }

    /**
     * Set the rewind setting of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemRewind(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".rewind";

        yield ControllerUtil.setMainConfigurationParameterValue(parameterName, request, response);

        // Display the new value
        yield this.getSystemRewind(request, response);
    }

    /**
     * Get the emulator of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemEmulator(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".emulator";

        yield ControllerUtil.getMainConfigurationParameterValue(
            parameterName,
            request,
            response
        );
    }

    /**
     * Set the emulator of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemEmulator(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".emulator";

        yield ControllerUtil.setMainConfigurationParameterValue(parameterName, request, response);

        // Display the new value
        yield this.getSystemEmulator(request, response);
    }

    /**
     * Get the core of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getSystemCore(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".core";

        yield ControllerUtil.getMainConfigurationParameterValue(
            parameterName,
            request,
            response
        );
    }

    /**
     * Set the core of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *setSystemCore(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, PUT, OPTIONS");
        let systemId = request.getParameter("id");
        let parameterName = systemId+".core";

        yield ControllerUtil.setMainConfigurationParameterValue(parameterName, request, response);

        // Display the new value
        yield this.getSystemCore(request, response);
    }

    /**
     * Get the rom list of the specified system
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getRoms(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");

        let systemId = request.getParameter("id");
        let directoryPath = `${request.configuration.romsDirectoryPath}/${systemId}`;

        // Display the file list
        yield ControllerUtil.listDirectory(
            directoryPath,
            "rom",
            null,
            request,
            response
        );
    }

    /**
     * Add a ROM
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *addRom(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, POST, OPTIONS");

        let systemId = request.getParameter("id");
        let directoryPath = `${request.configuration.romsDirectoryPath}/${systemId}`;

        // Upload the file
        yield ControllerUtil.uploadFile(
            directoryPath,
            request,
            response
        );
    }

    /**
     * Get a ROM informations
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *getRom(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, OPTIONS");

        let systemId = request.getParameter("id");
        let fileName = request.getParameter("fileName");
        let directoryPath = `${request.configuration.romsDirectoryPath}/${systemId}`;

        yield ControllerUtil.getFileMetadata(
            directoryPath+"/"+fileName,
            request,
            response
        );
    }

    /**
     * Download a ROM
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *downloadRom(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, DELETE, OPTIONS");

        let systemId = request.getParameter("id");
        let fileName = request.getParameter("fileName");
        fileName = decodeURIComponent(fileName);
        let filePath = `${request.configuration.romsDirectoryPath}/${systemId}/${fileName}`;

        // Check if the file exists
        let exists = yield solfege.util.Node.fs.exists(filePath);
        if (!exists) {
            response.statusCode = 404;
            response.parameters = {
                error: `File not found: ${filePath}`
            };
            return;
        }

        // Read the file
        response.statusCode = 200;
        response.setHeader(
            "Content-disposition", 
            `attachment; filename=${fileName}`
        );
        let fileStream = fs.createReadStream(filePath);
        response.body = fileStream;
    }



    /**
     * Delete a ROM
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *deleteRom(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "GET, HEAD, DELETE, OPTIONS");

        let systemId = request.getParameter("id");
        let fileName = request.getParameter("fileName");
        let directoryPath = `${request.configuration.romsDirectoryPath}/${systemId}`;

        yield ControllerUtil.deleteFile(
            directoryPath+"/"+fileName,
            request,
            response
        );
    }

    /**
     * Launch a ROM
     *
     * @todo Refactor the logic into another class
     *
     * @public
     * @param   {solfege.bundle.server.Request}     request     The request
     * @param   {solfege.bundle.server.Response}    response    The response
     */
    *launchRom(request, response)
    {
        response.setHeader("Access-Control-Allow-Methods", "POST, HEAD, OPTIONS");

        // Get the file name
        let systemId = request.getParameter("id");
        let fileName = yield request.getRawBody();
        fileName = fileName.toString();

        // Initialize variables
        let emulatorLauncherPath = request.configuration.emulatorLauncherPath;
        let romsDirectoryPath = request.configuration.romsDirectoryPath;
        let emulationstationSettingPath = request.configuration.emulationstationSettingPath;
        let platform = os.platform();
        let architecture = os.arch();

        // Get EmulationStation settings
        let emulationstationSettingContent = yield solfege.util.Node.fs.readFile(emulationstationSettingPath);
        let xmlParser = new xml2js.Parser();
        let parseString = solfege.util.Function.createPromise(xmlParser.parseString);
        let emulationstationSetting = yield parseString(emulationstationSettingContent);
        let emulationstationSettingStrings = emulationstationSetting.config.string;
        let emulationstationSettingPlayers = [
            {name: "DEFAULT", guid: ""},
            {name: "DEFAULT", guid: ""},
            {name: "DEFAULT", guid: ""},
            {name: "DEFAULT", guid: ""}
        ];
        for (let emulationstationSettingString of emulationstationSettingStrings) {
            let name = emulationstationSettingString.$.name;
            let value = emulationstationSettingString.$.value;
            switch (name) {
                case "INPUT P1NAME":
                    emulationstationSettingPlayers[0].name = value;
                    break;

                case "INPUT P1GUID":
                    emulationstationSettingPlayers[0].guid = value;
                    break;

                case "INPUT P2NAME":
                    emulationstationSettingPlayers[1].name = value;
                    break;

                case "INPUT P2GUID":
                    emulationstationSettingPlayers[1].guid = value;
                    break;

                case "INPUT P3NAME":
                    emulationstationSettingPlayers[2].name = value;
                    break;

                case "INPUT P3GUID":
                    emulationstationSettingPlayers[2].guid = value;
                    break;

                case "INPUT P4NAME":
                    emulationstationSettingPlayers[3].name = value;
                    break;

                case "INPUT P4GUID":
                    emulationstationSettingPlayers[3].guid = value;
                    break;
            }
        }

        // Get available gamepads
        let availableGamepads = [];
        let joystickCount = yield solfege.util.Node.child_process.exec(`${__dirname}/../../libs/bin/joystickCount-${platform}-${architecture}`);
        for (let index = 0; index < joystickCount; index++) {
            let joystickGuid = yield solfege.util.Node.child_process.exec(`${__dirname}/../../libs/bin/joystickGuid-${platform}-${architecture} ${index}`);
            let joystickName = yield solfege.util.Node.child_process.exec(`${__dirname}/../../libs/bin/joystickName-${platform}-${architecture} ${index}`);
            let joystickDevicePath = `/dev/input/js${index}`;

            availableGamepads.push({
                index: index,
                guid: joystickGuid,
                name: joystickName,
                devicePath: joystickDevicePath
            });
        }


        // Set the launcher parameters
        // Use emulationstation setting first
        // Then complete with the available gamepads left
        let emulatorLauncherParameters = {
            system: systemId,
            rom: `${romsDirectoryPath}/${systemId}/${fileName}`
        };

        // Check the name and guid
        for (let settingPlayerIndex in emulationstationSettingPlayers) {
            let settingPlayer = emulationstationSettingPlayers[settingPlayerIndex];
            let launcherPlayerId = parseInt(settingPlayerIndex) + 1;

            for (let availableGamepadIndex in availableGamepads) {
                let availableGamepad = availableGamepads[availableGamepadIndex];

                if (emulatorLauncherParameters.hasOwnProperty(`p${launcherPlayerId}index`)) {
                    continue;
                }
                if (settingPlayer.name !== availableGamepad.name) {
                    continue;
                }
                if (settingPlayer.guid !== availableGamepad.guid) {
                    continue;
                }

                emulatorLauncherParameters[`p${launcherPlayerId}index`] = availableGamepad.index;
                emulatorLauncherParameters[`p${launcherPlayerId}guid`] = availableGamepad.guid;
                emulatorLauncherParameters[`p${launcherPlayerId}name`] = availableGamepad.name;
                emulatorLauncherParameters[`p${launcherPlayerId}devicepath`] = availableGamepad.devicePath;
                availableGamepads.splice(availableGamepadIndex, 1);
            }
        }

        // Check the name only
        for (let settingPlayerIndex in emulationstationSettingPlayers) {
            let settingPlayer = emulationstationSettingPlayers[settingPlayerIndex];
            let launcherPlayerId = parseInt(settingPlayerIndex) + 1;

            for (let availableGamepadIndex in availableGamepads) {
                let availableGamepad = availableGamepads[availableGamepadIndex];

                if (emulatorLauncherParameters.hasOwnProperty(`p${launcherPlayerId}index`)) {
                    continue;
                }
                if (settingPlayer.name !== availableGamepad.name) {
                    continue;
                }

                emulatorLauncherParameters[`p${launcherPlayerId}index`] = availableGamepad.index;
                emulatorLauncherParameters[`p${launcherPlayerId}guid`] = availableGamepad.guid;
                emulatorLauncherParameters[`p${launcherPlayerId}name`] = availableGamepad.name;
                emulatorLauncherParameters[`p${launcherPlayerId}devicepath`] = availableGamepad.devicePath;
                availableGamepads.splice(availableGamepadIndex, 1);
            }
        }

        // Complete with the available gamepads left
        for (let settingPlayerIndex in emulationstationSettingPlayers) {
            let launcherPlayerId = parseInt(settingPlayerIndex) + 1;

            for (let availableGamepadIndex in availableGamepads) {
                let availableGamepad = availableGamepads[availableGamepadIndex];

                if (emulatorLauncherParameters.hasOwnProperty(`p${launcherPlayerId}index`)) {
                    continue;
                }

                emulatorLauncherParameters[`p${launcherPlayerId}index`] = availableGamepad.index;
                emulatorLauncherParameters[`p${launcherPlayerId}guid`] = availableGamepad.guid;
                emulatorLauncherParameters[`p${launcherPlayerId}name`] = availableGamepad.name;
                emulatorLauncherParameters[`p${launcherPlayerId}devicepath`] = availableGamepad.devicePath;
                availableGamepads.splice(availableGamepadIndex, 1);
            }
        }


        // Execute the command
        let command = `python ${emulatorLauncherPath}`;
        for (let parameterName in emulatorLauncherParameters) {
            command += ` -${parameterName} "${emulatorLauncherParameters[parameterName]}"`;
        }
        solfege.util.Node.child_process.exec(command);

        // Returns the command
        response.status = 200;
        response.parameters = {
            success: true,
            executed: command
        };
    }

}

