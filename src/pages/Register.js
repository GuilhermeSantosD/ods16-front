import React, { useState } from 'react';
import api from "../service/api";
import Swal from "sweetalert2";
import Background from "../assets/background.jpeg";

export default function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleRegister(e) {
        e.preventDefault();
        const payload = {
            'name': name,
            'username': username,
            'email': email,
            'password': password
        };

        api.post("/auth/signup", payload).then(response => {
            Swal.fire({
                title: 'Sucesso!',
                text: "Registro realizado com sucesso",
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then(() => {
                window.location.href = "/login";
            });
        }).catch(error => {
            Swal.fire({
                title: 'Erro!',
                text: "Não foi possível realizar o registro",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        });
    }

    return (
        <div className="register-page" style={{ background: `url(${Background})`, backgroundSize:"cover", backgroundPosition:'center', objectFit:'cover'}}  >
            <div className="card card-gray" style={{width: 600}}>
                <div className="card-header text-center">
                    <a href="../../index.html" className="h1"><b>ODS </b> 16</a>
                </div>
                <div className="card-body">
                    <p className="register-box-msg">&nbsp;</p>

                    <form onSubmit={handleRegister}>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nome" onChange={event => setName(event.target.value)} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="text" className="form-control" placeholder="Nome de usuário" onChange={event => setUsername(event.target.value)} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email" onChange={event => setEmail(event.target.value)} />
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Senha" onChange={event => setPassword(event.target.value)}/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="agreeTerms" />
                                    <label htmlFor="agreeTerms">
                                        Eu concordo com os <a href="#">termos</a>
                                    </label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-secondary btn-block">Registrar</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
