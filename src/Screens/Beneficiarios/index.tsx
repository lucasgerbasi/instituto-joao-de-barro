import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "@styles/global.scss";
import { api } from "../../api";

export interface Familia {
  id: number;
  name: string;
  renda: number;
  situacao: string;
  numeroFamiliares: number;
  priority: boolean;
}

export interface Visit {
  id: number;
  name: string;
  data: string;
  relatorio: string;
}

export interface Aprovado {
  id: number;
  name: string;
  renda: number;
  situacao: string;
  numeroFamiliares: number;
  priority: boolean;
}

export function Beneficiarios() {
  const [activeTab, setActiveTab] = useState<'familias' | 'visitas' | 'aprovados'>('familias');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const [familiasData, setFamiliasData] = useState<Familia[]>([]);
  const [visitasData, setVisitasData] = useState<Visit[]>([]);
  const [aprovadosData, setAprovadosData] = useState<Aprovado[]>([]);

  const handleTabClick = (tab: 'familias' | 'visitas' | 'aprovados') => {
    setActiveTab(tab);
    setSearchTerm('');
  };


  const deleteFamilia = async (id: number) => {
    const confirmDelete = window.confirm('Você tem certeza que deseja excluir este item?');
    if (!confirmDelete) return;

    try {
      if (activeTab === 'familias') {
        await api.delete(`/familias/${id}`);
      } else if (activeTab === 'aprovados') {
        await api.delete(`/aprovados/${id}`);
      }
      console.log('Item excluído com sucesso!');
      fetchData();
    } catch (err) {
      console.log("Erro ao excluir item: " + err);
    }
  };

  const moveToAprovados = async (familia: Familia) => {
    try {

      const familiaToMove = await api.get(`/familias/${familia.id}`)
      if (familiaToMove) {
        await api.post('/aprovados', familia);
        await api.delete(`/familias/${familia.id}`);
      }
      console.log('Família movida para aprovados com sucesso!');
      fetchData();
    } catch (err) {
      console.log("Erro ao mover família para aprovados: " + err);
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const fetchData = async () => {
    if (activeTab === 'familias') {
      try {
        const response = await api.get("/familias");
        setFamiliasData(response.data);
      } catch (err) {
        console.log("Error during fetch: " + err);
      }
    }
    if (activeTab === 'visitas') {
      try {
        const response = await api.get("/visitas");
        setVisitasData(response.data);
      } catch (err) {
        console.log("Error during fetch: " + err);
      }
    }
    if (activeTab === 'aprovados') {
      try {
        const response = await api.get("/aprovados");
        setAprovadosData(response.data);
      } catch (err) {
        console.log("Error during fetch: " + err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const renderTableData = () => {
    let dataToRender: (Familia | Visit | Aprovado)[] = [];

    if (activeTab === 'familias') {
      dataToRender = familiasData.filter(item =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === 'visitas') {
      dataToRender = visitasData.filter(item =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else if (activeTab === 'aprovados') {
      dataToRender = aprovadosData.filter(item =>
        item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
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
                onClick={() => moveToAprovados(item as Familia)}
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
                  navigate(`/atualizar/${item.id}`);
                }
              }}>
              DADOS
            </button>
            <button onClick={() => deleteFamilia(item.id)} className="table-btn excluir-btn">EXCLUIR</button>
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
