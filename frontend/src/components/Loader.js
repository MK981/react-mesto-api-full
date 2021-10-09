import loader from '../images/loadloop.gif';

function Loader(props) {

    return (
        <div className={`loader ${props.isOpen ? 'loader_opened' : ''}`}>
            <img src={loader} alt="Загрузка" className="loader__image" />
        </div>
    );
}

export default Loader;
