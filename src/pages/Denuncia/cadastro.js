import PageTitle from "../../components/pagetitle";
import { useState } from "react";
import api from "../../service/api";
import Swal from "sweetalert2";
import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function CadastroDenuncias() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [anonymous, setAnonymous] = useState(false);
    const { user } = useAuth();

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            title: titulo,
            description: descricao,
            status: 'Pendente',
            anonymous: anonymous,
            user: anonymous ? null : { id: user.id }
        };
        try {
            const response = await api.post('/reports/create', payload);
            if (response.status === 200) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Denúncia cadastrada com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                setTitulo('');
                setDescricao('');
                setData('');
                setAnonymous(false);
            }
        } catch (error) {
            console.error("Error creating denuncia", error);
            Swal.fire({
                title: 'Erro!',
                text: 'Não foi possível cadastrar a denúncia. Verifique as permissões e tente novamente.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        }
    }

    return (
        <>
            <PageTitle title="Denúncias" />
            <div className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Cadastre uma nova denúncia</h3>
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
                                <div className="form-group">
                                    <label htmlFor="data_denuncia">Data</label>
                                    <input type="date" className="form-control" id="data_denuncia"
                                           required="required"
                                           value={data}
                                           onChange={event => setData(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <input type="checkbox" checked={anonymous} onChange={e => setAnonymous(e.target.checked)} />
                                        Enviar anonimamente
                                    </label>
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
    );
}
