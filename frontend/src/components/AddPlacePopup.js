import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleLinkChange(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
          name,
          link
        });

        setName('');
        setLink('');
      } 

    return (
        <PopupWithForm title="Новое место" name="add-card" cont="" formName="add" button="Сохранить" isOpen={props.isOpen} onClose={props.onClose} overlay={props.overlay} onSubmit={handleSubmit}>
          <input type="text" className="popup__input popup__input_type_place" name="place-input" id="place-input" value={name} placeholder="Название" minLength="2" maxLength="30" required onChange={handleNameChange} />
          <span className="popup__error place-input-error"></span>
          <input type="url" className="popup__input popup__input_type_link" name="link-input" id="link-input" value={link} placeholder="Ссылка на картинку" required onChange={handleLinkChange} />
          <span className="popup__error link-input-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;