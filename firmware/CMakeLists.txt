cmake_minimum_required(VERSION 3.22)

project(firmware)

add_subdirectory(solution)

add_custom_target(clean-all
    COMMAND ${CMAKE_COMMAND} --build ${CMAKE_BINARY_DIR} --target clean
    COMMAND ${CMAKE_COMMAND} -E remove_directory ${CMAKE_BINARY_DIR}/CMakeFiles
    COMMAND ${CMAKE_COMMAND} -E remove_directory ${CMAKE_BINARY_DIR}/solution
    COMMAND ${CMAKE_COMMAND} -E remove ${CMAKE_BINARY_DIR}/CMakeCache.txt
    COMMAND ${CMAKE_COMMAND} -E remove -G "${CMAKE_GENERATOR}" cmake_install.cmake
    COMMAND ${CMAKE_COMMAND} -E remove -G "${CMAKE_GENERATOR}" Makefile
    COMMAND ${CMAKE_COMMAND} -E remove -G "${CMAKE_GENERATOR}" DartConfiguration.tcl
    WORKING_DIRECTORY ${CMAKE_BINARY_DIR}
)