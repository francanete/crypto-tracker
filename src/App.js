import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  let [buttonActive, setButtonActive] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => alert("There is an error fetching your data:"));
  }, []);

  const updateValues = (e) => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=50&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
        console.log(res.data);
        setButtonActive(false);
        console.log(buttonActive);
      })
      .catch((error) => alert("There is an error fetching your data:"));
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  function currencyFormat(num) {
    return "£" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  // if (!buttonActive) {
  //   setInterval(() => {
  //     setButtonActive(true);
  //   }, 60000);
  // }

  setTimeout(() => {
    if (!buttonActive) {
      setButtonActive(true);
    }
  }, 60000);

  console.log(buttonActive);

  return (
    <div className="coin-app">
      <div className="coin-search">
        <h1 className="coin-text">Crypto-Tracker</h1>
        <form>
          <input
            type="text"
            placeholder="Search"
            className="coin-input"
            onChange={handleChange}
          />
        </form>
        {/* <button className="update-button " onClick={updateValues}>
          Update Values
        </button> */}

        {!buttonActive ? (
          <button
            type="button"
            className="btn btn-lg btn-primary"
            onClick={updateValues}
            disabled
          >
            Primary button
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-lg btn-primary"
            onClick={updateValues}
          >
            Primary button
          </button>
        )}

        {/* <button
          type="button"
          className="btn btn-lg btn-primary "
          onClick={updateValues}
        >
          Primary button
        </button> */}
      </div>
      <div className="coin-app">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Coin</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Volume</th>
              <th>Variation</th>
              <th>Market Cap.</th>
            </tr>
          </thead>
          <tbody>
            {filteredCoins.map((coin) => (
              <tr key={coin.id}>
                <td>
                  <img
                    width="40"
                    src={coin.image}
                    alt="crypto"
                    className="img-fluid"
                  />
                </td>
                <td>{coin.name}</td>
                <td>{coin.symbol}</td>
                <td>{currencyFormat(coin.current_price)}</td>
                <td>£{coin.total_volume.toLocaleString()}</td>
                {coin.price_change_percentage_24h < 0 ? (
                  <td className="coin-percent red">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                ) : (
                  <td className="coin-percent green">
                    {coin.price_change_percentage_24h.toFixed(2)}%
                  </td>
                )}
                <td>£{coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filteredCoins.length === 0 ? (
        <div className="alert alert-danger" role="alert">
          Sorry, there are not results for that search!
        </div>
      ) : null}
      <p className="footer-note">Developed by Fran Canete.</p>
    </div>
  );
}

export default App;
