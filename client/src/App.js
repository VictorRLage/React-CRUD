import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';

import Axios from "axios";



function App() {

  const [nome, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState(0);
  const [senha, setSenha] = useState("");
  const [listaPrestadores, setListaPrestadores] = useState([]);
  const [emailNovo, setEmailNovo] = useState("");


  const postPrestador = () => {
    Axios.post("http://localhost:3001/cadastrar", {
      nome: nome,
      email: email,
      cpf: cpf,
      senha: senha
    }).then(() => {
      console.log('enviado')
      getPrestadores()
    });
  };

  const getPrestadores = () => {
    Axios.get("http://localhost:3001/buscar").then((response) => {
      console.log("buscado");
      console.log(response);
      setListaPrestadores(response.data)
    });
  }

  const deletePrestador = (email) => {
    Axios.delete(`http://localhost:3001/deletar/${email}`).then(() => {
      console.log('deletado')
      getPrestadores()
    });
  };

  const putPrestador = (emailAtual) => {
    Axios.put(`http://localhost:3001/altualizar/${emailAtual}/${emailNovo}`).then(() => {
      console.log('atualizado')
      getPrestadores()
    });
  };


  return (
    <div className="App">
      <div className="form">
        <h1>Cadastro</h1>
        <label>Nome:</label>
        <input type="text" onChange={(event) => { setName(event.target.value); }} />
        <label>E-mail:</label>
        <input type="text" onChange={(event) => { setEmail(event.target.value); }} />
        <label>CPF:</label>
        <input type="text" onChange={(event) => { setCpf(event.target.value); }} />
        <label>Senha:</label>
        <input type="text" onChange={(event) => { setSenha(event.target.value); }} />
        <button onClick={postPrestador}>Cadastrar</button>
      </div>
      <hr className='linha'></hr>
      <div className='prestadores'>
        <button onClick={getPrestadores}>Mostar Prestradores</button>
        {listaPrestadores.map((val, key) => {
          return (
            <div className='prestador'>
              <h3>
                Nome: {val.nome}
              </h3>
              <h3>
                Email: {val.email}
              </h3>
              <h3>
                CPF: {val.cpf}
              </h3>
              <div className='btns'>
                <button className='delete' onClick={() =>deletePrestador(val.email)}>X</button>
                <div className='altera'>
                <input className='inp' onChange={(event) => { setEmailNovo(event.target.value); }}></input>
                <button className='delete' onClick={() =>putPrestador(val.email)}>A</button>
              </div>
              </div>

            </div>)
        })}
      </div>
    </div>
  );
}

export default App;
