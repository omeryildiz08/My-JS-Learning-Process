//RAM seçimi componenti
//seçilen anakarta bağlı olarak uyumlu ramleri listeleme, seçilen ram'i üst bileşene(app.jsx) bildirme

import React, { useState, useEffect } from "react";
import { Select } from "antd";
import data from "../data/Components.json";

const { Option } = Select; 

function RamSelector({selectedMotherboard, onRamSelect}){
    const [ramList,setRamList] = useState([]); //uyumlu ramleri tutacak state

    //Anakart değiştikçe uyumlu ramleri filtrele
    useEffect(() => {
        if(selectedMotherboard){
            const motherboard = data.motherboards.find((mb) => mb.id === selectedMotherboard); //seçili anakartı json içinde buluyoruz

            //seçili anakarta uyumlu ramleri filtreleme
            const compitableRam = data.ram.filter((ram) =>
                motherboard.compatible_ram.includes(ram.id)
            );
            setRamList(compitableRam); //state'i güncelle   
        }else{
            setRamList([]); //anakart seçilmezse listeyi sıfırla
        }

    },[selectedMotherboard]);
    return(
        <div>
            <h3>Select Ram</h3>
            <Select
            style={{width:250}}
            placeholder="Choose a ram"
            onChange={(value) => onRamSelect(value)} //seçim yapıldığında üst bileşene bildirme
            disabled={!selectedMotherboard}
            >
                {ramList.map((rm)=>(
                    <Option key={rm.id} value={rm.id}>
                        {rm.name} - ${rm.price}
                    </Option>
                ))}
            </Select>
        </div>
    )
}


export default RamSelector;