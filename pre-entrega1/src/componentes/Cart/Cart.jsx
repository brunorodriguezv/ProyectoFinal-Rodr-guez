import CartItem from '../CartItem/CartItem';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CarritoContext';
import { useContext } from 'react';
import './Cart.css'


const Cart = () => {
    const {cart, clearCart, total, totalQuantity} = useContext(CartContext);

    if (totalQuantity === 0 ) { 
        return (
            <>
            <h2>No hay productos en el carrito</h2>
            <Link to="/"> Ver Productos </Link>
            </>
        )
    }

  return (
    <div className='cartInfo'>
        {
            cart.map(prod => <CartItem key={prod.id} {...prod}/>)
        }
    
        <h3> Total: U$S {total}</h3>

        <button className='clearCartBtn' onClick={ () => clearCart()}> Vaciar Carrito </button>

        <Link className='buyBtn' to="/checkout"> Finalizar Compra </Link>

    </div>
  )
}

export default Cart