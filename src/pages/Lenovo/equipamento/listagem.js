import PageTitle from "../../../components/pagetitle";
import {useEffect, useState} from "react";
import React from "react";
import api from "../../../service/api";
import {useNavigate, useParams} from "react-router-dom";

export default function ListagemEquipamentosLenovo() {

    const [lenovo, setLenovo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        buscar();
    }, []);

    async function buscar() {
        await api.get('/lenovo/listar').then(response => {
            setLenovo(response.data);
        });
    }

    async function deletar(id) {

        await api.delete('/lenovo/deletar/' + id).then(response => {
            buscar();
        })
    }

    function editar(id) {
        navigate("/lenovo/editar/" + id);
    }

    return (
        <>
            <PageTitle title="EquipamentoLenovo"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Lista de Equipamentos Lenovo</h3>
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
                                {lenovo.map(lenovos => (
                                    <tr key={lenovos.id}>
                                        <td>{lenovos.id}</td>
                                        <td>{lenovos.marca}</td>
                                        <td>{lenovos.partnumber}</td>
                                        <td>{lenovos.nome}</td>
                                        <td>{lenovos.descritivo}</td>
                                        <td>{lenovos.dataSheet}</td>
                                        <td>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-primary"
                                                        onClick={event => editar(lenovos.id)}>Editar
                                                </button>
                                                <button type="button" className="btn btn-danger"
                                                        onClick={event => deletar(lenovos.id)}>Excluir
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

