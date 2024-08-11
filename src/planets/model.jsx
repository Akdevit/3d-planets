import React, { useEffect, useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

export function Box({ texture }) {
    const [modelresize, setModelresize] = useState(2.5);
    const mesh = useRef();
    const loadedTexture = useLoader(THREE.TextureLoader, texture); // Load the passed texture

    useFrame(() => {
        mesh.current.rotation.y += 0.005;
    });

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            setModelresize(isMobile ? 1.8 : 2.5);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <mesh ref={mesh} position={[0, 0, 0]}>
                <sphereGeometry args={[modelresize, 32, 32]} />
                <meshStandardMaterial map={loadedTexture} />
            </mesh>
            <OrbitControls enableZoom={false} />
        </>
    );
}
