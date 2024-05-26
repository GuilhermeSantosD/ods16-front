import PageTitle from "../../../components/pagetitle";
import {useEffect, useState} from "react";
import React from "react";
import api from "../../../service/api";
import {useNavigate, useParams} from "react-router-dom";

export default function ListagemEquipamentosLogitech() {

    const [logitech, setLogitech] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        buscar();
    }, []);

    async function buscar() {
        await api.get('/logitech/listar').then(response => {
            setLogitech(response.data);
        });
    }

    async function deletar(id) {

        await api.delete('/logitech/deletar/' + id).then(response => {
            buscar();
        })
    }

    function editar(id) {
        navigate("/logitech/editar/" + id);
    }

    return (
        <>
            <PageTitle title="EquipamentoLogitech"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Lista de Equipamentos Logitech</h3>
                        </div>
                        <div className={'card-body'}>
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th style={{width: 10}}>#</th>
                                    <th>Marca</th>
                                    <th>Nome</th>
                                    <th>PartNumber</th>
                                    <th>Descritivo</th>
                                    <th>DataSheet</th>
                                    <th style={{width: 40}}>Açoes</th>
                                </tr>
                                </thead>
                                <tbody>
                                {logitech.map(logitechs => (
                                    <tr key={logitechs.id}>
                                        <td>{logitechs.id}</td>
                                        <td>{logitechs.marca}</td>
                                        <td>{logitechs.nome}</td>
                                        <td>{logitechs.partnumber}</td>
                                        <td>{logitechs.descritivo}</td>
                                        <td>{logitechs.dataSheet}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-primary"
                                                        onClick={event => editar(logitechs.id)}>Editar
                                                </button>
                                                <button type="button" className="btn btn-danger"
                                                        onClick={event => deletar(logitechs.id)}>Excluir
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

