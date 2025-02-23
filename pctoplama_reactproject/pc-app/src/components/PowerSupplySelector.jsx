import React,{useState, useEffect} from "react";
import { Select } from "antd";
import data from "../data/Components.json";

const {Option} = Select;
function PowerSupplySelector({ selectedProcessor, selectedGpu, onPowerSupplySelect }) {
    const [powerSupplyList, setPowerSupplyList] = useState([]); // Uyumlu PSU'ları tutan state
  
   
    useEffect(() => {
      if (selectedProcessor && selectedGpu) {
        // Seçili işlemci ve GPU'yu JSON içinde buluyoruz
        const processor = data.processors.find((p) => p.id === selectedProcessor);
        const gpu = data.gpu.find((g) => g.id === selectedGpu);
  
        // Toplam güç tüketimini hesaplıyoruz
        const totalPowerRequired = processor.power + gpu.power;
  
        // Seçilen bileşenlere uygun güç kaynağı seçeneklerini filtreliyoruz
        const compatiblePSU = data.power_supply.filter((psu) => psu.power >= totalPowerRequired);
  
        // State'i güncelliyoruz
        setPowerSupplyList(compatiblePSU);
      } else {
        setPowerSupplyList([]); // İşlemci veya GPU seçilmezse PSU listesini sıfırla
      }
    }, [selectedProcessor, selectedGpu]); // `selectedProcessor` veya `selectedGpu` değiştiğinde çalışır
  
    return (
      <div>
        <h3>Select Power Supply</h3>
        <Select
          style={{ width: 250 }}
          placeholder="Choose a Power Supply"
          onChange={(value) => onPowerSupplySelect(value)} // Seçim yapıldığında üst bileşene bildiriyoruz
          disabled={!selectedProcessor || !selectedGpu} // İşlemci ve GPU seçilmeden PSU seçilemez
        >
          {powerSupplyList.map((psu) => (
            <Option key={psu.id} value={psu.id}>
              {psu.name} - {psu.power}W - ${psu.price}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
  
  export default PowerSupplySelector;
