import PageTitle from "../../../components/pagetitle";
import {useEffect, useState} from "react";
import api from "../../../service/api";
import Swal from "sweetalert2";
import React from "react";
import {useParams} from "react-router-dom";

export default function CadastroEquipamentosLenovo() {
    const [marca, setMarca] = useState('');
    const [nome, setNome] = useState('');
    const [partnumber, setPartnumber] = useState('');
    const [descritivo, setDescritivo] = useState('');
    const [dataSheet, setDataSheet] = useState('');
    const {id} = useParams();
    useEffect(() => {
        buscarId(id);

    }, [])

    async function buscarId(id) {
        await api.get('/lenovo/' + id).then(response => {
            setMarca(response.data.marca);
            setNome(response.data.nome);
            setPartnumber(response.data.partnumber);
            setDescritivo(response.data.descritivo);
            setDataSheet(response.data.dataSheet);
            console.log(response.data.identificador)
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            'marca': marca,
            'nome': nome,
            'partnumber' : partnumber,
            'descritivo': descritivo,
            'dataSheet': dataSheet,
            'id': id
        };
        api.post('/lenovo/cadastrar', payload).then(response => {
            if (response.status === 200) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: response.data,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
            }
            window.location.href = "/lenovo/lista";
        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <>
            <PageTitle title="Equipamentos Lenovo"/>
            <div className="content">
                <div className="container-fluid">
                    <div className="card card-primary">
                        <div className="card-header">
                            <h3 className="card-title">Cadastro de um novo equipamento Lenovo</h3>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                    <label htmlFor="nome_funcionario">Marca</label>
                                    <input type="text" className="form-control" id="marca"
                                           required="required"
                                           placeholder="Insira a Marca"
                                           value={marca}
                                           onChange={event => setMarca(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="usuario_funcionario">Nome do equipamento</label>
                                    <input type="text" className="form-control" id="nome"
                                           required="required"
                                           placeholder="Insira o nome do equipamento"
                                           value={nome}
                                           onChange={event => setNome(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpf">Descritivo</label>
                                    <input type="text" className="form-control" id="descritivo" required="required"
                                           placeholder="Insira o Descritivo"
                                           value={descritivo}
                                           onChange={event => setDescritivo(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cpf">PartNumber</label>
                                    <input type="text" className="form-control" id="partnumber" required="required"
                                           placeholder="Insira o PartNumber"
                                           value={partnumber}
                                           onChange={event => setPartnumber(event.target.value)}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">DataSheet</label>
                                    <input type="dataSheet" className="form-control" id="dataSheet"
                                           required="required"
                                           placeholder="Insira o link do datasheet"
                                           value={dataSheet}
                                           onChange={event => setDataSheet(event.target.value)}/>
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
