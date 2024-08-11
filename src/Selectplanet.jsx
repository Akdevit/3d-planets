import React, { useState } from 'react';
import { LuMenu } from 'react-icons/lu';
import { RxCross1 } from "react-icons/rx";

const Selectplanet = ({ onPlanetSelect }) => {
    const [activePlanet, setActivePlanet] = useState(null);
    const [close, setClose] = useState(false);

    const handleClick = (planet) => {
        setActivePlanet(planet);
        onPlanetSelect(planet); // Notify parent of the selection
        setClose(false)
    };

    const planets = [
        'Sun',
        'Earth',
        'Earth night',
        'Earth Cloud\'s',
        'Moon',
        'Venus Surface',
        'Venus Atmosphere',
        'Mars',
        'Jupiter',
        'Mercury',
        'Saturn',
        'Uranus',
        'Neptune'
    ];

    const closesidebaar = () => {
        setClose(false);
    };


    return (
        <>
            {/* Sidebar */}
            <div
                className={`xl:w-[20%] lg:w-[20%] md:w-[20%] sm:w-[30%] w-[80%] fixed top-0 right-0 h-full bg-white overflow-auto transition-transform duration-300 ease-in-out ${close ? 'translate-x-0' : 'translate-x-full'} z-30 p-4`}
            >
                <div className='w-full h-auto flex justify-end p-4'>
                    <RxCross1 onClick={closesidebaar} className='text-3xl font-bold cursor-pointer' />
                </div>
                {planets.map((planet) => (
                    <div
                        key={planet}
                        className={`p-4 h-[8%] cursor-pointer rounded-md ${activePlanet === planet ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
                        onClick={() => handleClick(planet)}
                    >
                        {planet}
                    </div>
                ))}
            </div>

            {/* Menu Button */}
            {!close && (
                <div className='absolute top-0 right-0 p-4 z-20'>
                    <LuMenu onClick={() => setClose(true)} className='text-3xl font-bold cursor-pointer' />
                </div>
            )}
        </>
    );
};

export default Selectplanet;
