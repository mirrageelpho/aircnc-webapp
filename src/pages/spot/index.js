import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './style.css';

export default function Spot({ history }) {
    const [ thumbnail, setThumbnail ] = useState(null);
    const [ company, setCompany ] = useState('');
    const [ location, setLocation ] = useState('');
    const [ price, setPrice ] = useState('');
    const [ techs, setTechs ] = useState('');

    /**
     * @description a variável preview faz uso dos hooks no caso o useMemo 
     * para escutar e receber o valor de thumbail sempre o mesmo for alterado
     */

    const preview = useMemo(()=>{
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    /**
     * 
     * @param {*} event previne o comportamento padrão do formulário
     */

    const data = new FormData();
    const userid = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('location', location);
    data.append('price', price);
    data.append('techs', techs);

    async function handleSubmit(event){
        event.preventDefault();
        const response = await api.post('/spots', data,{
            headers: { userid }
        })

        if(response.status === 200) {
            history.push('/dashboard');
        }
    };

    function goback(){
        history.push('/dashboard')
    }
    return (
        <>
            <h1>New Spot</h1>
            <form onSubmit={handleSubmit}>
                <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})`}}
                className={preview ? 'has-thumbnail':''}
                >
                    <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                    <img src={camera} alt="Select"/>
                </label>
                <label htmlFor="company">Empresa *</label>
                <input 
                 type="text"
                 placeholder="Sua empresa"
                 name="company"
                 id="company"
                 value={company}
                 onChange={event => setCompany(event.target.value)}
                />
                <label htmlFor="location">Cidade *</label>
                <input 
                 type="text"
                 placeholder="Onde fica"
                 name="location"
                 id="location"
                 value={location}
                 onChange={event => setLocation(event.target.value)}
                />
                <label htmlFor="techs">Tecnologias * <span>(separadas por vírgula)</span></label>
                <input 
                 type="text"
                 placeholder="tec a, tec b, tec c,"
                 name="techs"
                 id="techs"
                 value={techs}
                 onChange={event => setTechs(event.target.value)}
                />
                <label htmlFor="price">Preço * <span>(Em branco para gratuito)</span></label>
                <input 
                 type="text"
                 placeholder="Valor cobrado"
                 name="price"
                 id="price"
                 value={price}
                 onChange={event => setPrice(event.target.value)}
                />
                <div className="footer">                    
                    <button className="btn formBtn btnGrey" onClick={goback}>Cancelar</button>
                    <button className="btn formBtn" type="submit">cadastrar</button>
                </div>
            </form>
        </>
    );
}