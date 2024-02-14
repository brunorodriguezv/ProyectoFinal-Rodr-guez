import { useState } from "react";
import './ItemCount.css';

const ItemCount = ({initial, stock, addFunction }) => {

    const [counter, setCounter] = useState(1);


    const increase = () => {
      if(counter < stock) {
        setCounter(counter + 1);
      }
    }

    const decrease = () => {
      if(counter > initial) {
        setCounter(counter - 1);
      }
    }


  return (
    <>
    <div className="itemCount">
        <button onClick={decrease}> - </button>
        <p> {counter} </p>
        <button onClick={increase}> + </button>
    </div>
      <button className="addToCartBtn" onClick={() => addFunction(counter)}> Agregar al Carrito </button>
    </>
  )
}

export default ItemCount