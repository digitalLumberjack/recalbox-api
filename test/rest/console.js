var fs = require("fs");
var solfege = require("solfegejs");
var cli = require("solfegejs-cli");
var server = require("solfegejs-server");
var router = require("solfegejs-server-router");
var Api = require("../../bundle/Api");

// Initialize the application
var application = new solfege.kernel.Application(__dirname + "/../../bundle");

// Add the external bundles
application.addBundle("console", new cli.Console);
application.addBundle("server", new server.HttpServer);
application.addBundle("router", new router.Router);

// Add the internal bundle
application.addBundle("api", new Api);

// Override the application configuration
var routes = require("../../config/routes");
var configuration = {
    api:
    {
        mainConfigurationFilePath: __dirname + "/share/system/recalbox.conf",
        biosDirectoryPath: __dirname + "/share/bios",
        romsDirectoryPath: __dirname + "/share/roms"
    },

    // Command line configuration
    console:
    {
        title: "Recalbox API"
    },


    // Server configuration
    server: {
        port: 1339,
        middlewares: [
            // Response formatter
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
application.overrideConfiguration(configuration);


// Start the application
if (process.argv.indexOf("spec") === -1) {
    application.start();
}

