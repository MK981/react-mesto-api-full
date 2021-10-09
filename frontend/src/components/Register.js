import React from "react";
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePassChange(e) {
        setPass(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onRegister(pass, email);
      }

  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form auth__form_type_reg" name="reg" onSubmit={handleSubmit}>
        <input type="email" className="auth__input auth__input_type_login" name="email-input" id="email-input" value={email} placeholder="Email" required onChange={handleEmailChange} />
        <input type="password" className="auth__input auth__input_type_password" name="pass-input" id="pass-input" value={pass} placeholder="Пароль" minLength="4" maxLength="30" required onChange={handlePassChange} />
        <button type="submit" className="auth__submit auth__submit_type_login">Зарегистрироваться</button>
      </form>
      <p className="auth__text">Уже зарегистрированы? <Link to="sign-in" className="auth__link">Войти</Link></p>
    </div>
  );
}

export default Register;
