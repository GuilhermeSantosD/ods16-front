import PageTitle from "../../../components/pagetitle";
import {useEffect, useState} from "react";
import React from "react";
import api from "../../../service/api";
import {useNavigate, useParams} from "react-router-dom";

export default function ListagemEquipamentosYealink() {

    const [yealink, setYealink] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        buscar();
    }, []);

    async function buscar() {
        await api.get('/yealink/listar').then(response => {
            setYealink(response.data);
        });
    }

    async function deletar(id) {

        await api.delete('/yealink/deletar/' + id).then(response => {
            buscar();
        })
    }

    function editar(id) {
        navigate("/yealink/editar/" + id);
    }

    return (
        <>
            <PageTitle title="Equipamento"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Lista de Equipamentos Yealink</h3>
                        </div>
                        <div className={'card-body'}>
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Marca</th>
                                    <th>Nome</th>
                                    <th>Descritivo</th>
                                    <th>DataSheet</th>
                                    <th style={{width: 40}}>Açoes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {yealink.map(yealinks => (
                                    <tr key={yealinks.id}>
                                        <td>{yealinks.id}</td>
                                        <td>{yealinks.marca}</td>
                                        <td>{yealinks.nome}</td>
                                        <td>{yealinks.descritivo}</td>
                                        <td>{yealinks.dataSheet}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-primary"
                                                        onClick={event => editar(yealinks.id)}>Editar
                                                </button>
                                                <button type="button" className="btn btn-danger"
                                                        onClick={event => deletar(yealinks.id)}>Excluir
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

