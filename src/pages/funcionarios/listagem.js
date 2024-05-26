import PageTitle from "../../components/pagetitle";
import {useEffect, useState} from "react";
import React from "react";
import api from "../../service/api";
import {useNavigate, useParams} from "react-router-dom";

export default function ListagemFuncionarios() {

    const [funcionarios, setFuncionarios] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        buscar();
    }, []);

    async function buscar() {
        await api.get('/funcionario/listar').then(response => {
            setFuncionarios(response.data);
        });
    }

    async function deletar(id) {

        await api.delete('/funcionario/deletar/' + id).then(response => {
            buscar();
        })
    }

    function editar(id) {
        navigate("/funcionarios/editar/" + id);
    }

    return (
        <>
            <PageTitle title="Funcionários"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Lista de funcionários</h3>
                        </div>
                        <div className={'card-body'}>
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Nome</th>
                                    <th>Função</th>
                                    <th>Telefone</th>
                                    <th style={{width: 40}}>Açoes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {funcionarios.map(funcionario => (
                                    <tr key={funcionario.id}>
                                        <td>{funcionario.id}</td>
                                        <td>{funcionario.nome}</td>
                                        <td>{funcionario.funcao}</td>
                                        <td>{funcionario.telefone}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-primary"
                                                        onClick={event => editar(funcionario.id)}>Editar
                                                </button>
                                                <button type="button" className="btn btn-danger"
                                                        onClick={event => deletar(funcionario.id)}>Excluir
                                                </button>
                                            </div>
                                        </td>

                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

