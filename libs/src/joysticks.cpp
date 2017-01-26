#include <stdlib.h>
#include <stdio.h>
#include <iostream>
#include <string>
#include <SDL2/SDL.h>

int main(int argc, char *argv[])
{
    SDL_InitSubSystem(SDL_INIT_JOYSTICK);
    SDL_JoystickEventState(SDL_ENABLE);

    int joystickCount = SDL_NumJoysticks();

    printf("Joystick count: %d\n", joystickCount);

    for (int index = 0; index < joystickCount; index++)
    {
        SDL_Joystick* joy = SDL_JoystickOpen(index);
        SDL_JoystickID joyId = SDL_JoystickInstanceID(joy);

        char guid[65];
        SDL_JoystickGetGUIDString(SDL_JoystickGetGUID(joy), guid, 65);

        const char* name = SDL_JoystickName(joy);

        printf("Joystick %d :\n- JoyID = %d\n- GUID = %s\n- Name = %s\n- Device path = /dev/input/js%d\n", index, joyId, guid, name, joyId);
    }

    return 0;
}
