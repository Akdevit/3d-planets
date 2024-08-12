import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import toast from 'react-hot-toast';

export function Box({ texture }) {
    const [modelresize, setModelresize] = useState(2.5);
    const [loading, setLoading] = useState(true);
    const mesh = useRef();

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.matchMedia("(max-width: 768px)").matches;
            setModelresize(isMobile ? 1.8 : 2.5);
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const manager = new THREE.LoadingManager();

        manager.onStart = () => {
            // toast.loading('Loading started');
            setLoading(true);
        };

        manager.onLoad = () => {
            // toast.loading('Loading complete');
            setLoading(false);
        };

        manager.onProgress = (item, loaded, total) => {
            // toast.loading('Loaded:', Math.round((loaded / total) * 100) + '%');//100%
        };

        manager.onError = (url) => {
            toast.error('Error loading');
            setLoading(false);
            toast.error('Error loading texture');
        };

        const loader = new THREE.TextureLoader(manager);
        loader.load(
            texture,
            (loadedTexture) => {
                if (mesh.current) {
                    mesh.current.material.map = loadedTexture;
                    mesh.current.material.needsUpdate = true;
                }
            }
        );
    }, [texture]);

    useFrame(() => {
        if (mesh.current) {
            mesh.current.rotation.y += 0.005;
        }
    });

    useEffect(() => {
        if (loading) {
            toast.loading('please wait...');
        } else {
            toast.dismiss();
            toast.success('complete');
        }
    }, [loading]);

    return (
        <>
            <mesh ref={mesh} position={[0, 0, 0]} >
                <sphereGeometry args={[modelresize, 32, 32]} />
                <meshStandardMaterial />
            </mesh>
            <OrbitControls enableZoom={false} />
        </>
    );
}
