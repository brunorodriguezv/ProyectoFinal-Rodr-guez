import React from 'react'
import NavBar from "./componentes/NavBar/NavBar";
import Cart from './componentes/Cart/Cart';
import ItemListContainer from "./componentes/ItemListContainer/ItemListContainer";
import ItemDetailContainer from './componentes/ItemDetailContainer/ItemDetailContainer';
import { CartProvider } from './context/CarritoContext';
import Checkout from "./componentes/Checkout/Checkout"

/* Router components */

import { BrowserRouter, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <CartProvider>
          <NavBar />
          <Routes>
            <Route path='/' element={<ItemListContainer />} />
            <Route path='/category/:idCategory' element={<ItemListContainer />} />
            <Route path='/item/:idItem' element={<ItemDetailContainer />} />
            <Route path='/cart' element= {<Cart />} />
            <Route path='/checkout' element= {<Checkout />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>
    </>
  )
}

export default App