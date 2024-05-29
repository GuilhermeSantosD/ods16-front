import PageTitle from "../../components/pagetitle";
import { useEffect, useState } from "react";
import api from "../../service/api";
import Swal from "sweetalert2";
import React from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function ListagemDenuncias() {
    const [reports, setReports] = useState([]);
    const [permissao, setPermissao] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        api.get('/user/permissao').then(response => {
            setPermissao(response.data[0].name);
        }).catch(error => {
            console.error("Error fetching user permission", error);
        });

        buscar();
    }, []);

    async function buscar() {
        await api.get('/reports/list').then(response => {
            setReports(response.data);
        });
    }

    async function deletar(id) {
        await api.delete(`/reports/delete/${id}`).then(response => {
            buscar();
        });
    }

    function editar(id) {
        navigate(`/denuncias/editar/${id}`);
    }

    function formatarData(data) {
        return format(new Date(data), 'dd/MM/yyyy HH:mm:ss');
    }

    return (
        <>
            <PageTitle title="Denúncias" />
            <div className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Lista de denúncias</h3>
                        </div>
                        <div className={'card-body'}>
                            <table className="table table-sm">
                                <thead>
                                <tr>
                                    <th style={{ width: 10 }}>#</th>
                                    <th>Título</th>
                                    <th>Descrição</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                    <th style={{ width: 40 }}>Ações</th>
                                </tr>
                                </thead>
                                <tbody>
                                {reports.map(report => (
                                    <tr key={report.id}>
                                        <td>{report.id}</td>
                                        <td>{report.title}</td>
                                        <td>{report.description}</td>
                                        <td>{formatarData(report.submissionDate)}</td>
                                        <td>{report.status}</td>
                                        <td>
                                            {permissao === "ROLE_ADMIN" && (
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-primary"
                                                            onClick={() => editar(report.id)}>Editar
                                                    </button>
                                                    <button type="button" className="btn btn-danger"
                                                            onClick={() => deletar(report.id)}>Excluir
                                                    </button>
                                                </div>
                                            )}
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
    );
}
