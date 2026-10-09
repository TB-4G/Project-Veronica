#pragma once
#include <string>

class EmulatorCore {
public:
    std::string name() const;
    std::string version() const;
    bool initialize() const;
};
