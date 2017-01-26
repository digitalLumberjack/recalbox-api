#include <string>
#include <cstdlib>
#include <SDL2/SDL.h>

int main(int argc, char *argv[])
{
    if (argc < 2) {
        printf("Please provide joystick index");
        return 1;
    }

    SDL_InitSubSystem(SDL_INIT_JOYSTICK);
    SDL_JoystickEventState(SDL_ENABLE);

    int index = atoi(argv[1]);
    SDL_Joystick* joy = SDL_JoystickOpen(index);
    SDL_JoystickID joyId = SDL_JoystickInstanceID(joy);

    printf("%d", joyId);

    SDL_JoystickEventState(SDL_DISABLE);
    SDL_QuitSubSystem(SDL_INIT_JOYSTICK);


    return 0;
}
