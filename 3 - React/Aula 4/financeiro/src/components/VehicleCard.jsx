// src/components/VehicleCard.jsx
export default function VehicleCard({ nome, ano, placa, status, km }) {
  const statusColors = {
    'Manutenção': 'status-manutencao',
    'Alugada': 'status-alugada',
    // Adicione outros status se necessário
  };

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '2rem' }}>🚲</span>
        <div>
          <h2 style={{ margin: '0' }}>{nome}</h2>
          <div style={{ color: '#b0b8c1' }}>{ano}</div>
        </div>
      </div>
      <div style={{ marginTop: '24px', marginBottom: '24px', fontSize: '1.5rem', background:'#232b3e', padding:'8px', borderRadius:'12px', display:'inline-block' }}>
        {placa}
      </div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span>
          <span className={`status-dot ${statusColors[status]}`}></span>
          <strong style={{ marginLeft:'8px' }}>{status}</strong>
        </span>
        <span>{km} km</span>
      </div>
    </div>
  );
}