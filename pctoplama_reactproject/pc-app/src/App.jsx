import { useState } from 'react'
import ProcessorSelector from "./components/ProcessorSelector";
import MotherboardSelector from "./components/MotherboardSelector";
import RamSelector from './components/RamSelector';
import GpuSelector from './components/GpuSelector';
import StorageSelector from './components/StorageSelector';
import PowerSupplySelector from './components/PowerSupplySelector';
import CaseSelector from './components/CaseSelector';
import ConfigTable from './components/ConfigTable';
import { Button, ConfigProvider, Switch , theme} from "antd";

function App() {
  const [selectedProcessor, setSelectedProcessor] = useState(null); //seçilen işlemciyi tutan state
  const [selectedMotherboard, setSelectedMotherboard] = useState(null); //seçilen anakartı tutan state
  const [selectedRam, setSelectedRam] = useState(null);
  const[selectedGpu,setSelectedGpu] = useState(null);
  const [selectedStorage, setSelectedStorage] = useState(null); //seçilen depolama birimini tutan state
  const [selectedPowerSupply, setSelectedPowerSupply] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null); 
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleReset = () => {
    setSelectedProcessor(null);
    setSelectedMotherboard(null);
    setSelectedRam(null);
    setSelectedGpu(null);
    setSelectedStorage(null);
    setSelectedPowerSupply(null);
    setSelectedCase(null);
  }

   // Tema değiştirme işlevi
  // Tema değiştirme işlevi
  const toggleTheme = (checked) => {
    setIsDarkMode(checked);
  };

  return (
    <ConfigProvider theme={{ algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
      <div style={{ padding: "20px", backgroundColor: theme === "dark" ? "#1a1a1a" : "#fff", color: theme === "dark" ? "#fff" : "#000", minHeight: "100vh" }}>
      <h1>Pc Builder</h1>
        
        {/* Tema Değiştirme Switch */}
        <div style={{ marginBottom: "20px" }}>
          <span style={{ marginRight: "10px" }}>Dark Mode</span>
          <Switch checked={isDarkMode} onChange={toggleTheme} />
        </div>

      <ProcessorSelector onProcessorSelect={setSelectedProcessor} />
      <MotherboardSelector
      selectedProcessor={selectedProcessor}
      onMotherboardSelect={setSelectedMotherboard}
      
      />
      <RamSelector 
      selectedMotherboard={selectedMotherboard}
      onRamSelect={setSelectedRam}
      />
      <GpuSelector
      selectedMotherboard={selectedMotherboard}
      onGpuSelect={setSelectedGpu}
      />
      <StorageSelector
         selectedMotherboard={selectedMotherboard}
         onStorageSelect={setSelectedStorage} // ✅ Depolama state'i buraya bağlandı
      />
      <PowerSupplySelector
      selectedProcessor={selectedProcessor}
      selectedGpu={selectedGpu}
      onPowerSupplySelect={setSelectedPowerSupply}
      />
      <CaseSelector
      selectedMotherboard={selectedMotherboard}
      onCaseSelect={setSelectedCase}
      />
      <ConfigTable
        selectedProcessor={selectedProcessor}
        selectedMotherboard={selectedMotherboard}
        selectedRam={selectedRam}
        selectedGpu={selectedGpu}
        selectedStorage={selectedStorage}
        selectedPowerSupply={selectedPowerSupply}
        selectedCase={selectedCase}
      />

      {/* Reset button */}
      <Button type='primary' danger onClick={handleReset} style={{marginTop:"20px"}}>
        Reset
      </Button>


    </div>
      </ConfigProvider>
    
  )
}

export default App
/*
ProcessorSelector seçildiğinde setSelectedProcessor çalışır.
* MotherboardSelector, seçilen işlemciye göre uyumlu anakartları gösterir.
* RamSelector, seçilen anakarta göre uyumlu RAM'leri gösterir.
* GpuSelector, seçilen anakarta göre uyumlu GPU'ları gösterir.
* StorageSelector, seçilen anakarta göre uyumlu depolama birimlerini gösterir.
* PowerSupplySelector, seçilen işlemci ve ekran kartına uygun PSU'ları listeler.
* CaseSelector, anakarta uyumlu kasaları listeler.
* Seçilen kasa setSelectedCase ile state içinde tutulur.
*/
