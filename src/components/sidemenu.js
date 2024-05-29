import { Link } from "react-router-dom";
import React from "react";
import { logout } from "../service/auth";

export default function SideMenu() {

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
                     style={{ opacity: .8 }} />
                <span className="brand-text font-weight-light">Alert Net</span>
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
                        <li className="nav-item menu-closed">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-user"></i>
                                <p>
                                    Denúncia
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/denuncia/novo" className="nav-link">
                                        <i className="fas fa-plus nav-icon"></i>
                                        <p>Novo</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/denuncia/lista" className="nav-link">
                                        <i className="fas fa-scroll nav-icon"></i>
                                        <p>Listagem</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item menu-closed">
                            <a href="#" className="nav-link">
                                <i className="nav-icon fas fa-bell"></i>
                                <p>
                                    SOS
                                    <i className="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            <ul className="nav nav-treeview">
                                <li className="nav-item">
                                    <Link to="/sos/novo" className="nav-link">
                                        <i className="fas fa-plus nav-icon"></i>
                                        <p>Novo SOS</p>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/sos/lista" className="nav-link">
                                        <i className="fas fa-scroll nav-icon"></i>
                                        <p>Listagem SOS</p>
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <Link to="#logout" className="nav-link" onClick={logout}>
                                <i className="nav-icon fas fa-door-open"></i>
                                <p>Sair</p>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}
