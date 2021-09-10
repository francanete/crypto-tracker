import React from 'react'

function currencyFormat(num) {
  return '£' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}



const Coin = ({ name, image, symbol, price, volume, priceChange, marketcap }) => {
  return (
    <div className="coin-container">
      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto"/>
          <h2>{name}</h2>
          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">{currencyFormat(price)}</p>
          <p className="coin-volume">£{volume.toLocaleString()}</p>
          { priceChange < 0 ? 
            ( <p className="coin-percent red">{priceChange.toFixed(2)}%</p>) :
            (<p className="coin-percent green">{priceChange.toFixed(2)}%</p>) 
          }
          <p className="coin-marketcap">
            Mkt Cap: ${marketcap.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Coin
