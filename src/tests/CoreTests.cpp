#include <cassert>
#include "core/EmulatorCore.h"
#include "system/BootManager.h"

int main() {
    EmulatorCore core;
    BootManager boot;

    assert(core.name() == "Project: Veronica");
    assert(core.version() == "0.1.0");
    assert(core.initialize());
    assert(!boot.start().empty());
}
