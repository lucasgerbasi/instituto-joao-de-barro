import '@styles/global.scss';
import '@styles/atualizarInformacoesVisitas.scss';

const AtualizarInformacoesVisitas = () => {
    return (
        <div className="atualizar-informacoes-visitas">
            <h1 className="subtitle">Atualizar Informações da Visita</h1>
            <p className="description">
                Preencha os campos abaixo para atualizar as informações da visita.
            </p>
            <div className="form-control">
                <div className='input-group'>
                    <label>Nome da Família:</label>
                    <input type="text" placeholder="Nome da Família" />

                    <label>Relatório:</label>
                    <textarea placeholder="Digite seu relatório aqui..." rows={5} style={{ width: '100%' }} />
                </div>

                <div className='dropdown-button-group'>
                    <div className="dropdown-group">
                        <label>Dropdown 1</label>
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                    </div>

                    <div className="upload-group">
                        <label className="upload-label">Arraste para inserir imagens</label>
                        <div className="upload-area">
                            <input type="file" accept="image/*" className="file-input" />
                            <span className="file-button">Escolher Arquivo</span>
                        </div>
                    </div>

                    <div className="button-group">
                        <button className="button confirm-btn">CONFIRMAR</button>
                        <button className="button discard-btn">DESCARTAR</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AtualizarInformacoesVisitas;
