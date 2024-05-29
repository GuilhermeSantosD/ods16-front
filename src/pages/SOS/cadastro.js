import PageTitle from "../../components/pagetitle";
import {useEffect, useState} from "react";
import api from "../../service/api";
import Swal from "sweetalert2";
import React from "react";

export default function CadastroDenuncias() {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [data, setData] = useState('');
    const [status, setStatus] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        api.get('/user/role').then(response => {
            setIsAdmin(response.data.role === 'ADMIN');
        }).catch(error => {
            console.error("Error fetching user role", error);
        });
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            title: titulo,
            description: descricao,
            status: isAdmin ? status : 'Pendente', // Define um status padrão se o usuário não for administrador
            user: { id: 1 } // Substitua pelo ID do usuário apropriado
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
                // Limpar os campos do formulário após o sucesso
                setTitulo('');
                setDescricao('');
                setData('');
                setStatus('');
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
                                {isAdmin && (
                                    <div className="form-group">
                                        <label htmlFor="status_denuncia">Status</label>
                                        <input type="text" className="form-control" id="status_denuncia"
                                               placeholder="Insira o status da denúncia"
                                               value={status}
                                               onChange={event => setStatus(event.target.value)} />
                                    </div>
                                )}
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