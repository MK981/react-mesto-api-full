import React from 'react';

import PopupWithForm from './PopupWithForm';

function DeletePopup(props) {
    function handleSubmit(e) {
        e.preventDefault();

        props.onCardDelete(props.card);
    }

    return (
        <PopupWithForm title="Вы уверены?" name="delete" cont="popup__container_type_delete" formName="delete" button="Да" 
        isOpen={props.isOpen} onClose={props.onClose} overlay={props.overlay} onSubmit={handleSubmit} />
    );
}

export default DeletePopup;