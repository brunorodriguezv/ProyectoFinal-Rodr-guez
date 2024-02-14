import { useState, useContext } from "react";
import { CartContext } from "../../context/CarritoContext";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import Swal from 'sweetalert2';
import './Checkout.css';

const Checkout = () => {
    const { cart, clearCart, total } = useContext(CartContext);

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [emailConfirmation, setEmailConfirmation] = useState("");
    const [orderId, setOrderId] = useState("");
    const [error, setError] = useState("");

    const submitManager = (event) => {
        event.preventDefault();

        if (!name || !lastName || !phone || !email || !emailConfirmation) {
            setError("Completa todos los campos correctamente");
            return;
        }

        if (email !== emailConfirmation) {
            setError("Los emails no coinciden");
            return;
        }

        const order = {
            items: cart.map(product => ({
                id: product.item.id,
                name: product.item.name,
                quantity: product.quantity
            })),
            total: total,
            fecha: new Date(),
            name,
            lastName,
            phone,
            email
        }

        Promise.all(
            order.items.map(async (productOrder) => {
                const productRef = doc(db, "products", productOrder.id);
                const productDoc = await getDoc(productRef);
                const actualStock = productDoc.data().stock;

                await updateDoc(productRef, { stock: actualStock - productOrder.quantity });
            })
        )
        .then(() => {
            addDoc(collection(db, "ordenes"), order)
                .then(docRef => {
                    setOrderId(docRef.id);
                    clearCart();
                    setName("");
                    setLastName("");
                    setPhone("");
                    setEmail("");
                    setEmailConfirmation("");
                    Swal.fire({
                     title: "¡Compra finalizada!",
                     text: `Número de orden: ${docRef.id}`,
                     icon: "success",
                    });
                })
                .catch(error => console.log("Error al crear la orden de compra", error))
        })
        .catch(error => {
            console.log("No se actualizó el stock", error);
            setError("Error al actualizar el stock")
        })
    }

    return (
        <div className="mainCont">
            
            <form onSubmit={submitManager}>
                {
                    cart.map(product => (
                        <div className="prodDetail" key={product.item.id}>
                            <p> <b>{product.item.name} </b> x {product.quantity} </p>
                            <p> U$S {product.item.price} </p>
                            
                        </div>
                    ))
                }

                <div className="form-group">
                    <label htmlFor="nombre"> Nombre </label>
                    <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="apellido"> Apellido </label>
                    <input type="text" value={lastName} id="lastName" onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono"> Telefono </label>
                    <input type="text" value={phone} id="phone" onChange={(e) => setPhone(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="email"> E-mail </label>
                    <input type="email" value={email} id="email" onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="emailcon"> Email Confirmación </label>
                    <input type="email" value={emailConfirmation} id="emailcon" onChange={(e) => setEmailConfirmation(e.target.value)} />
                </div>

                {
                    error && <p style={{ color: "red" }}> {error} </p>
                }

                <div className="btns">
                    <button className="miBtn checkout" disabled={cart.length === 0}> Comprar </button>
                    <button className="miBtn checkout" type="reset"> Borrar </button>
                </div>
                {
                    orderId && <strong>¡Gracias por su compra! Tu número de orden es el siguiente: {orderId} </strong>
                }
            </form>
        </div>
    );
}

export default Checkout;