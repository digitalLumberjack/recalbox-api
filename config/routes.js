module.exports = [
    {
        id: "home",
        url: "/",
        controller: "@api.controllers.Home",
        action: "index"
    },
    {
        id: "configuration",
        url: "/configuration",
        controller: "@api.controllers.Configuration",
        action: "getConfiguration"
    },
    {
        id: "kodi",
        url: "/kodi",
        controller: "@api.controllers.Configuration",
        action: "getKodi"
    },
    {
        id: "kodi.enabled",
        url: "/kodi/enabled",
        controller: "@api.controllers.Configuration",
        action: "getKodiEnabled",
        policies: ["methodIsGet"]
    },
    {
        id: "kodi.enabled:update",
        url: "/kodi/enabled",
        controller: "@api.controllers.Configuration",
        action: "setKodiEnabled",
        policies: ["methodIsPut"]
    }
];

