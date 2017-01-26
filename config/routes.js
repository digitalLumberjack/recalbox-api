module.exports = [
    // The homepage
    {
        id: "home",
        url: "/",
        controller: "@api.controllers.Home",
        action: "index"
    },

    // The main configuration
    {
        id: "configuration",
        url: "/configuration",
        controller: "@api.controllers.Configuration",
        action: "getConfiguration",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "configuration:update",
        url: "/configuration",
        controller: "@api.controllers.Configuration",
        action: "setConfiguration",
        policies: ["methodIsPut"]
    },

    // Miscellaneous
    {
        id: "hostname",
        url: "/hostname",
        controller: "@api.controllers.Configuration",
        action: "getHostname",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "hostname:update",
        url: "/hostname",
        controller: "@api.controllers.Configuration",
        action: "setHostname",
        policies: ["methodIsPut"]
    },
    {
        id: "locale",
        url: "/locale",
        controller: "@api.controllers.Configuration",
        action: "getLocale",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "locale:update",
        url: "/locale",
        controller: "@api.controllers.Configuration",
        action: "setLocale",
        policies: ["methodIsPut"]
    },
    {
        id: "keyboardlayout",
        url: "/keyboardlayout",
        controller: "@api.controllers.Configuration",
        action: "getKeyboardLayout",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "keyboardlayout:update",
        url: "/keyboardlayout",
        controller: "@api.controllers.Configuration",
        action: "setKeyboardLayout",
        policies: ["methodIsPut"]
    },
    {
        id: "timezone",
        url: "/timezone",
        controller: "@api.controllers.Configuration",
        action: "getTimezone",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "timezone:update",
        url: "/timezone",
        controller: "@api.controllers.Configuration",
        action: "setTimezone",
        policies: ["methodIsPut"]
    },
    {
        id: "updates.enabled",
        url: "/updates/enabled",
        controller: "@api.controllers.Configuration",
        action: "getUpdatesEnabled",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "updates.enabled:update",
        url: "/updates/enabled",
        controller: "@api.controllers.Configuration",
        action: "setUpdatesEnabled",
        policies: ["methodIsPut"]
    },

    // Kodi
    {
        id: "kodi",
        url: "/kodi",
        controller: "@api.controllers.Kodi",
        action: "getKodi"
    },
    {
        id: "kodi.enabled",
        url: "/kodi/enabled",
        controller: "@api.controllers.Kodi",
        action: "getKodiEnabled",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "kodi.enabled:update",
        url: "/kodi/enabled",
        controller: "@api.controllers.Kodi",
        action: "setKodiEnabled",
        policies: ["methodIsPut"]
    },
    {
        id: "kodi.atstartup",
        url: "/kodi/atstartup",
        controller: "@api.controllers.Kodi",
        action: "getKodiAtstartup",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "kodi.atstartup:update",
        url: "/kodi/atstartup",
        controller: "@api.controllers.Kodi",
        action: "setKodiAtstartup",
        policies: ["methodIsPut"]
    },
    {
        id: "kodi.xbutton",
        url: "/kodi/xbutton",
        controller: "@api.controllers.Kodi",
        action: "getKodiXbutton",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "kodi.xbutton:update",
        url: "/kodi/xbutton",
        controller: "@api.controllers.Kodi",
        action: "setKodiXbutton",
        policies: ["methodIsPut"]
    },

    // WIFI
    {
        id: "wifi",
        url: "/wifi",
        controller: "@api.controllers.Wifi",
        action: "getWifi"
    },
    {
        id: "wifi.enabled",
        url: "/wifi/enabled",
        controller: "@api.controllers.Wifi",
        action: "getWifiEnabled",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "wifi.enabled:update",
        url: "/wifi/enabled",
        controller: "@api.controllers.Wifi",
        action: "setWifiEnabled",
        policies: ["methodIsPut"]
    },
    {
        id: "wifi.ssid",
        url: "/wifi/ssid",
        controller: "@api.controllers.Wifi",
        action: "getWifiSsid",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "wifi.ssid:update",
        url: "/wifi/ssid",
        controller: "@api.controllers.Wifi",
        action: "setWifiSsid",
        policies: ["methodIsPut"]
    },
    {
        id: "wifi.key",
        url: "/wifi/key",
        controller: "@api.controllers.Wifi",
        action: "getWifiKey",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "wifi.key:update",
        url: "/wifi/key",
        controller: "@api.controllers.Wifi",
        action: "setWifiKey",
        policies: ["methodIsPut"]
    },

    // AUDIO
    {
        id: "audio",
        url: "/audio",
        controller: "@api.controllers.Audio",
        action: "getAudio",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "audio.device",
        url: "/audio/device",
        controller: "@api.controllers.Audio",
        action: "getAudioDevice",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "audio.device:update",
        url: "/audio/device",
        controller: "@api.controllers.Audio",
        action: "setAudioDevice",
        policies: ["methodIsPut"]
    },
    {
        id: "audio.volume",
        url: "/audio/volume",
        controller: "@api.controllers.Audio",
        action: "getAudioVolume",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "audio.volume:update",
        url: "/audio/volume",
        controller: "@api.controllers.Audio",
        action: "setAudioVolume",
        policies: ["methodIsPut"]
    },
    {
        id: "audio.bgmusic",
        url: "/audio/bgmusic",
        controller: "@api.controllers.Audio",
        action: "getAudioBackgroundMusic",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "audio.bgmusic:update",
        url: "/audio/bgmusic",
        controller: "@api.controllers.Audio",
        action: "setAudioBackgroundMusic",
        policies: ["methodIsPut"]
    },

    // Controllers
    {
        id: "controllers.ps3",
        url: "/controllers/ps3",
        controller: "@api.controllers.Controller",
        action: "getControllerPs3",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.ps3.enabled",
        url: "/controllers/ps3/enabled",
        controller: "@api.controllers.Controller",
        action: "getControllerPs3Enabled",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.ps3.enabled:update",
        url: "/controllers/ps3/enabled",
        controller: "@api.controllers.Controller",
        action: "setControllerPs3Enabled",
        policies: ["methodIsPut"]
    },
    {
        id: "controllers.ps3.driver",
        url: "/controllers/ps3/driver",
        controller: "@api.controllers.Controller",
        action: "getControllerPs3Driver",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.ps3.driver:update",
        url: "/controllers/ps3/driver",
        controller: "@api.controllers.Controller",
        action: "setControllerPs3Driver",
        policies: ["methodIsPut"]
    },
    {
        id: "controllers.xboxdrv",
        url: "/controllers/xboxdrv",
        controller: "@api.controllers.Controller",
        action: "getControllerXboxdrv",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.xboxdrv.enabled",
        url: "/controllers/xboxdrv/enabled",
        controller: "@api.controllers.Controller",
        action: "getControllerXboxdrvEnabled",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.xboxdrv.enabled:update",
        url: "/controllers/xboxdrv/enabled",
        controller: "@api.controllers.Controller",
        action: "setControllerXboxdrvEnabled",
        policies: ["methodIsPut"]
    },
    {
        id: "controllers.xboxdrv.nbcontrols",
        url: "/controllers/xboxdrv/nbcontrols",
        controller: "@api.controllers.Controller",
        action: "getControllerXboxdrvNbControls",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.xboxdrv.nbcontrols:update",
        url: "/controllers/xboxdrv/nbcontrols",
        controller: "@api.controllers.Controller",
        action: "setControllerXboxdrvNbControls",
        policies: ["methodIsPut"]
    },
    {
        id: "controllers.gpio",
        url: "/controllers/gpio",
        controller: "@api.controllers.Controller",
        action: "getControllerGpio",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.gpio.enabled",
        url: "/controllers/gpio/enabled",
        controller: "@api.controllers.Controller",
        action: "getControllerGpioEnabled",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.gpio.enabled:update",
        url: "/controllers/gpio/enabled",
        controller: "@api.controllers.Controller",
        action: "setControllerGpioEnabled",
        policies: ["methodIsPut"]
    },
    {
        id: "controllers.gpio.args",
        url: "/controllers/gpio/args",
        controller: "@api.controllers.Controller",
        action: "getControllerGpioArgs",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.gpio.args:update",
        url: "/controllers/gpio/args",
        controller: "@api.controllers.Controller",
        action: "setControllerGpioArgs",
        policies: ["methodIsPut"]
    },
    {
        id: "controllers.db9",
        url: "/controllers/db9",
        controller: "@api.controllers.Controller",
        action: "getControllerDb9",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.db9.enabled",
        url: "/controllers/db9/enabled",
        controller: "@api.controllers.Controller",
        action: "getControllerDb9Enabled",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.db9.enabled:update",
        url: "/controllers/db9/enabled",
        controller: "@api.controllers.Controller",
        action: "setControllerDb9Enabled",
        policies: ["methodIsPut"]
    },
    {
        id: "controllers.db9.args",
        url: "/controllers/db9/args",
        controller: "@api.controllers.Controller",
        action: "getControllerDb9Args",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.db9.args:update",
        url: "/controllers/db9/args",
        controller: "@api.controllers.Controller",
        action: "setControllerDb9Args",
        policies: ["methodIsPut"]
    },
    {
        id: "controllers.gamecon",
        url: "/controllers/gamecon",
        controller: "@api.controllers.Controller",
        action: "getControllerGamecon",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.gamecon.enabled",
        url: "/controllers/gamecon/enabled",
        controller: "@api.controllers.Controller",
        action: "getControllerGameconEnabled",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.gamecon.enabled:update",
        url: "/controllers/gamecon/enabled",
        controller: "@api.controllers.Controller",
        action: "setControllerGameconEnabled",
        policies: ["methodIsPut"]
    },
    {
        id: "controllers.gamecon.args",
        url: "/controllers/gamecon/args",
        controller: "@api.controllers.Controller",
        action: "getControllerGameconArgs",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "controllers.gamecon.args:update",
        url: "/controllers/gamecon/args",
        controller: "@api.controllers.Controller",
        action: "setControllerGameconArgs",
        policies: ["methodIsPut"]
    },


    // BIOS
    {
        id: "bios",
        url: "/bios",
        controller: "@api.controllers.Bios",
        action: "listBios",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "bios:add",
        url: "/bios",
        controller: "@api.controllers.Bios",
        action: "addBios",
        policies: ["methodIsPost"]
    },
    {
        id: "bios.file",
        url: "/bios/metadata/:fileName",
        controller: "@api.controllers.Bios",
        action: "getBiosFile",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "bios.file:download",
        url: "/bios/:fileName",
        controller: "@api.controllers.Bios",
        action: "downloadBiosFile",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "bios.file:delete",
        url: "/bios/:fileName",
        controller: "@api.controllers.Bios",
        action: "deleteBiosFile",
        policies: ["methodIsDelete"]
    },

    // Game systems
    {
        id: "systems",
        url: "/systems",
        controller: "@api.controllers.GameSystem",
        action: "getSystems",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "systems.default",
        url: "/systems/default",
        controller: "@api.controllers.GameSystem",
        action: "getSystemsDefault",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "systems.default.videomode",
        url: "/systems/default/videomode",
        controller: "@api.controllers.GameSystem",
        action: "getSystemsDefaultVideoMode",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "systems.default.videomode:update",
        url: "/systems/default/videomode",
        controller: "@api.controllers.GameSystem",
        action: "setSystemsDefaultVideoMode",
        policies: ["methodIsPut"]
    },
    {
        id: "systems.default.shaders",
        url: "/systems/default/shaders",
        controller: "@api.controllers.GameSystem",
        action: "getSystemsDefaultShaders",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "systems.default.shaders:update",
        url: "/systems/default/shaders",
        controller: "@api.controllers.GameSystem",
        action: "setSystemsDefaultShaders",
        policies: ["methodIsPut"]
    },
    {
        id: "systems.default.ratio",
        url: "/systems/default/ratio",
        controller: "@api.controllers.GameSystem",
        action: "getSystemsDefaultRatio",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "systems.default.ratio:update",
        url: "/systems/default/ratio",
        controller: "@api.controllers.GameSystem",
        action: "setSystemsDefaultRatio",
        policies: ["methodIsPut"]
    },
    {
        id: "systems.default.smooth",
        url: "/systems/default/smooth",
        controller: "@api.controllers.GameSystem",
        action: "getSystemsDefaultSmooth",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "systems.default.smooth:update",
        url: "/systems/default/smooth",
        controller: "@api.controllers.GameSystem",
        action: "setSystemsDefaultSmooth",
        policies: ["methodIsPut"]
    },
    {
        id: "systems.default.rewind",
        url: "/systems/default/rewind",
        controller: "@api.controllers.GameSystem",
        action: "getSystemsDefaultRewind",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "systems.default.rewind:update",
        url: "/systems/default/rewind",
        controller: "@api.controllers.GameSystem",
        action: "setSystemsDefaultRewind",
        policies: ["methodIsPut"]
    },
    {
        id: "system",
        url: "/systems/:id",
        controller: "@api.controllers.GameSystem",
        action: "getSystem",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.videomode",
        url: "/systems/:id/videomode",
        controller: "@api.controllers.GameSystem",
        action: "getSystemVideoMode",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.videomode:update",
        url: "/systems/:id/videomode",
        controller: "@api.controllers.GameSystem",
        action: "setSystemVideoMode",
        policies: ["methodIsPut"]
    },
    {
        id: "system.shaders",
        url: "/systems/:id/shaders",
        controller: "@api.controllers.GameSystem",
        action: "getSystemShaders",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.shaders:update",
        url: "/systems/:id/shaders",
        controller: "@api.controllers.GameSystem",
        action: "setSystemShaders",
        policies: ["methodIsPut"]
    },
    {
        id: "system.ratio",
        url: "/systems/:id/ratio",
        controller: "@api.controllers.GameSystem",
        action: "getSystemRatio",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.ratio:update",
        url: "/systems/:id/ratio",
        controller: "@api.controllers.GameSystem",
        action: "setSystemRatio",
        policies: ["methodIsPut"]
    },
    {
        id: "system.smooth",
        url: "/systems/:id/smooth",
        controller: "@api.controllers.GameSystem",
        action: "getSystemSmooth",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.smooth:update",
        url: "/systems/:id/smooth",
        controller: "@api.controllers.GameSystem",
        action: "setSystemSmooth",
        policies: ["methodIsPut"]
    },
    {
        id: "system.rewind",
        url: "/systems/:id/rewind",
        controller: "@api.controllers.GameSystem",
        action: "getSystemRewind",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.rewind:update",
        url: "/systems/:id/rewind",
        controller: "@api.controllers.GameSystem",
        action: "setSystemRewind",
        policies: ["methodIsPut"]
    },
    {
        id: "system.emulator",
        url: "/systems/:id/emulator",
        controller: "@api.controllers.GameSystem",
        action: "getSystemEmulator",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.emulator:update",
        url: "/systems/:id/emulator",
        controller: "@api.controllers.GameSystem",
        action: "setSystemEmulator",
        policies: ["methodIsPut"]
    },
    {
        id: "system.core",
        url: "/systems/:id/core",
        controller: "@api.controllers.GameSystem",
        action: "getSystemCore",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.core:update",
        url: "/systems/:id/core",
        controller: "@api.controllers.GameSystem",
        action: "setSystemCore",
        policies: ["methodIsPut"]
    },
    {
        id: "system.roms",
        url: "/systems/:id/roms",
        controller: "@api.controllers.GameSystem",
        action: "getRoms",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.roms:add",
        url: "/systems/:id/roms",
        controller: "@api.controllers.GameSystem",
        action: "addRom",
        policies: ["methodIsPost"]
    },
    {
        id: "system.roms.file",
        url: "/systems/:id/roms/metadata/:fileName",
        controller: "@api.controllers.GameSystem",
        action: "getRom",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.roms.file:download",
        url: "/systems/:id/roms/:fileName",
        controller: "@api.controllers.GameSystem",
        action: "downloadRom",
        policies: ["methodIsGetOrHead"]
    },
    {
        id: "system.roms.file:delete",
        url: "/systems/:id/roms/:fileName",
        controller: "@api.controllers.GameSystem",
        action: "deleteRom",
        policies: ["methodIsDelete"]
    },
    {
        id: "system.launcher",
        url: "/systems/:id/launcher",
        controller: "@api.controllers.GameSystem",
        action: "launchRom",
        policies: ["methodIsPost"]
    },

    // GAMEPADS
    {
        id: "gamepad.connect",
        url: "/gamepads",
        controller: "@api.controllers.Gamepad",
        action: "connect",
        policies: ["methodIsPost"]
    },
    {
        id: "gamepad.disconnect",
        url: "/gamepads/:index",
        controller: "@api.controllers.Gamepad",
        action: "disconnect",
        policies: ["methodIsDelete"]
    },
    {
        id: "gamepad.direction.none",
        url: "/gamepads/:index/directions/none",
        controller: "@api.controllers.Gamepad",
        action: "setDirectionNone",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.direction.left",
        url: "/gamepads/:index/directions/left",
        controller: "@api.controllers.Gamepad",
        action: "setDirectionLeft",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.direction.right",
        url: "/gamepads/:index/directions/right",
        controller: "@api.controllers.Gamepad",
        action: "setDirectionRight",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.direction.up",
        url: "/gamepads/:index/directions/up",
        controller: "@api.controllers.Gamepad",
        action: "setDirectionUp",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.direction.down",
        url: "/gamepads/:index/directions/down",
        controller: "@api.controllers.Gamepad",
        action: "setDirectionDown",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.button.a",
        url: "/gamepads/:index/buttons/a",
        controller: "@api.controllers.Gamepad",
        action: "setButtonA",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.button.b",
        url: "/gamepads/:index/buttons/b",
        controller: "@api.controllers.Gamepad",
        action: "setButtonB",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.button.x",
        url: "/gamepads/:index/buttons/x",
        controller: "@api.controllers.Gamepad",
        action: "setButtonX",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.button.y",
        url: "/gamepads/:index/buttons/y",
        controller: "@api.controllers.Gamepad",
        action: "setButtonY",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.button.tl",
        url: "/gamepads/:index/buttons/tl",
        controller: "@api.controllers.Gamepad",
        action: "setButtonL",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.button.tr",
        url: "/gamepads/:index/buttons/tr",
        controller: "@api.controllers.Gamepad",
        action: "setButtonR",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.button.select",
        url: "/gamepads/:index/buttons/select",
        controller: "@api.controllers.Gamepad",
        action: "setButtonSelect",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.button.start",
        url: "/gamepads/:index/buttons/start",
        controller: "@api.controllers.Gamepad",
        action: "setButtonStart",
        policies: ["methodIsPut"]
    },
    {
        id: "gamepad.combo",
        url: "/gamepads/:index/combo",
        controller: "@api.controllers.Gamepad",
        action: "createCombo",
        policies: ["methodIsPost"]
    },

    // DEVICE
    {
        id: "device.reboots:post",
        url: "/reboots",
        controller: "@api.controllers.Device",
        action: "requestReboot",
        policies: ["methodIsPost"]
    },
    {
        id: "device.shutdowns:post",
        url: "/shutdowns",
        controller: "@api.controllers.Device",
        action: "requestShutdown",
        policies: ["methodIsPost"]
    }

];

