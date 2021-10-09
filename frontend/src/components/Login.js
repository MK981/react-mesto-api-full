import React from "react";

function Login(props) {

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

        props.onLogin(pass, email);
      }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form auth__form_type_login" name="login" onSubmit={handleSubmit}>
        <input type="email" className="auth__input auth__input_type_login" name="email-input" id="email-input" value={email} placeholder="Email" required onChange={handleEmailChange} />
        <input type="password" className="auth__input auth__input_type_password" name="pass-input" id="pass-input" value={pass} placeholder="Пароль" minLength="4" maxLength="30" required onChange={handlePassChange} />
        <button type="submit" className="auth__submit auth__submit_type_login">Войти</button>
      </form>
    </div>
  );
}

export default Login;
