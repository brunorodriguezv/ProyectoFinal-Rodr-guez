import './CartWidget.css'
import { useContext } from 'react'
import { CartContext } from '../../context/CarritoContext';
import { Link } from 'react-router-dom';

const CartWidget = () => {
  const {totalQuantity} = useContext(CartContext);

  return (
    
    <div className='cartBtn'>
        <Link to="/cart">
          <img src="../img/carrito.png" alt="carrito.png" />
          {
            totalQuantity > 0 && <b> { totalQuantity} </b>
          }
        </Link>
        
    </div>
  )
}

export default CartWidget