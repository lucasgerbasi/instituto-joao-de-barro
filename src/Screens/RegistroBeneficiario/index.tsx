import '@styles/global.scss';
import '@styles/registro.scss';

const Registro = () => {
    return (
        <div className="registro">
            <h1 className="subtitle">Registro</h1>
            <p className="description">
                Por favor, preencha os detalhes abaixo para registrar uma família no programa de assistência habitacional.
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

export default Registro;
