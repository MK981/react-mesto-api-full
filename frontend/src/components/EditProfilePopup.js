import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup(props) {

    const user = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(user.name);
        setDescription(user.about);
      }, [user, props.isOpen]); 

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
      
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onUpdateUser({
          name,
          about: description,
        });
      } 

    return (
        <PopupWithForm title="Редактировать профиль" name="edit-form" cont="" formName="edit" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} overlay={props.overlay} onSubmit={handleSubmit}>
          <input type="text" className="popup__input popup__input_type_name" name="name-input" id="name-input" placeholder="Имя" minLength="2" maxLength="40" value={name || ''} onChange={handleNameChange} required />
          <span className="popup__error name-input-error"></span>
          <input type="text" className="popup__input popup__input_type_job" name="job-input" id="job-input" placeholder="Вид деятельности" minLength="2" maxLength="200" value={description || ''} onChange={handleDescChange} required />
          <span className="popup__error job-input-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;