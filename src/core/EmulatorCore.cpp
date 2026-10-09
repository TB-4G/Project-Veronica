#include "core/EmulatorCore.h"

std::string EmulatorCore::name() const {
    return "Project: Veronica";
}

std::string EmulatorCore::version() const {
    return "0.1.0";
}

bool EmulatorCore::initialize() const {
    return true;
}
