import React, {useState} from 'react'
import api from '../../services/api';

export default function Login( { history } ){
    const [email, setEmail] = useState('');

    /**
     * @description Controla o envio de dados do 
     * formulário para efetuar login
     * @param {*} event utilizado apenas para previnir
     * o comportamento padrão do formulário
     * de atualizar a página
     */
    async function handleSubmit(event) {
      event.preventDefault();
      if(email){        
        const response = await api.post('/sessions', { email });
        const { _id } = response.data;
        localStorage.setItem('user', _id);
        history.push('/dashboard')
      }
    }

    return (
        <>
        <h1>Login</h1>
        <p>
          Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para sua empresa.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL: </label>
          <input
            type="email"
            id="email"
            placeholder="seu e-mail principal"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
          <button className="btn" type="submit">
            Entrar
          </button>
        </form>
        </>
    );
}