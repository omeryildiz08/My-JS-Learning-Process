import React from 'react'
import { Table } from 'antd'


 function PriceTable({selectedProcessor,selectedMotherboard,selectedCase,selectedRam,selectedStorage,selectedPowersupply,selectedGpu}) {
    const selectedComponents=[ 
        {category:'Processor',...selectedProcessor},
        { category: 'Motherboard', ...selectedMotherboard },
        { category: 'RAM', ...selectedRam },
        { category: 'GPU', ...selectedGpu },
        { category: 'Storage', ...selectedStorage },
        { category: 'Power Supply', ...selectedPowersupply },
        { category: 'Case', ...selectedCase }
    ].filter(item=>item.id);
       

    const calculateTotalPrice = () => {
        return selectedComponents.reduce((acc, component) => acc + (component.price || 0), 0);
      };

   
  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category"
    },
    {
      title: "Component",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Price($)",
      dataIndex: "price",
      key: "price"
    }
  ];
    
  return (
    <div>
        PriceTable
        <Table 
        columns={columns}
        dataSource={selectedComponents.map((component)=>({
            key:`${component.category}-${component.id}`,
            category:component.category,
            name:component.name,
            price:component.price,
        }))}
        pagination={false}
        />
        <h3>Total Price:${calculateTotalPrice()}</h3>
        

    </div>
  )
}
export default PriceTable;
