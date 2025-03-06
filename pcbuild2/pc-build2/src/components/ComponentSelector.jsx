//tüm filtreleme işlemlerini yapan base component

import React, { Component, useState, useEffect, use } from 'react';
import { Select } from 'antd';
import parsedData from '../data/parts.json';

const { Option } = Select;

function ComponentSelector({ onProcessorSelect, onMotherboardSelect, onRamSelect, onGpuSelect, onStorageSelect, onPowersupplySelect, onCaseSelect }) {

  const [selectedProcessor, setSelectedProcessor] = useState(null);
  const [selectedMotherboard, setSelectedMotherboard] = useState(null);
  // const [selectedRam,setSelectedRam] = useState(null);
  // const [selectedGpu,setSelectedGpu] = useState(null);
  // const [selectedStorage,setSelectedStorage] = useState(null);
  // const [selectedPowersupply,setSelectedPowerSupply] = useState(null);
  // const [selectedCase,setSelectedCase] = useState(null);


  //filtrelenmiş listeler için stateler
  const [filteredProcessors, setFilteredProcessors] = useState([]);
  const [filteredRam, setFilteredRam] = useState([]);
  const [filteredGpu, setFilteredGpu] = useState([]);
  const [filteredStorage, setFilteredStorage] = useState([]);
  const [filteredPowersupply, setFilteredPowersupply] = useState([]);
  const [filteredCase, setFilteredCase] = useState([]);


  useEffect(() => {
    if (selectedMotherboard) {
      const compatibleProcessors = parsedData.processor.filter((p) => p.compatible_motherboard.includes(selectedMotherboard.id));
      setFilteredProcessors(compatibleProcessors);

      const compitableRam = parsedData.ram.filter((r) => r.compatible_motherboard.includes(selectedMotherboard.id));
      setFilteredRam(compitableRam);

      const compitableGpu = parsedData.gpu.filter((g) => g.compatible_motherboard.includes(selectedMotherboard.id));
      setFilteredGpu(compitableGpu);

      const compitableStorage = parsedData.storage.filter((s) => s.compatible_motherboard.includes(selectedMotherboard.id));
      setFilteredStorage(compitableStorage);

      const compitablePowersupply = parsedData.power_supply.filter((p) => p.compatible_motherboard.includes(selectedMotherboard.id));
      setFilteredPowersupply(compitablePowersupply);

      const compitableCase = parsedData.case.filter((f) => f.compatible_motherboard.includes(selectedMotherboard.id));
      setFilteredCase(compitableCase);
    } else {
      setFilteredProcessors([]);
      setFilteredRam([]);
      setFilteredGpu([]);
      setFilteredStorage([]);
      setFilteredPowersupply([]);
      setFilteredCase([]);
    }

  }, [selectedMotherboard])

  useEffect(() => {

  })

  return (
    <div>
      <div>
        <h3>Select Motherboard</h3>
        <Select
          style={{ width: 250 }}
          placeholder="Choose a Motherboard"
          value={selectedMotherboard ? selectedMotherboard.id : null}
          onChange={(value) => {
            const motherboard = parsedData.motherboard.find(m => m.id === value);
            setSelectedMotherboard(motherboard);
            onMotherboardSelect(motherboard);
          }}
        >
          {parsedData.motherboard.map((m) => (
            <Option key={m.id} value={m.id}>
              {m.name} - ${m.price}
            </Option>
          ))}

        </Select>
      </div>
      <div>
        <h3>Select a Processor</h3>
        <Select style={{ width: 200 }} placeholder="Select a Processor" value={selectedProcessor ? selectedProcessor.id : null} onChange={(value) => {
          const processor = filteredProcessors.find(p => p.id === value);
          setSelectedProcessor(processor);
          onProcessorSelect(processor);
        }}
          disabled={!selectedMotherboard}
        >
          {filteredProcessors.map((m) => (
            <Option key={m.id} value={m.id}>{m.name}- ${m.price}
            </Option>))}
        </Select>
      </div>
      <div>
        <h3>Select a RAM</h3>
        <Select style={{ width: 200 }} placeholder="Select a RAM" onChange={(value) => {
          const ram = filteredRam.find(r => r.id === value);
          onRamSelect(ram);
        }} disabled={!selectedMotherboard} >
          {filteredRam.map((r) => (
            <Option key={r.id} value={r.id}>{r.name}- ${r.price}
            </Option>))}
        </Select>
      </div>
      <div>
        <h3>Select GPU</h3>
        <Select
          style={{ width: 250 }}
          placeholder="Select GPU"
          onChange={(value) => {
            const gpu = filteredGpu.find(r => r.id === value);
            onGpuSelect(gpu);
          }}
          disabled={!selectedMotherboard}
        >
          {filteredGpu.map((g) => (
            <Option key={g.id} value={g.id}>
              {g.name} - ${g.price}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <h3>Select a Storage</h3>
        <Select
          style={{ width: 250 }}
          placeholder="Select a storage"
          onChange={(value) => {
            const storage = filteredStorage.find(s => s.id === value)
            onStorageSelect(storage);
          }}
          disabled={!selectedMotherboard}
        >
          {filteredStorage.map((m) => (
            <Option key={m.id} value={m.id}>
              {m.name} - ${m.price}
            </Option>
          ))}
        </Select>
      </div>
      <div>
        <h3>Select a PowerSupply</h3>
        <Select style={{ width: 250 }}
          placeholder="Select a Powersupply"
          onChange={(value) => {
            const powersupply = filteredPowersupply.find(p => p.id === value)
            onPowersupplySelect(powersupply)
          }}
          disabled={!selectedMotherboard}
        >
          {filteredPowersupply.map((p) => (
            <Option key={p.id} value={p.id}>
              {p.name} - ${p.price}
            </Option>
          ))}

        </Select>
      </div>
      <div>
        <h3>Select a Case</h3>
        <Select style={{ width: 250 }}
          placeholder="Select a Case"
          onChange={(value) =>{const cas=filteredCase.find(c=>c.id===value)
            onCaseSelect(cas)
          }}
          disabled={!selectedMotherboard}
        >
          {filteredCase.map((p) => (
            <Option key={p.id} value={p.id}>
              {p.name} - ${p.price}
            </Option>
          ))}

        </Select>
      </div>
    </div>



  );
};

export default ComponentSelector;