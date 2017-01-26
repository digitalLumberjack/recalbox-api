Recalbox API
============

REST API for [recalbox](http://recalbox.com)


Installation
------------

- [Install the service on RecalboxOS](documentation/activate-on-recalbox.md)
- [Install the developer environment](documentation/install-dev-environment.md)



API
---

### Available formats

| Format | MIME type          |
| ------ | ------------------ |
| `text` | `text/plain`       |
| `json` | `application/json` |
| `xml`  | `application/xml`  |

To get a specific response format, you have to send the HTTP header `Accept` with a listed MIME type above.


### Pagination

On endpoints that return a collection, you can paginate the result with these queries :

| name  | Type    | Default | Description |
| ----- | ------- | ------- |------------ | 
| page  | Integer | `1`     | The page (start at `1`) |
| count | Integer | `25`    | The amount of item to return |
| range | String  | `null`  | The index range to return |

The response returns the items with 2 headers :

- `Content-Range`
- `Accept-Range`


### Endpoints

| HTTP VERB      | Endpoint                           | Description |
|:-------------- | ---------------------------------- | ----------- |
| `GET`          | `/audio`                           | Get audio settings |
| `GET` `PUT`    | `/audio/bgmusic`                   | Enable/disable sounds in EmulationStation |
| `GET` `PUT`    | `/audio/device`                    | The audio device |
| `GET` `PUT`    | `/audio/volume`                    | The volume |
| `GET` `POST`   | `/bios`                            | The bios list for all systems |
| `GET` `DELETE` | `/bios/:fileName`                  | The BIOS file |
| `GET`          | `/bios/metadata/:fileName`         | The file information |
| `GET` `PUT`    | `/configuration`                   | [The main configuration](documentation/api/configuration.md) |
| `GET`          | `/controllers/db9`                 | Get DB9 driver settings |
| `GET` `PUT`    | `/controllers/db9/enabled`         | Enable/disable DB9 driver |
| `GET` `PUT`    | `/controllers/db9/args`            | DB9 driver arguments |
| `GET`          | `/controllers/gamecon`             | Get gamecon driver settings |
| `GET` `PUT`    | `/controllers/gamecon/enabled`     | Enable/disable gamecon driver |
| `GET` `PUT`    | `/controllers/gamecon/args`        | Gamecon driver arguments |
| `GET`          | `/controllers/gpio`                | Get GPIO settings |
| `GET` `PUT`    | `/controllers/gpio/enabled`        | Enable/disable controllers on GPIO |
| `GET` `PUT`    | `/controllers/gpio/args`           | `mk_gpio` arguments |
| `GET`          | `/controllers/ps3`                 | Get PS3 controllers settings |
| `GET` `PUT`    | `/controllers/ps3/enabled`         | Enable/disable PS3 controllers support |
| `GET` `PUT`    | `/controllers/ps3/driver`          | PS3 controllers driver |
| `GET`          | `/controllers/xboxdrv`             | Get xboxdrv driver settings |
| `GET` `PUT`    | `/controllers/xboxdrv/enabled`     | Enable/disable xboxdrv driver |
| `GET` `PUT`    | `/controllers/xboxdrv/nbcontrols`  | The amount of controllers to use with xboxdrv |
| `GET` `PUT`    | `/hostname`                        | The hostname |
| `GET` `PUT`    | `/keyboardlayout`                  | The keyboard layout |
| `GET`          | `/kodi`                            | Get Kodi settings |
| `GET` `PUT`    | `/kodi/atstartup`                  | Start Kodi at launch |
| `GET` `PUT`    | `/kodi/enabled`                    | Enable/disable Kodi |
| `GET` `PUT`    | `/kodi/xbutton`                    | Set x button shortcut |
| `GET` `PUT`    | `/locale`                          | The locale |
| `POST`         | `/reboots`                         | [Reboot requests of the operating system](documentation/api/reboots.md) |
| `POST`         | `/shutdowns`                       | [Shutdown requests of the operating system](documentation/api/shutdowns.md) |
| `GET`          | `/systems`                         | The system list |
| `GET`          | `/systems/default`                 | The default system settings |
| `GET` `PUT`    | `/systems/default/ratio`           | The default ratio |
| `GET` `PUT`    | `/systems/default/rewind`          | The default rewind value |
| `GET` `PUT`    | `/systems/default/shaders`         | The default shaders |
| `GET` `PUT`    | `/systems/default/smooth`          | The default smooth value |
| `GET` `PUT`    | `/systems/default/videomode`       | The default resolution |
| `GET`          | `/systems/:id`                     | The settings of the specified system |
| `GET` `PUT`    | `/systems/:id/core`                | The core of the specified system |
| `GET` `PUT`    | `/systems/:id/emulator`            | The emulator of the specified system |
| `GET` `PUT`    | `/systems/:id/ratio`               | The ratio of the specified system |
| `GET` `PUT`    | `/systems/:id/rewind`              | Enable/disable the rewind of the specified system |
| `GET` `POST`   | `/systems/:id/roms`                | The game list of the specified system |
| `GET` `DELETE` | `/systems/:id/roms/:game`          | The game file |
| `GET`          | `/systems/:id/roms/metadata/:game` | The game informations |
| `GET` `PUT`    | `/systems/:id/shaders`             | The shaders of the specified system |
| `GET` `PUT`    | `/systems/:id/smooth`              | Enable/disable the smooth of the specified system |
| `GET` `PUT`    | `/systems/:id/videomode`           | The game resolution of the specified system |
| `POST`         | `/systems/:id/launcher`            | [Launch a game](documentation/api/system-launch-game.md) |
| `GET` `PUT`    | `/timezone`                        | The timezone |
| `GET` `PUT`    | `/updates/enabled`                 | Enable/disable the updates check at startup |
| `GET`          | `/wifi`                            | Get wifi settings |
| `GET` `PUT`    | `/wifi/enabled`                    | Enable/disable wifi |
| `GET` `PUT`    | `/wifi/key`                        | Wifi key |
| `GET` `PUT`    | `/wifi/ssid`                       | Wifi SSID |
| `POST`         | `/gamepads`                        | [Create (and connect) a virtual gamepad](documentation/api/gamepads.md) |
| `DELETE`       | `/gamepads/:index`                 | [Delete (and disconnect) a virtual gamepad](documentation/api/gamepads.md) |
| `PUT`          | `/gamepads/:index/buttons/a`       | [Set A button state on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/buttons/b`       | [Set B button state on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/buttons/x`       | [Set X button state on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/buttons/y`       | [Set Y button state on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/buttons/tl`      | [Set L button state on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/buttons/tr`      | [Set R button state on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/buttons/start`   | [Set START button state on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/buttons/select`  | [Set SELECT button state on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/directions/none` | [Set no direction on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/directions/left` | [Set state of the LEFT direction on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/directions/right`| [Set state of the RIGHT direction on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/directions/up`   | [Set state of the UP direction on a virtual gamepad](documentation/api/gamepads.md)  |
| `PUT`          | `/gamepads/:index/directions/down` | [Set state of the DOWN direction on a virtual gamepad](documentation/api/gamepads.md)  |
| `POST`         | `/gamepads/:index/combo`           | [Create a combo on a virtual gamepad](documentation/api/gamepads.md)  |

### Examples

```sh
curl http://192.168.0.42:1337/configuration
```

```sh
curl --header "Accept: application/xml" http://192.168.0.42:1337/configuration
```

```sh
curl -X PUT -d "1" http://192.168.0.42:1337/kodi/enabled
```

```sh
curl --header "Accept: application/json" "http://192.168.0.42:1337/bios?count=5&page=2"
```

```sh
curl --head "http://192.168.0.42:1337/bios?count=5&page=2"
```

```sh
curl "http://192.168.0.42:1337/bios?range=2-7"
```

```sh
curl -X POST -F 'file=@SCPH5502.BIN' "http://192.168.0.42:1337/bios"
```

```sh
curl -X DELETE -I "http://192.168.0.42:1337/systems/snes/roms/Zelda.sfc"
```


