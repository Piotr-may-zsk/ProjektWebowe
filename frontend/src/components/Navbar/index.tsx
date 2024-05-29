import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routing.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export default function Navbar() {
    const auth = useAuthUser();
    const signOut = useSignOut();
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg"> 
            <Link className="navbar-brand" to="/">
                <img src="public/logo.png" alt="Logo" width="80" height="80" className="d-inline-block align-top" />
            </Link>

            <div className="nav-container">
                <ul className="navbar-nav navbar-nav-bottom mr-auto">
                    {routes.filter(route => !route.hidden).map((route) => (
                        <li className={"nav-item"} key={route.path}>
                            <Link className="nav-link" to={route.path}>{route.label}</Link>
                        </li>
                    ))}
                </ul>
                {auth ? (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="nav-link">{auth.email}</span> 
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-danger" onClick={handleSignOut}>Wyloguj się</button>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item nav-login" key={'login'}>
                            <Link className="nav-link" to={"/login"}>Zaloguj się</Link>
                        </li>
                        <li className="nav-item nav-register" key={'register'}>
                            <Link className="nav-link" to={"/register"}>Zarejestruj się</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}
