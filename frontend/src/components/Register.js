import React from "react";
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');

    const [name, setName] = React.useState('');
    const [info, setInfo] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePassChange(e) {
        setPass(e.target.value);
    }

    function handleNameChange(e) {
      setName(e.target.value);
    }

    function handleInfoChange(e) {
      setInfo(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onRegister(pass, email, name, info);
      }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form auth__form_type_reg" name="reg" onSubmit={handleSubmit}>
        <input type="email" className="auth__input auth__input_type_login" name="email-input" id="email-input" value={email} placeholder="Email" required onChange={handleEmailChange} />
        <input type="text" className="auth__input auth__input_type_name" name="user-name-input" id="user-name-input" value={name} placeholder="Ваше имя" minLength="2" maxLength="30" onChange={handleNameChange} />
        <input type="text" className="auth__input auth__input_type_info" name="info-input" id="info-input" value={info} placeholder="О себе" minLength="2" maxLength="40" onChange={handleInfoChange} />
        <input type="password" className="auth__input auth__input_type_password" name="pass-input" id="pass-input" value={pass} placeholder="Пароль" minLength="4" maxLength="30" required onChange={handlePassChange} />
        <button type="submit" className="auth__submit auth__submit_type_reg">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link to="sign-in" className="auth__link">Войти</Link></p>
    </div>
  );
}

export default Register;
