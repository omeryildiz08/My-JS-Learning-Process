//işlemci seçimi componenti
//ant design ile select bileşeni kullanılacak,seçilen işlemci state bileşeni içinde tutulacak, json dosyasından işlemci listesi çekilecek, seçim değiştikçe üst bileşene bildirerek güncellenecek.

import React, { useEffect, useState } from "react";
import { Select } from "antd";
import data from "../data/Components.json";

const { Option } = Select; //Ant design select için option bileşenini alıyoruz

function ProcessorSelector({onProcessorSelect}){
    //seçilen işlemciyi tutacak state
    const [processors,setProcessors] = useState([]);

    //JSON veri dosyasından işlemci bilgilerini çekme
    useEffect(() => {
        setProcessors(data.processors);
    },[]); //useEffect sadece bir kere çalışacak bileşen yüklendiğinde

    return(
        <div>
            <h3>Select Processor</h3>
            <Select
            style={{width:250}}
            placeholder="Choose a processor"
            onChange={(value) =>onProcessorSelect(value)} //seçim yapıldıpında üst bileşene bildirme
            >
                {processors.map((p) => (
                    <Option key={p.id} value={p.id}>
                        {p.name} - ${p.price}
                    </Option>

                ))}
            </Select>
        </div>
    );

}

export default ProcessorSelector; 
