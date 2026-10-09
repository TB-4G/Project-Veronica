#include <iostream>
#include "core/EmulatorCore.h"
#include "system/BootManager.h"

int main() {
    EmulatorCore core;
    BootManager boot;

    std::cout << core.name()
              << " v" << core.version() << '\n';

    if (!core.initialize()) {
        std::cerr << "Initialization failed.\n";
        return 1;
    }

    std::cout << boot.start() << '\n';
    std::cout << "Status: Experimental simulation\n";
    return 0;
}
