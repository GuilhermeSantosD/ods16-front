import PageTitle from "../../components/pagetitle";
import {useEffect, useState} from "react";
import api from "../../service/api";
import Swal from "sweetalert2";
import React from "react";
import {useParams} from "react-router-dom";

export default function CadastroFuncionarios() {
    const [cargos, setCargos] = useState([]);
    const [nome, setNome] = useState('');
    const [usuario, setUsuario] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cargo, setCargo] = useState('');
    const {id} = useParams();
    useEffect(() => {
        api.get('/funcionario/cargos').then(response => {
            buscarId(id);
            setCargos(response.data);
            setCargo(response.data[0]);
        });
    }, []);

    async function buscarId(id) {
        await api.get('/funcionario/' + id).then(response => {
            setCargos(response.data.cargos);
            setNome(response.data.nome);
            setUsuario(response.data.usuario);
            setTelefone(response.data.telefone);
            setEmail(response.data.email);
            setSenha(response.data.senha);
            setCargo(response.data.cargo);
            console.log(response.data.identificador)
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            'nome': nome,
            'username': usuario,
            'telefone': telefone,
            'email': email,
            'senha': senha,
            'funcao': cargo,
            'id': id
        };
        api.post('/funcionario/cadastrar', payload).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: response.data,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
            window.location.href = "/funcionarios/lista";
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <PageTitle title="Funcionários"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Cadastre um novo funcionário</h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="nome_funcionario">Nome do funcionário</label>
                                    <input type="text" className="form-control" id="nome_funcionario"
                                           required="required"
                                           placeholder="Insira o nome do funcionário"
                                           value={nome}
                                           onChange={event => setNome(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="usuario_funcionario">Usuário</label>
                                    <input type="text" className="form-control" id="usuario_funcionario"
                                           required="required"
                                           placeholder="Insira um nome de usuário"
                                           value={usuario}
                                           onChange={event => setUsuario(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpf">Telefone</label>
                                    <input type="text" className="form-control" id="telefone"  required="required"
                                           placeholder="Insira o Telefone do funcionário"
                                           onChange={event => setTelefone(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Endereço de email</label>
                                    <input type="email" className="form-control" id="email"
                                           required="required"
                                           placeholder="Insira um email"
                                           value={email}
                                           onChange={event => setEmail(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="senha">Senha</label>
                                    <input type="password" className="form-control" id="senha"
                                           required="required"
                                           placeholder="Insira a senha"
                                           value={senha}
                                           onChange={event => setSenha(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cargo">Cargo</label>
                                    <select className={'form-control'} value={cargo} onChange={event => setCargo(event.target.value)}>
                                        {cargos.map(cargo => (
                                            <option value={cargo}>{cargo}</option>
                                        ))}
                                    </select>
                                </div>

                            </div>

                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Cadastrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}
