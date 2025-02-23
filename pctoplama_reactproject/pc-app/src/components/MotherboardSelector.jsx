//uyumlu anakart seçimi componenti
//antd select bileşeni kullanarak anakartları listeleme, uyumlu anakartları filtreleme, seçilen anakartı üst bileşene bildirme

import React, { useEffect, useState } from "react";
import { Select } from "antd";
import data from "../data/Components.json";

const { Option } = Select; //Ant design select için option bileşenini alıyoruz

function MotherboardSelector({selectedProcessor, onMotherboardSelect}){
    const [motherboards,setMotherboards] = useState([]); //anakartları tutacak state

    // İşlemci değiştikçe uyumlu anakartları filtrele
    useEffect(() => {
        if (selectedProcessor){
            //seçili işlemciyi json içinde buluyoruz
            const processor = data.processors.find((p) => p.id === selectedProcessor);

            //işlemcinin uyumlu olduğu anakartları filtreliyoruz
            const compatibleMB = data.motherboards.filter((mb) =>
                processor.compatible_motherboards.includes(mb.id)
              ); /*Özetle:

              data.motherboards: Tüm anakartların listesi.
              processor.compatible_motherboards: İşlemci ile uyumlu anakartların ID'lerini içeren liste.
              filter ve includes metodları kullanılarak, uyumlu anakartlar compatibleMB değişkenine atanır. */
             
              //state'i güncelle
        setMotherboards(compatibleMB);
        } else{
            setMotherboards([]); //işlemci seçilmezse listeyi sıfırla
        }
    },[selectedProcessor]); //useEffect sadece işlemci 'selectedProcessor' değiştiğinde çalışacak

    return(
        <div>
            <h3>Select Motherboard</h3>
            <Select
            style={{width:250}}
            placeholder="Choose a motherboard"
            onChange={(value) => onMotherboardSelect(value)} //seçim yapıldığında üst bileşene bildirme
            disabled={!selectedProcessor} //işlemci seçilmediyse select bileşenini devre dışı bırak
            >
                {motherboards.map((mb) => (
                    <Option key={mb.id} value={mb.id}>
                        {mb.name} - ${mb.price}
                    </Option>
                ))}
            </Select>
        </div>
    )

}
export default MotherboardSelector; 