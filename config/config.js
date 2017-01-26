var packageSettings = require(__dirname + "/../package");
var routes = require("./routes");

var configuration = {
    api:
    {
        mainConfigurationFilePath: "/recalbox/share/system/recalbox.conf",
        biosDirectoryPath: "/recalbox/share/bios",
        romsDirectoryPath: "/recalbox/share/roms",
        emulationstationSettingPath: "/recalbox/share/system/.emulationstation/es_settings.cfg",
        emulatorLauncherPath: "/usr/lib/python2.7/site-packages/configgen/emulatorlauncher.pyc"
    },

    // Command line configuration
    console:
    {
        title: "Recalbox API " + packageSettings.version
    },

    // Server configuration
    server: {
        port: 1337,
        middlewares: [
            // Response formatter
            // @todo Create a project for that
            "@api.formatMiddleware",

            // The router to handle URIs
            "@router.middleware"
        ]
    },

    // Configuration of the router bundle
    router: {
        // The routes
        routes: routes
    }

};

// Override the configuration with the file parameters.json
try {
    var parameters = require(__dirname + "/parameters.json");

    if (parameters.port) {
        configuration.server.port = parameters.port;
    }

    if (parameters.biosDirectoryPath) {
        configuration.api.biosDirectoryPath = parameters.biosDirectoryPath;
    }

    if (parameters.romsDirectoryPath) {
        configuration.api.romsDirectoryPath = parameters.romsDirectoryPath;
    }
} catch (error) {
}

// Expose the configuration
module.exports = configuration;
