import React from 'react';

function InfoTooltip(props) {

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
            <img src={props.image} alt="Статус" className="popup__status" />
            <p className="popup__message">{props.text}</p>
            <button type="button" className={`popup__close popup__close_type_${props.name}`} onClick={props.onClose} aria-label="Закрыть"></button>
        </div>
      </div>
    );
}

export default InfoTooltip;
