import { Router } from "express";
import { getCart, addToCart, checkoutCart, removeFromCart, clearCart, addQuantityCart, substractQuantityCart } from "../controllers/carts.controllers.js";

const routerCart = Router();

// Agregar item al carrito
routerCart.post('/add', addToCart); 

// Sumar cantidad al carrito desde el carrito
routerCart.post('/addQuantity', addQuantityCart); 

// Restar cantidad al carrito desde el carrito
routerCart.post('/substractQuantity', substractQuantityCart); 

// Finalizar compra desde el carrito
routerCart.post('/checkout', checkoutCart);

// Eliminar elemento del carrito
routerCart.delete('/item/:cartItemId', removeFromCart);

// Eliminar carrito completo
routerCart.delete('/clear/:userId', clearCart);

// Obtener el carrito de un usuario específico
routerCart.get('/:userId', getCart); 
export default routerCart;