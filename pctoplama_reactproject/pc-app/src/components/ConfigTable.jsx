//seçilen bileşenlerin listelendiği tablo componenti

import React,{useMemo} from "react";
import { Table } from "antd";
import data from "../data/Components.json";

function ConfigTable({ selectedProcessor, selectedMotherboard, selectedRam, selectedGpu, selectedStorage, selectedPowerSupply, selectedCase }) {
    // Seçilen bileşenleri JSON'daki verilerle eşleştirerek getiriyoruz
    const selectedComponents = useMemo(() => {
      return [
        selectedProcessor ? data.processors.find((p) => p.id === selectedProcessor) : null,
        selectedMotherboard ? data.motherboards.find((m) => m.id === selectedMotherboard) : null,
        selectedRam ? data.ram.find((r) => r.id === selectedRam) : null,
        selectedGpu ? data.gpu.find((g) => g.id === selectedGpu) : null,
        selectedStorage ? data.storage.find((s) => s.id === selectedStorage) : null,
        selectedPowerSupply ? data.power_supply.find((ps) => ps.id === selectedPowerSupply) : null,
        selectedCase ? data.case.find((c) => c.id === selectedCase) : null
      ].filter(Boolean); // `null` olanları filtreleyerek temizliyoruz
    }, [selectedProcessor, selectedMotherboard, selectedRam, selectedGpu, selectedStorage, selectedPowerSupply, selectedCase]);

    //total fiyat hesaplama
    const totalPrice = useMemo(() => {
        return selectedComponents.reduce((sum, component) => sum + component.price, 0);
    }, [selectedComponents]);

//tablo sütunları
const columns=[
    {
        title:"Component",
        dataIndex:"name",
        key:"name"
    },
    {
        title:"Price($)",
        dataIndex:"price",
        key:"price"
    },
];

return (
    <div>
      <h3>Selected Components</h3>
      <Table
        columns={columns}
        dataSource={selectedComponents.map((component) => ({
          key: component.id,
          name: component.name,
          price: component.price,
        }))}
        pagination={false}
      />
      <h3>Total Price: ${totalPrice}</h3>
    </div>
  );

}

export default ConfigTable;






