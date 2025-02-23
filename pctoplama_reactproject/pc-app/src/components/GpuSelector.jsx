//Ekran kartı seçimi componenti
//seçilen rame bağlı olarak uyumlu ramleri listelemek, seçilen ekran kartını üst bileşene bildirme

import React, { useState, useEffect } from "react";
import { Select } from "antd";
import data from "../data/Components.json"; // JSON verisini içe aktarıyoruz

const { Option } = Select; // Ant Design Select bileşeni için Option bileşenini alıyoruz

function GpuSelector({ selectedMotherboard, onGpuSelect }) {
  const [gpuList, setGpuList] = useState([]); // Uyumlu ekran kartlarını tutan state

  // Anakart değiştikçe uyumlu GPU'ları filtrele
  useEffect(() => {
    if (selectedMotherboard) {
      // Seçili anakartı JSON içinde buluyoruz
      const motherboard = data.motherboards.find((mb) => mb.id === selectedMotherboard);

      // Seçili anakarta uyumlu GPU'ları filtreliyoruz
      const compatibleGPU = data.gpu.filter((g) =>
        motherboard.compatible_gpu.includes(g.id)
      );

      // State'i güncelliyoruz
      setGpuList(compatibleGPU);
    } else {
      setGpuList([]); // Anakart seçilmezse GPU listesini sıfırla
    }
  }, [selectedMotherboard]); // `selectedMotherboard` değiştiğinde çalışır

  return (
    <div>
      <h3>Select GPU</h3>
      <Select
        style={{ width: 250 }}
        placeholder="Choose a GPU"
        onChange={(value) => onGpuSelect(value)} // Seçim yapıldığında üst bileşene bildiriyoruz
        disabled={!selectedMotherboard} // Anakart seçilmeden GPU seçilemez
      >
        {gpuList.map((g) => (
          <Option key={g.id} value={g.id}>
            {g.name} - ${g.price}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default GpuSelector;