import React from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const user = React.useContext(CurrentUserContext);

    const isOwn = card.owner === user._id;
    const cardDeleteButtonClassName = (`elements__delete ${isOwn ? '' : 'elements__delete_hidden'}`);

    const isLiked = card.likes.some(i => i === user._id);
    const cardLikeButtonClassName = (`elements__like ${isLiked ? 'elements__like_active' : ''}`);

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <div className="elements__card">
            <img src={card.link} alt={card.name} className="elements__img" onClick={handleClick} />
            <div className="elements__overlay"></div>
            <div className="elements__place">
                <h2 className="elements__name">{card.name}</h2>
                    <div className="elements__likes">
                        <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                        <span className="elements__like-number">{card.likes.length}</span>
                    </div>
            </div>
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
        </div>
    );
}

export default Card;
