//storage seçimi komponenti
import React, { useState, useEffect } from "react";
import { Select } from "antd";
import data from "../data/Components.json"; 

const { Option } = Select; 

function StorageSelector({ selectedMotherboard, onStorageSelect }) {
  const [storageList, setStorageList] = useState([]); // Uyumlu depolama birimlerini tutan state

  // Anakart değiştikçe uyumlu depolama birimlerini filtrele
  useEffect(() => {
    if (selectedMotherboard) {
      // Seçili anakartı JSON içinde buluyoruz
      const motherboard = data.motherboards.find((mb) => mb.id === selectedMotherboard);

      // Seçili anakarta uyumlu depolama birimlerini filtreliyoruz
      const compatibleStorage = data.storage.filter((s) =>
        motherboard.compatible_storage.includes(s.id)
      );

      // State'i güncelliyoruz
      setStorageList(compatibleStorage);
    } else {
      setStorageList([]); 
    }
  }, [selectedMotherboard]); // `selectedMotherboard` değiştiğinde çalışır

  return (
    <div>
      <h3>Select Storage</h3>
      <Select
        style={{ width: 250 }}
        placeholder="Choose a Storage"
        onChange={(value) => onStorageSelect(value)} // Seçim yapıldığında üst bileşene bildiriyoruz
        disabled={!selectedMotherboard} // Anakart seçilmeden depolama seçilemez
      >
        {storageList.map((s) => (
          <Option key={s.id} value={s.id}>
            {s.name} - ${s.price}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default StorageSelector;