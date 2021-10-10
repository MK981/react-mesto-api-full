import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import Loader from './Loader';

import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import DeletePopup from './DeletePopup';
import api from '../utils/api';
import okImage from '../images/Union.svg';
import errImage from '../images/UnionErr.svg';
import * as mestoAuth from '../utils/mestoAuth';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const history = useHistory();

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [deleteCard, setDeleteCard] = React.useState({});
  const [isLoaderOpen, setIsLoaderOpen] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [token, setToken] = React.useState('');

  const [isInfoPopupOpen, setIsInfoPopupOpen] = React.useState(false);
  const [infoImage, setInfoImage] = React.useState('');
  const [infoText, setInfoText] = React.useState('');


  const [loggedIn, setLoggedIn] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  /*React.useEffect(() => {
    tokenCheck();

    setIsLoaderOpen(true);
    //console.log(token);

    Promise.all([api.getUserInfo(token), api.getInitialCards(token)])
        .then(([user, cards]) => {
          setCurrentUser(user);

          setCards(cards);
          //console.log(currentUser);
         // console.log(token);
         // console.log('привет');
        })
        .catch((err) => {
        console.log(err)
        })
        .finally(() => {setIsLoaderOpen(false);})
  }, []);*/

  React.useEffect(() => {
    function tokenCheck() {

        if(localStorage.getItem('token')) {
          const token = localStorage.getItem('token');


          if(token) {
            setIsLoaderOpen(true);
            Promise.all([mestoAuth.getContent(token), api.getUserInfo(token), api.getInitialCards(token)])
              .then(([userData, user, cards]) => {
                setUserEmail(userData.data.email);
                setLoggedIn(true);
                setToken(localStorage.getItem('token'));
                history.push('/');
                setCurrentUser(user.data);
                setCards(cards.data.reverse());
              })
              .catch((err) => {
                console.log(err);
              })
              .finally(() => {
                setIsLoaderOpen(false);
              })
            }
        }
    }
    tokenCheck();

}, [history, token])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    console.log(isLiked);

    api.changeLikeCardStatus(card._id, isLiked, token).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard.data : c));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleCardDelete(card) {
      setIsLoaderOpen(true);
      api.deleteCard(card._id, token).then(() => {
          const newCards = cards.filter((c) => c._id !== card._id);

          setCards(newCards);
          closeAllPopups();
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {setIsLoaderOpen(false);})
  }

  const [isDeletePopupOpen, setIsDeletePopupOpen] = React.useState(false);
  function handleDeleteClick(card) {
    setIsDeletePopupOpen(true);
    setDeleteCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsDeletePopupOpen(false);
    setIsInfoPopupOpen(false);
    setSelectedCard({});
    setDeleteCard({});
  }

  function handleOverlayClick (evt) {
    if (evt.target === evt.currentTarget) {
      closeAllPopups();
    }
  }

  function handleUpdateUser({name, about}) {
    setIsLoaderOpen(true);
    api.updateUserInfo(name, about, token)
    .then((user) => {
      setCurrentUser(user.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {setIsLoaderOpen(false);})
  }

  function handleUpdateAvatar({avatar}) {
    setIsLoaderOpen(true);
    api.updateAvatar(avatar, token)
    .then((user) => {
      setCurrentUser(user.data);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {setIsLoaderOpen(false);})
  }

  function handleAddPlaceSubmit({name, link}) {
    setIsLoaderOpen(true);
    api.addNewCard(name, link, token)
    .then((newCard) => {
      setCards([newCard.data, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {setIsLoaderOpen(false);})
  }

  function onRegister(password, email, name, info) {
    mestoAuth.register(password, email, name, info).then(() => {
      history.push('/sign-in');
      setInfoImage(okImage);
      setInfoText('Вы успешно зарегистрировались!');
    })
    .catch((err) => {
      setInfoImage(errImage);
      setInfoText('Что-то пошло не так! Попробуйте ещё раз.');
      console.log(err);})
    .finally(() => {setIsInfoPopupOpen(true);})
  }

  function onLogin(password, email) {
    mestoAuth.authorize(password, email)
    .then((data) => {
      localStorage.setItem('token', data.token);
      setLoggedIn(true);
      setUserEmail(email);
      setToken(localStorage.getItem('token'));
      history.push('/');
    })
    .catch(err => console.log(err));
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    setToken('');
    history.push('/sign-in');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>

      <div className="page">

        <Header loggedIn={loggedIn} email={userEmail} onSignOut={onSignOut} />

        <main className="main">
          <Switch>
            <ProtectedRoute
                exact path="/"
                loggedIn={loggedIn}
                component={Main}
                onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
                cards={cards} onCardClick={handleCardClick} onCardLike={handleCardLike} onCardDelete={handleDeleteClick}
              />

            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>

            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
          </Switch>
        </main>

        {loggedIn && <Footer />}

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} overlay={handleOverlayClick} onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} overlay={handleOverlayClick} onAddPlace={handleAddPlaceSubmit} />

        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} overlay={handleOverlayClick} onUpdateAvatar={handleUpdateAvatar}/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} overlay={handleOverlayClick} />

        <DeletePopup card={deleteCard} isOpen={isDeletePopupOpen} onClose={closeAllPopups} overlay={handleOverlayClick} onCardDelete={handleCardDelete} />

        <InfoTooltip name="info" cont="popup__container_type_info" isOpen={isInfoPopupOpen} onClose={closeAllPopups} overlay={handleOverlayClick} image={infoImage} text={infoText} />

        <Loader isOpen={isLoaderOpen} />

      </div>

    </CurrentUserContext.Provider>
  );
}

export default App;
