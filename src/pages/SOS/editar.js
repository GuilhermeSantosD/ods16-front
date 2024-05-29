import PageTitle from "../../components/pagetitle";
import { useState, useEffect } from "react";
import api from "../../service/api";
import Swal from "sweetalert2";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarDenuncia() {
    const { id } = useParams();
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [status, setStatus] = useState('');
    const [permissao, setPermissao] = useState('');
    const navigate = useNavigate();

    const statusOptions = [
        { value: 'Pendente', label: 'Pendente' },
        { value: 'Em Andamento', label: 'Em Andamento' },
        { value: 'Concluído', label: 'Concluído' }
    ];

    useEffect(() => {
        api.get('/user/permissao').then(response => {
            setPermissao(response.data[0].name);
        }).catch(error => {
            console.error("Error fetching user permission", error);
        });

        api.get(`/reports/list/${id}`).then(response => {
            setTitulo(response.data.title);
            setDescricao(response.data.description);
            setStatus(response.data.status);
        }).catch(error => {
            console.error("Error fetching report", error);
        });
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            title: titulo,
            description: descricao,
            status: permissao === "ROLE_ADMIN" ? status : undefined, // Apenas enviar status se for admin
        };
        try {
            const response = await api.put(`/reports/update/${id}`, payload);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Denúncia atualizada com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                navigate("/denuncias/lista");
            }
        } catch (error) {
            console.error("Error updating denuncia", error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível atualizar a denúncia. Verifique as permissões e tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    return (
        <>
            <PageTitle title="Editar Denúncia" />
            <div className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Editar denúncia</h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="titulo_denuncia">Título</label>
                                    <input type="text" className="form-control" id="titulo_denuncia"
                                           required="required"
                                           placeholder="Insira o título da denúncia"
                                           value={titulo}
                                           onChange={event => setTitulo(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="descricao_denuncia">Descrição</label>
                                    <textarea className="form-control" id="descricao_denuncia"
                                              required="required"
                                              placeholder="Insira a descrição da denúncia"
                                              value={descricao}
                                              onChange={event => setDescricao(event.target.value)}></textarea>
                                </div>
                                {permissao === "ROLE_ADMIN" && (
                                    <div className="form-group">
                                        <label htmlFor="status_denuncia">Status</label>
                                        <select className="form-control" id="status_denuncia"
                                                value={status}
                                                onChange={event => setStatus(event.target.value)}>
                                            {statusOptions.map(option => (
                                                <option key={option.value} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="card-footer">
                                <button type="submit" className="btn btn-primary">Atualizar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
