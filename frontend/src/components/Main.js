import React from 'react';

import Card from './Card';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const user = React.useContext(CurrentUserContext);

    return (
          <>
            <section className="profile">
            <div className="profile__prof">
                <div className="profile__user">
                <img src={user.avatar} alt="Аватар" className="profile__avatar" />
                <div className="profile__edit-layer">
                    <button type="button" className="profile__edit-avatar" aria-label="Редактировать аватар" onClick={props.onEditAvatar}></button>
                </div>
                </div>
                <div className="profile__info">
                <div className="profile__info-line">
                    <h1 className="profile__name">{user.name}</h1>
                    <button type="button" className="profile__edit-button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                </div>
                <p className="profile__description">{user.about}</p>
                </div>
            </div>
            <button type="button" className="profile__add-button" aria-label="Добавить место" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
            {props.cards.map((card, i) => {
                return (
                    <Card key={card._id} card={card} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                );
                })}
            </section>
          </>
    );
}

export default Main;
