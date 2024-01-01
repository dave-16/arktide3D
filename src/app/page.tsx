//@ts-nocheck
"use client"
import React, { FC, useState, useEffect, Suspense,useMemo } from "react";
import Image from 'next/image'

import { Canvas, Vector3 } from 'react-three-fiber';
import { OrbitControls, Sky, Stage, Environment, PerspectiveCamera,  } from "@react-three/drei";
import Ocean from '../../components/ocean';
import Foundation from "../../components/foundation"; 
import Colors, { COLORS } from "../../components/color";
import Views, {VIEWS}from "../../components/views";
import MyStlViewer from "../../components/viewer"
import GltfModel from "../../components/viewer";
import GlbModel from "../../components/viewer";
import { Button, Stack } from "@mui/material";
import Designs from "../../components/designs";
export default function Home() {
  
  const [maxPolarAngle, setMaxPolarAngle] = useState(Math.PI / 2.1);
  const [maxDistance, setMaxDistance] = useState(100);
  const [enableZoom, setEnableZoom] = useState(true);
  const [cameraPosition, setCameraPosition] = useState<Vector3 | undefined>([-20, 10, 60]);

  const [coquinaColor, setcoquinaColor] = useState(COLORS.lightBlue);
  // const [coquinaView,setcoquinaView] = useState(VIEWS.isometric)

  const [selectedView, setSelectedView] = useState('isometric');

  const handleViewChange = (view) => {
    // Handle view change logic here
    setSelectedView(view);
  
    // You might want to update your 3D scene or perform other actions based on the selected view

    // Update camera position based on the selected view
    const { position } = VIEWS[view];
    setCameraPosition(position);
  };

  const handleColorChange = (color: string) => {
    setcoquinaColor(color);
  };



  const [clickedButton, setClickedButton] = useState(null);
  const [mode, setMode] = useState(null);
 
  const handleButtonClick = (buttonId) => {
    setClickedButton(buttonId);
    setMode(buttonId); // Set the mode based on the clicked button
    // Perform other actions as needed
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
     <div
        style={{ position: "relative", maxWidth: "1200px", margin: "0 auto" }}
      >
        {/* <NavBar /> */}
      </div>

      <div style={{ height: "100vh", width: "100vw", margin: 0 }}>
        
   
          <Canvas
              
          >
              <PerspectiveCamera
          makeDefault
          position={cameraPosition as Vector3}
          fov={70}
          near={1}
          far={30000}
        />
          
     
            <OrbitControls
          maxPolarAngle={maxPolarAngle}
          maxDistance={maxDistance}
          enableZoom={enableZoom}
         


        />
              <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
              <ambientLight intensity={0.7} />
              <pointLight position={[100, 100, 20]} intensity={1} />

               <Sky
                sunPosition={[1000, 1000, 20]}
                inclination={20}
                azimuth={100}
              /> 

             
 
 {/* <GltfModel modelPath="/coq4.glb"  
    // Handle drag event
 position={[-4,5,20]} color={coquinaColor}  scale={[50, 50, 50]}  />  
 
              */}
                <Ocean/> 
            
              
          </Canvas>
          
         
       <Views selectedView={selectedView} handleView={handleViewChange} />
       <Stack
      position="absolute"
      left={6}
      bottom={16}
      direction="row"
      
      spacing={1}
      borderRadius="0.5rem"
      border="1px dashed #131414"
      padding={{ xs: '10px', sm: '13px' }}
      sx={{ backdropFilter: 'blur(5px)' }}
    >
           <Button
        variant={clickedButton === 'outside' ? 'contained' : ''}
        onClick={() => handleButtonClick('outside')}
      >
        Outside
      </Button>
      <Button
        variant={clickedButton === 'inside' ? 'contained' : ''}
        onClick={() => handleButtonClick('inside')}
      >
        Inside
      </Button>
      <Button
        variant={clickedButton === 'button3' ? 'contained' : ''}
        onClick={() => handleButtonClick('button3')}
      >
        Floor
      </Button>
      {/* Conditionally render Colors, Colors2, or Colors3 based on the current mode */}
      {mode === 'outside' ? <Colors coquinaColor={coquinaColor} handleColor={handleColorChange} /> : mode === 'inside' ? <Views /> : mode === 'button3' ? <Colors /> : null}
          
          
    </Stack>
        
          </div>
    </main>
  )
}
