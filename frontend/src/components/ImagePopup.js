import React from 'react';

function ImagePopup(props) {

    React.useEffect(() => {
        props.isOpen && document.addEventListener('keydown', handleEscClose);

        return () => {
            document.removeEventListener('keydown', handleEscClose);
        };
    }, [props.isOpen]);

    function handleEscClose(evt) {
        if (evt.key === 'Escape') {
          props.onClose();
        }
      }

    return (
        <div className={`popup popup_type_image ${props.card.name ? 'popup_opened' : ''}`} onClick={props.overlay}>
            <div className="popup__image-container">
                <img src={props.card.link} alt="Место" className="popup__img" />
                <p className="popup__text">{props.card.name}</p>
                <button type="button" className="popup__close popup__close_type_image" onClick={props.onClose} aria-label="Закрыть"></button>
            </div>
        </div>
    );
}

export default ImagePopup;
