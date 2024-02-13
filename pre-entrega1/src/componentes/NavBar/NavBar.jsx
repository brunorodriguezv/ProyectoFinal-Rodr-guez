import React from 'react';
import './NavBar.css';
import CartWidget from '../CartWidget/CartWidget';
import { Link, NavLink } from 'react-router-dom';

const NavBar = () => {
    return (
        <header>

            <nav>
                <Link to="/" className='logoCont'>
                    <img src="../img/logo-removebg-preview.png" alt="IStore" className='logo' />
                </Link>

                <ul>

                    <li>
                        <NavLink to="/category/2" className="navLink">
                            IPhone
                        </NavLink>
                    </li>

                    <li >
                        <NavLink to="/category/3" className="navLink">
                            Mac
                        </NavLink>
                    </li>

                </ul>
            </nav>

            < CartWidget className="cartBtn" />

        </header>
    )
}

export default NavBar