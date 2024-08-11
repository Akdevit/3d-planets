import React, { useState } from "react";
import "./App.css";
import Showmodel from "./Showmodel";
import Selectplanet from "./Selectplanet";

import Sun from "./texture/8k_sun.jpg";
import Moon from "./texture/8k_moon.jpg";
import Earth from "./texture/8k_earth_daymap.jpg";
import EarthNight from "./texture/8k_earth_nightmap.jpg";
import EarthCloud from "./texture/8k_earth_clouds.jpg";
import Mercury from "./texture/8k_mercury.jpg";
import VenusSurface from "./texture/8k_venus_surface.jpg";
import VenusAtmosphere from "./texture/4k_venus_atmosphere.jpg";
import Mars from "./texture/8k_mars.jpg";
import Jupiter from "./texture/8k_jupiter.jpg";
import Saturn from "./texture/8k_saturn.jpg";
import Uranus from "./texture/2k_uranus.jpg";
import Neptune from "./texture/2k_neptune.jpg";

function App() {
  const [texture, setTexture] = useState(Sun); // Default texture
  const [texturename,setTexturename] = useState('Sun')

  const textureMap = {
    Sun,
    Earth,
    "Earth night": EarthNight,
    "Earth Cloud's": EarthCloud,
    Moon,
    "Venus Surface": VenusSurface,
    "Venus Atmosphere": VenusAtmosphere,
    Mars,
    Jupiter,
    Mercury,
    Saturn,
    Uranus,
    Neptune,
  };

  const handlePlanetSelect = (planet) => {
    setTexture(textureMap[planet]);
    setTexturename(planet)
  };

  
  return (
    <div className="w-full h-[100vh] flex">
      <Showmodel texture={texture} texturename={texturename}/>
      <Selectplanet onPlanetSelect={handlePlanetSelect} />
    </div>
  );
}

export default App;
