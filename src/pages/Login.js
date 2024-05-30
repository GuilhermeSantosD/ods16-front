import {useState} from "react";
import api from "../service/api";
import Swal from "sweetalert2";
import React from "react";
import {login, isAuthenticated, logout} from "../service/auth";
import Background from "../assets/background.jpeg";
import {useNavigate} from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin(e) {
        e.preventDefault();
        const payload = {
            'usernameOrEmail': email,
            'password': password
        };
        api.post("/auth/signin", payload).then(response => {
            login(response.data.accessToken);
            console.log('Access token after login:', response.data.accessToken); // Log the access token
            console.log('Access token after login:', response.data.accessToken); // Log the access token
            navigate("/");
        }).catch(error => {
            console.error('Login error:', error);
            Swal.fire({
                title: 'Erro!',
                text: "Não foi possível fazer login",
                icon: 'error',
                confirmButtonText: 'Ok'
            });
        });
    }

    const handleRegister = () => {
        Swal.fire({
            title: 'Registro',
            text: "Você será redirecionado para a página de registro",
            icon: 'info',
            confirmButtonText: 'Ok'
        }).then(() => {
            if (isAuthenticated()) {
                console.log('Access token before logout:', localStorage.getItem('token')); // Log the access token before logout
                logout();
                console.log('Access token after logout:', localStorage.getItem('token')); // Log the access token after logout
            }
            navigate("/register");
        }).catch(error => {
            console.error('Register error:', error);
        });
    };

    return (
        <div className="login-page" style={{
            background: `url(${Background})`,
            backgroundSize: "cover",
            backgroundPosition: 'center',
            objectFit: 'cover'
        }}>
            <div className="card card-gray" style={{width: 600}}>
                <div className="card-header text-center">
                    <a href="../../index.html" className="h1"><b>Alert </b> Net</a>
                </div>
                <div className="card-body">
                    <p className="login-box-msg">&nbsp;</p>

                    <form onSubmit={handleLogin}>
                        <div className="input-group mb-3">
                            <input type="email" className="form-control" placeholder="Email"
                                   onChange={event => setEmail(event.target.value)}/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div className="input-group mb-3">
                            <input type="password" className="form-control" placeholder="Senha"
                                   onChange={event => setPassword(event.target.value)}/>
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-8">
                                <div className="icheck-primary">
                                    <input type="checkbox" id="remember"/>
                                    <label htmlFor="remember">
                                        Lembrar
                                    </label>
                                </div>
                            </div>
                            <div className="col-4">
                                <button type="submit" className="btn btn-secondary btn-block">Entrar</button>
                            </div>
                        </div>
                    </form>

                    <div className="row mt-3">
                        <div className="col-12 text-center">
                            <button onClick={handleRegister} className="btn btn-secondary btn-block">Registrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
