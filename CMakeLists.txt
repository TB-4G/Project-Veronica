cmake_minimum_required(VERSION 3.20)
project(ProjectVeronica VERSION 0.1.0 LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 20)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(veronica
    src/main.cpp
    src/core/EmulatorCore.cpp
    src/system/BootManager.cpp
)

target_include_directories(veronica PRIVATE src)

enable_testing()

add_executable(veronica_tests
    tests/CoreTests.cpp
    src/core/EmulatorCore.cpp
    src/system/BootManager.cpp
)

target_include_directories(veronica_tests PRIVATE src)

add_test(NAME CoreTests COMMAND veronica_tests)
