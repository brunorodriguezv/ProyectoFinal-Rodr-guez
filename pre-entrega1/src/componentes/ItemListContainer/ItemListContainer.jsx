import ItemList from "../ItemList/ItemList";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../services/config";
import { collection, getDocs, where, query } from "firebase/firestore";
import  './ItemListContainer.css';


const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  const {idCategory} = useParams();

  useEffect( () => {
  
    const myProducts = idCategory ? query(collection(db, "products"), where ("idCat", "==", idCategory)) : collection(db, "products");
  
    getDocs(myProducts)
      .then(res => {
        const newProducts = res.docs.map(doc => {
          const data = doc.data();
            return {id: doc.id, ...data};
        })
          setProducts(newProducts)
      })
        .catch(error => console.log(error))
  }, [idCategory])


  return (
    <div className="itemListContainer"> 
      <ItemList products={products}/>
    </div>
  
  
  )
}

export default ItemListContainer


