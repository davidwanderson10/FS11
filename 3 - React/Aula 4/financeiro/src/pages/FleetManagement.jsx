import { useState } from "react";
import VehicleCard from "../components/VehicleCard";
import AddVehicleModal from "../components/AddVehicleModal";

const initialVehicles = [
  { nome:"Honda Stat 160", ano:"2019", placa:"POU2C72", status:"Manutenção", km:"62.000" },
  { nome:"Honda Stat 160", ano:"2022", placa:"RIK4B08", status:"Alugada", km:"58.000" }
];

export default function FleetManagement() {
  const [vehicles, setVehicles] = useState(initialVehicles);
  const [showModal, setShowModal] = useState(false);

  function handleAdd(vehicle) {
    setVehicles([...vehicles, { ...vehicle, ano:"2024", placa:"NOVO", km:"0" }]);
  }

  return (
    <div style={{padding:'40px', position:'relative'}}>
      <h1>Gestão de Frota</h1>
      <p>{vehicles.length} veículos cadastrados</p>
      <div style={{display:'flex', gap:'32px'}}>
        {vehicles.map((v,i) => (
          <VehicleCard key={i} {...v} />
        ))}
      </div>
      <button className="button-add" onClick={()=>setShowModal(true)}>+</button>
      {showModal && (
        <AddVehicleModal onClose={()=>setShowModal(false)} onAdd={handleAdd} />
      )}
    </div>
  );
}