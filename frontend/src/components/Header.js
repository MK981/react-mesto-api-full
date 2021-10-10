import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();

  function switchLink() {
    if(location.pathname === '/sign-in') {
      return <Link to="sign-up" className="header__link">Регистрация</Link>
    } else {
      return <Link to="sign-in" className="header__link">Войти</Link>
    }
  }

    return (
        <header className="header">
            <a href="https://maxfront.nomoredomains.monster" target="_self"><img src={logo} alt="Логотип" className="header__logo" /></a>
            {props.loggedIn ? <div className="header__right-panel"> <p className="header__text">{props.email}</p>
            <button type="button" className="header__exit" onClick={props.onSignOut} aria-label="Выйти">Выйти</button> </div> : switchLink()}
        </header>
    );
}

export default Header;
