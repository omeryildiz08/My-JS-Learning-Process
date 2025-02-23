import React, { useState, useEffect } from "react";
import { Select } from "antd";
import data from "../data/Components.json";

const { Option } = Select;

function CaseSelector({ selectedMotherboard, onCaseSelect }) {
    const[caseList,setCaseList] = useState([]); // Uyumlu kasa listesini tutan state

    // Anakart değiştikçe uyumlu kasaları filtrele
    useEffect(() => {
        if (selectedMotherboard) {
          // Seçili anakartın ID'sine uygun kasaları filtreliyoruz
          const compatibleCases = data.case.filter((c) =>
            c.compatible_motherboards.includes(selectedMotherboard)
          );
    
          // State'i güncelliyoruz
          setCaseList(compatibleCases);
        } else {
          setCaseList([]); // Anakart seçilmezse kasa listesini sıfırla
        }
      }, [selectedMotherboard]); // `selectedMotherboard` değiştiğinde çalışır 
      
  return (
    <div>
      <h3>Select Case</h3>
      <Select
        style={{ width: 250 }}
        placeholder="Choose a Case"
        onChange={(value) => onCaseSelect(value)} // Seçim yapıldığında üst bileşene bildiriyoruz
        disabled={!selectedMotherboard} // Anakart seçilmeden kasa seçilemez
      >
        {caseList.map((c) => (
          <Option key={c.id} value={c.id}>
            {c.name} - ${c.price}
          </Option>
        ))}
      </Select>
    </div>
  );
}

export default CaseSelector;