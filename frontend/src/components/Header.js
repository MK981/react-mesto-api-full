import React from 'react';
import logo from '../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';

function Header(props) {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = React.useState(false);
  const [buttonActive, setButtonActive] = React.useState(false);

  function switchLink() {
    if(location.pathname === '/sign-in') {
      return <Link to="sign-up" className="header__link">Регистрация</Link>
    } else {
      return <Link to="sign-in" className="header__link">Войти</Link>
    }
  }

  function switchMenu() {
    if(menuOpen) {
      setButtonActive(false);
      setMenuOpen(false);
    } else {
      setButtonActive(true);
      setMenuOpen(true);
    }
  }

  const headerMenuClassName = (`header__menu ${menuOpen ? 'header__menu_active' : ''}`);
  const buttonClassName = (`header__menuButton ${buttonActive ? 'header__menuButton_active' : ''}`);

    return (
        <header className="header">
            <a href="https://maxfront.nomoredomains.monster" target="_self"><img src={logo} alt="Логотип" className="header__logo" /></a>
            {props.loggedIn ?
              <div>
                <div className="header__right-panel">
                  <p className="header__text">{props.email}</p>
                  <button type="button" className="header__exit" onClick={props.onSignOut} aria-label="Выйти">Выйти</button>
                </div>
                <button type="button" className={buttonClassName} onClick={switchMenu} aria-label="Меню"></button>
                <div className={headerMenuClassName}>
                    <p className="header__text">{props.email}</p>
                    <button type="button" className="header__exit" onClick={props.onSignOut} aria-label="Выйти">Выйти</button>
                  </div>
              </div> : switchLink()}
        </header>
    );
}

export default Header;
