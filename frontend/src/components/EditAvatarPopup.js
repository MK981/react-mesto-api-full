import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value
        });
      };

    return (
        <PopupWithForm title="Обновить аватар" name="avatar" cont="popup__container_type_avatar" formName="avatar" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} overlay={props.overlay} onSubmit={handleSubmit}>
          <input type="url" className="popup__input popup__input_type_avatar" name="ava-input" id="ava-input" placeholder="Ссылка на аватар" ref={avatarRef} required />
          <span className="popup__error ava-input-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
