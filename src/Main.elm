module Main where


import Mouse
import Graphics.Element exposing (show)


main = Signal.map show Mouse.position
