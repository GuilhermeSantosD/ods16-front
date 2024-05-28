import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import React from "react";
import api from "../service/api";
import { logout } from "../service/auth";


export default function SideMenu() {
    const [permissao, setPermissao] = useState('');
    useEffect(() => {
        api.get('/user/permissao').then(response => {
            setPermissao(response.data[0].name);
        });
    }, []);

    function atualizaMenu() {
        const currentPath = window.location.pathname;
        const menuItems = document.querySelectorAll('.nav-link');
        menuItems.forEach(item => {
            if (item.getAttribute('href') === currentPath) {
                item.classList.add('active');
            }
        });
    }


    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">

            <Link to="/" className="brand-link">
                <img src="/dist/img/logo.jpeg" alt="LogoUnentel" className="brand-image elevation-3"
                     style={{opacity: .8}}/>
                <span className="brand-text font-weight-light"> ODS 16</span>
            </Link>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">
                        <li className="nav-item">
                            <Link to="/" className="nav-link active">
                                <i className="nav-icon fas fa-home"></i>
                                <p>Inicio</p>
                            </Link>
                        </li>
                        {permissao === "ROLE_ADMIN" &&
                            <>
                                <li className="nav-item menu-closed">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-user"></i>
                                        <p>
                                            Denuncia
                                            <i className="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/funcionarios/novo" className="nav-link">
                                                <i className="fas fa-plus nav-icon"></i>
                                                <p>Novo</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/funcionarios/lista" className="nav-link">
                                                <i className="fas fa-scroll nav-icon"></i>
                                                <p>Listagem</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="nav-item menu-closed">
                                    <a href="#" className="nav-link">
                                        <i className="nav-icon fas fa-tv"></i>
                                        <p>
                                            Test
                                            <i className="right fas fa-angle-left"></i>
                                        </p>
                                    </a>
                                    <ul className="nav nav-treeview">
                                        <li className="nav-item">
                                            <Link to="/yealink/cadastrar" className="nav-link">
                                                <i className="fas fa-plus nav-icon"></i>
                                                <p>Novo</p>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to="/yealink/listar" className="nav-link">
                                                <i className="fas fa-scroll nav-icon"></i>
                                                <p>Listagem</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        }
                        <li className={'nav-item'}>
                            <Link to="#logout" className="nav-link" onClick={logout}>
                                <i className="nav-icon fas fa-door-open"></i>
                                <p>Sair</p>
                            </Link>
                        </li>
                    </ul>
                </nav>

            </div>

        </aside>
    )
}
