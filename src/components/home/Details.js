import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCountry } from '../../redux/countries/countries';
import formatNumber from '../utils/formatNumber';
import Icon from '../utils/Icon';
import image from '../../images/covid.svg';
// import styles from '../css/Details.module.css';

const Details = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { country, loading } = useSelector((state) => ({
    loading: state.loadingBar.default,
    country: state.countries.selected,
  }));

  useEffect(() => {
    dispatch(fetchCountry(name));
  }, []);

  if (loading || !country) {
    return null;
  }

  const { All } = country;
  const list = Object.entries(country).slice(1);

  return (
    <section>
      <header className="header">
        <Link to="/">
          <Icon name="arrow_back_ios" />
        </Link>
        <h5 className="header-title">town/city views</h5>
        <Icon name="mic" />
        <div className="pl-5">
          <Icon name="settings" />
        </div>
      </header>
      <div className="Details">
        <div className="Details-banner-left">
          <img src={image} alt="map view" className="App-map" />
        </div>
        <div className="Details-banner-right">
          <h1 className="App-title">{All.country}</h1>
          <p className="App-subtitle">
            {`${formatNumber(
              All.confirmed,
            )} cases`}
          </p>
        </div>
      </div>
      <section className="Home-stats">
        <h4 className="App-section-title">Twon/City cases</h4>
        <ul>
          {list.map(([name, { confirmed }]) => (
            <li key={name} className="Details-item">
              <h6 className="Details-item-title">{name}</h6>
              <div className="Details-item-right">
                <p className="App-subtitle">
                  {formatNumber(confirmed)}
                  {' '}
                  cases
                </p>
                <Icon name="arrow_circle_right" />
              </div>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default Details;
