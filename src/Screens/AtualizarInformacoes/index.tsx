import '@styles/global.scss';
import '@styles/atualizarInformacoes.scss';

const AtualizarInformacoes = () => {
    return (
        <div className="atualizar-informacoes">
            <h1 className="subtitle">Atualizar Informações da Família</h1>
            <p className="description">
                Preencha os campos abaixo para atualizar as informações da família.
            </p>
            <div className="form-control">
                <div className='input-group'>
                    <label>Nome da Família:</label>
                    <input type="text" placeholder="Nome da Família" />

                    <label>Campo 2:</label>
                    <input type="text" placeholder="Campo 2" />

                    <label>Campo 3:</label>
                    <input type="text" placeholder="Campo 3" />
                </div>

                <div className='dropdown-button-group'>
                    <div className="dropdown-group">
                        <label>Dropdown 1</label>
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
                        <label>Dropdown 2</label>
                        <select>
                            <option>Option 1</option>
                            <option>Option 2</option>
                            <option>Option 3</option>
                        </select>
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

export default AtualizarInformacoes;
