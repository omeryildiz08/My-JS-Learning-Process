import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ComponentSelector from './components/ComponentSelector'
import SelectComponent from './components/SelectComponent'
import PriceTable from './components/PriceTable'


function App() {
  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  const [selectedRam, setSelectedRam] = useState(null);
  const [selectedGpu, setSelectedGpu] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null);
  const [selectedPowersupply, setSelectedPowersupply] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  return (
  <div>
<div>
       
        <header>PC BUILDER APP</header>
      <ComponentSelector onProcessorSelect={setSelectedProcessor}   
      onMotherboardSelect={setSelectedMotherboard}
        onRamSelect={setSelectedRam}
        onGpuSelect={setSelectedGpu}
        onStorageSelect={setSelectedStorage}
        onPowersupplySelect={setSelectedPowersupply}
        onCaseSelect={setSelectedCase} ></ComponentSelector>
  </div>
  <div>
    <PriceTable
    selectedProcessor={selectedProcessor}
    selectedMotherboard={selectedMotherboard}
    selectedRam={selectedRam}
    selectedGpu={selectedGpu}
    selectedStorage={selectedStorage}
    selectedPowersupply={selectedPowersupply}
    selectedCase={selectedCase}
    />

    
  </div>
  </div>
  

  )
}

export default App
