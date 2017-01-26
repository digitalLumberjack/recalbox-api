#include <string>
#include <SDL2/SDL.h>

int main()
{
    SDL_InitSubSystem(SDL_INIT_JOYSTICK);
    SDL_JoystickEventState(SDL_ENABLE);

    int joystickCount = SDL_NumJoysticks();

    SDL_JoystickEventState(SDL_DISABLE);
    SDL_QuitSubSystem(SDL_INIT_JOYSTICK);

    printf("%d", joystickCount);

    return 0;
}
