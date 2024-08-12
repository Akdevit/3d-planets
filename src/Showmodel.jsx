import React, { useEffect, useState } from 'react';
import { Canvas } from "@react-three/fiber";
import { Box } from "./planets/model";


const planets = [
    {
        "name": "Sun",
        "description": "The Sun is the star at the center of the Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field via a dynamo process.",
        "diameter_km": 1392700,
        "distance_from_earth_km": 149597870,
        "mass_kg": 1.989e30,
        "surface_temperature_celsius": 5505,
        "orbital_period_days": 0,
        "atmosphere": "N/A",
        "moons": 0,
        "orbital_inclination_degrees": 0
    },
    {
        "name": "Earth",
        "description": "Earth is the third planet from the Sun and the only known astronomical object to harbor life. It has a diverse environment including oceans, mountains, and atmosphere.",
        "diameter_km": 12742,
        "distance_from_sun_km": 149597870,
        "mass_kg": 5.972e24,
        "surface_temperature_celsius": 14,
        "orbital_period_days": 365.25,
        "atmosphere": "Nitrogen, Oxygen, Argon",
        "moons": 1,
        "orbital_inclination_degrees": 23.5
    },
    {
        "name": "Earth night",
        "description": "This texture represents Earth at night, showing the illuminated cities and regions under the cover of darkness.",
        "diameter_km": 12742,
        "distance_from_sun_km": 149597870,
        "mass_kg": 5.972e24,
        "surface_temperature_celsius": 14,
        "orbital_period_days": 365.25,
        "atmosphere": "Nitrogen, Oxygen, Argon",
        "moons": 1,
        "orbital_inclination_degrees": 23.5
    },
    {
        "name": "Earth Cloud's",
        "description": "This texture shows Earth with cloud cover, giving a view of weather patterns and atmospheric conditions.",
        "diameter_km": 12742,
        "distance_from_sun_km": 149597870,
        "mass_kg": 5.972e24,
        "surface_temperature_celsius": 14,
        "orbital_period_days": 365.25,
        "atmosphere": "Nitrogen, Oxygen, Argon",
        "moons": 1,
        "orbital_inclination_degrees": 23.5
    },
    {
        "name": "Moon",
        "description": "The Moon is Earth's only natural satellite. It has a solid, rocky body and is the fifth largest moon in the Solar System.",
        "diameter_km": 3474,
        "distance_from_earth_km": 384400,
        "mass_kg": 7.342e22,
        "surface_temperature_celsius": -53,
        "orbital_period_days": 27.3,
        "atmosphere": "None",
        "moons": 0,
        "orbital_inclination_degrees": 5.1
    },
    {
        "name": "Venus Surface",
        "description": "Venus is the second planet from the Sun and is similar in size to Earth. It has a thick atmosphere with clouds of sulfuric acid.",
        "diameter_km": 12104,
        "distance_from_sun_km": 108208000,
        "mass_kg": 4.867e24,
        "surface_temperature_celsius": 467,
        "orbital_period_days": 225,
        "atmosphere": "Carbon Dioxide, Nitrogen",
        "moons": 0,
        "orbital_inclination_degrees": 177.4
    },
    {
        "name": "Venus Atmosphere",
        "description": "This texture shows the dense atmosphere of Venus, highlighting its thick cloud layers and atmospheric composition.",
        "diameter_km": 12104,
        "distance_from_sun_km": 108208000,
        "mass_kg": 4.867e24,
        "surface_temperature_celsius": 467,
        "orbital_period_days": 225,
        "atmosphere": "Carbon Dioxide, Nitrogen",
        "moons": 0,
        "orbital_inclination_degrees": 177.4
    },
    {
        "name": "Mars",
        "description": "Mars is the fourth planet from the Sun and is known for its red color due to iron oxide on its surface. It has the largest volcano and canyon in the Solar System.",
        "diameter_km": 6779,
        "distance_from_sun_km": 227939000,
        "mass_kg": 6.417e23,
        "surface_temperature_celsius": -60,
        "orbital_period_days": 687,
        "atmosphere": "Carbon Dioxide, Nitrogen, Argon",
        "moons": 2,
        "orbital_inclination_degrees": 1.85
    },
    {
        "name": "Jupiter",
        "description": "Jupiter is the largest planet in the Solar System. It is known for its Great Red Spot and has a strong magnetic field with many moons.",
        "diameter_km": 139820,
        "distance_from_sun_km": 778340000,
        "mass_kg": 1.898e27,
        "surface_temperature_celsius": -108,
        "orbital_period_days": 4333,
        "atmosphere": "Hydrogen, Helium",
        "moons": 79,
        "orbital_inclination_degrees": 1.31
    },
    {
        "name": "Saturn",
        "description": "Saturn is known for its stunning ring system and is the second-largest planet in the Solar System. It has a low density and is predominantly composed of hydrogen and helium.",
        "diameter_km": 116460,
        "distance_from_sun_km": 1427000000,
        "mass_kg": 5.683e26,
        "surface_temperature_celsius": -139,
        "orbital_period_days": 10759,
        "atmosphere": "Hydrogen, Helium",
        "moons": 83,
        "orbital_inclination_degrees": 2.49
    },
    {
        "name": "Uranus",
        "description": "Uranus is an ice giant with a blue-green color due to its methane atmosphere. It rotates on its side, making its seasonal changes extreme.",
        "diameter_km": 50724,
        "distance_from_sun_km": 2871000000,
        "mass_kg": 8.681e25,
        "surface_temperature_celsius": -197,
        "orbital_period_days": 30687,
        "atmosphere": "Hydrogen, Helium, Methane",
        "moons": 27,
        "orbital_inclination_degrees": 0.77
    },
    {
        "name": "Neptune",
        "description": "Neptune is the eighth planet from the Sun and is known for its deep blue color and strong winds. It has a similar composition to Uranus.",
        "diameter_km": 49244,
        "distance_from_sun_km": 4495000000,
        "mass_kg": 1.024e26,
        "surface_temperature_celsius": -201,
        "orbital_period_days": 60190,
        "atmosphere": "Hydrogen, Helium, Methane",
        "moons": 14,
        "orbital_inclination_degrees": 1.77
    },
    {
        "name": "Mercury",
        "description": "Mercury is the closest planet to the Sun and the smallest in the Solar System. It has a very thin atmosphere and experiences extreme temperature variations.",
        "diameter_km": 4879,
        "distance_from_sun_km": 57900000,
        "mass_kg": 3.301e23,
        "surface_temperature_celsius": 430,
        "orbital_period_days": 88,
        "atmosphere": "Oxygen, Sodium, Hydrogen",
        "moons": 0,
        "orbital_inclination_degrees": 7
    }
]

const Showmodel = ({ texture, texturename }) => {
    const [planetdata, setPlanetdata] = useState([''])
    const [showmodal, setShowmodal] = useState(false)



    useEffect(() => {
        const planetinfo = planets.find(planet => planet.name === texturename);
        setPlanetdata(planetinfo);
        setShowmodal(true)
    }, [texturename]);


    const close = () => {
        setShowmodal(false)
    }
    return (
        <div className='h-[100vh] w-[100%] relative bg-red-200'>
            <Canvas style={{ height: '100%', width: '100%', cursor: 'move' }}>
                <ambientLight intensity={1} />
                <directionalLight intensity={0.7} position={[5, 5, 5]} />
                {/* <directionalLight intensity={0.7} position={[-5, -5, -5]} />
                <directionalLight intensity={0.7} position={[-5, 5, 5]} />
                <directionalLight intensity={0.7} position={[5, -5, -5]} /> */}
                <pointLight intensity={0.5} position={[0, 0, 0]} />
                <Box texture={texture} />
            </Canvas>

            {/* show details  */}
            {
                showmodal && (
                    <>
                        <div className='w-full max-w-[400px] h-auto rounded-md shadow-md bg-gray-100 p-4 flex flex-col gap-6 
                absolute top-10 left-1/2 transform -translate-x-1/2 
                sm:right-auto sm:left-10 sm:translate-x-0'>
                            <h1 className='text-center text-3xl font-bold'>{planetdata.name}</h1>
                            <p>{planetdata.description}</p>
                            <p>diameter_km: {planetdata.diameter_km},</p>
                            <p>distance_from_sun_km: {planetdata.distance_from_sun_km},</p>
                            <p>mass_kg: {planetdata.mass_kg}</p>
                            <p>surface_temperature_celsius: {planetdata.surface_temperature_celsius}</p>
                            <p>orbital_period_days: {planetdata.orbital_period_days}</p>
                            <p>atmosphere: {planetdata.atmosphere}</p>
                            <p>moons: {planetdata.moons}</p>
                            <p>orbital_inclination_degrees: {planetdata.orbital_inclination_degrees}</p>
                            <button onClick={close} className='p-4 border bg-red-200 rounded-sm cursor-pointer'> Close</button>
                        </div>


                    </>
                )
            }


        </div>
    )
}

export default Showmodel;
