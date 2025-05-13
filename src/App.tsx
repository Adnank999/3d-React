import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SceneCanvas from "../components/ScreenCanvas"

function App() {
 

  return (
   <div id='scroll-container' style={{ width: '100vw', height: '1000vh', overflowY: 'scroll' }}>
      <SceneCanvas modelUrl="/spiGltf/scene.gltf" />
    </div>
  )
}

export default App
