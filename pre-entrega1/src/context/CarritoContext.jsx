import { useState, createContext } from "react";

export const CartContext = createContext({
    cart: [],
    total: 0,
    totalQuantity: 0
})

export const CartProvider = ({children}) => {

    const [cart, setCart ] = useState([]);
    const [total, setTotal] = useState(0);
    const [totalQuantity, setTotalQuantity ] = useState(0);

    const addToCart = (item, quantity) => {
        const existingProduct = cart.find(prod => prod.item.id === item.id);

        if(!existingProduct) {
            setCart(prev => [...prev, {item, quantity}]);
            setTotalQuantity(prev => prev + quantity);
            setTotal(prev => prev +(item.price * quantity));
        } else {
            const actualizedCart = cart.map(prod => {
                if(prod.item.id === item.id) {
                    return {...prod, quantity: prod.quantity + quantity}
                } else {
                    return prod; 
                }
            })

            setCart(actualizedCart);
            setTotalQuantity(prev => prev + quantity);
            setTotal(prev => prev +(item.price * quantity));
        }
    }

    const deleteProduct = (id) => {

        const deletedProduct = cart.find(prod => prod.item.id === id);

        const actualizedCart = cart.filter(prod => prod.item.id !== id );

        setCart(actualizedCart);
        setTotalQuantity(prev => prev - deletedProduct.quantity);
        setTotal(prev => prev - (deletedProduct.item.price * deletedProduct.quantity));
    }


    const clearCart = () => {
        setCart([]);
        setTotal(0);
        setTotalQuantity(0);
    }

    console.log(cart);
    console.log( "Total "+ total);
    console.log("Cantidad de productos " + totalQuantity);

    return (
        <CartContext.Provider value={{cart, total, totalQuantity, addToCart, deleteProduct, clearCart}}>  
            {children}
         </CartContext.Provider>
    )
}
