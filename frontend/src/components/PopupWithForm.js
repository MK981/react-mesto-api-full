import React from 'react';

function PopupWithForm(props) {

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
        <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.overlay}>
            <div className={`popup__container ${props.cont}`}>
                <h2 className="popup__name">{props.title}</h2>
                <form className={`popup__form popup__form_type_${props.formName}`} name={props.name} onSubmit={props.onSubmit}>
                    {props.children}
                    <button type="submit" className={`popup__submit popup__submit_type_${props.formName}`}>{props.button}</button>
                </form>
                <button type="button" className={`popup__close popup__close_type_${props.formName}`} onClick={props.onClose} aria-label="Закрыть"></button>
            </div>
      </div>
    );
}

export default PopupWithForm;