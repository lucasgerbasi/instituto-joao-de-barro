import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "@styles/global.scss";

interface Familia {
  name: string;
  priority: boolean;
}

interface Visit {
  name: string;
}

interface Aprovado {
  name: string;
}

export function Beneficiarios() {
  const [activeTab, setActiveTab] = useState<'familias' | 'visitas' | 'aprovados'>('familias');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleTabClick = (tab: 'familias' | 'visitas' | 'aprovados') => {
    setActiveTab(tab);
    setSearchTerm('');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Initial data setup
  const [familiasData, setFamiliasData] = useState<Familia[]>([
    { name: 'Família 1', priority: false },
    { name: 'Família 2', priority: true },
    { name: 'Família 3', priority: false },
  ]);

  const visitasData: Visit[] = [
    { name: 'Visita 1' },
    { name: 'Visita 2' },
    { name: 'Visita 3' },
  ];

  const aprovadosData: Aprovado[] = [
    { name: 'Aprovado 1' },
    { name: 'Aprovado 2' },
    { name: 'Aprovado 3' },
  ];

  const renderTableData = () => {
    let dataToRender: (Familia | Visit | Aprovado)[] = [];
    if (activeTab === 'familias') {
      dataToRender = familiasData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === 'visitas') {
      dataToRender = visitasData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === 'aprovados') {
      dataToRender = aprovadosData.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return dataToRender.map((item, index) => {
      const itemName = 'name' in item ? item.name : '';
      const isPriority = 'priority' in item ? item.priority : false;

      return (
        <tr key={index}>
          <td>{itemName}</td>
          {activeTab === 'familias' && (
            <td>
              <input
                type="checkbox"
                className="prioridade-checkbox"
                checked={isPriority}
                onChange={() => {
                  setFamiliasData(prevData =>
                    prevData.map((familia, idx) =>
                      idx === index ? { ...familia, priority: !familia.priority } : familia
                    )
                  );
                }}
              />
              <span>Prioridade</span>
            </td>
          )}
          <td>
          <button 
            className="table-btn dados-btn" 
            onClick={() => {
              if (activeTab === 'visitas') {
                navigate('/visitas');
              } else {
                navigate('/atualizar');
              }
            }}>
            DADOS
          </button>
            <button className="table-btn excluir-btn">EXCLUIR</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="beneficiarios-page">
      <div className="dashboard-header">
        <div className="left-section">
          <h1 className="subtitle">Dashboard</h1>
          <p className="description">
            Visualize e gerencie as famílias cadastradas no programa de assistência habitacional.
          </p>
        </div>
        <div className="search-section">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar Família"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <div className="buttons">
            {activeTab === 'aprovados' && (
              <button className="btn enviar-btn">Enviar para Assembleia</button>
            )}
            <button className="btn registrar-btn" onClick={() => navigate('/registro')}>Registrar Família</button>
          </div>
        </div>
      </div>

      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'familias' ? 'active' : ''}`} onClick={() => handleTabClick('familias')}>Famílias</button>
        <button className={`tab-btn ${activeTab === 'visitas' ? 'active' : ''}`} onClick={() => handleTabClick('visitas')}>Visitas</button>
        <button className={`tab-btn ${activeTab === 'aprovados' ? 'active' : ''}`} onClick={() => handleTabClick('aprovados')}>Aprovados</button>
      </div>

      <div className="table-container">
        <table className="familias-table">
          <tbody>
            {renderTableData()}
          </tbody>
        </table>
      </div>
    </div>
  );
}
