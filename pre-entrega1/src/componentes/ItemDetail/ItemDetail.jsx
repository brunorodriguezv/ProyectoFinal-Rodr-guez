import React from 'react';
import './ItemDetail.css';
import { Link } from 'react-router-dom';
import ItemCount from '../ItemCount/ItemCount';
import { useState, useContext } from 'react';
import { CartContext } from '../../context/CarritoContext';


const ItemDetail = ({id, name, price, img, stock }) => {

  const [addQuantity, setAddQuantity] = useState(0);
  
  
  ///////////////////////////////////

  const {addToCart} = useContext(CartContext)

  ///////////////////////////////////

  const quantityManager = (quantity) => {
    setAddQuantity(quantity);

    const item = {id,name, price};
    addToCart(item, quantity);
  }

  return (
    <div className="itemContainer" >
      <img src={img} alt={name} />
      <div className="cardInfo">
        <h2>{name}</h2>
        <b>USD {price}</b>
        <p>Stock:{stock}</p>
      </div>

      {
        addQuantity > 0 ? (<Link to="/cart"> Finalizar compra </Link>) : (<ItemCount initial={1} stock={stock} addFunction={quantityManager} />)
      }

    </div>
  )
}





export default ItemDetail