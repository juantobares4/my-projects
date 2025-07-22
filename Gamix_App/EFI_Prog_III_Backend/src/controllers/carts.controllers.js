import db from "../../models/index.js";

// Obtener el carrito de un usuario
export const getCart = async (req, res) => {
    const { userId } = req.params;
    
    try {
      const cart = await db.Cart.findOne({
        where: { user_id: userId },
        include: [{
          model: db.CartItem,
          include: [{
            model: db.Game,
            attributes: ['title', 'price']
          }]
        }]
      });
  
      if (!cart) {
        return res.status(404).json({ message: 'Carrito no encontrado' });
      }
  
      return res.status(200).json(cart);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  // Agregar item al carrito
  export const addToCart = async (req, res) => {
    const { userId, gameId, quantity} = req.body;
  
    try {
      // Buscar o crear el carrito del usuario
      const [cart] = await db.Cart.findOrCreate({
        where: { user_id: userId },
      });
  
      // Buscar si el juego ya está en el carrito
      const existingItem = await db.CartItem.findOne({
        where: {
          cart_id: cart.id,
          game_id: gameId
        }
      });
  
      if (existingItem) {
        // Actualizar cantidad si ya existe
        existingItem.quantity += quantity;
        await existingItem.save();
      } else {
        // Crear nuevo item si no existe
        await db.CartItem.create({
          cart_id: cart.id,
          game_id: gameId,
          quantity
        });
      }
  
      return res.status(200).json({ message: 'Item agregado al carrito exitosamente' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  //Sumar cantidad en el carrito
  export const addQuantityCart = async(req, res) => {
    const { cartId, gameId } = req.body;

    try {
      const existingItem = await db.CartItem.findOne({
        where: {
          cart_id: cartId,
          game_id: gameId
        }
      });
      
      existingItem.quantity += 1;
      await existingItem.save()
      return res.status(200).json({ message: 'Se sumo una unidad al producto del carrito' });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

//Restar cantidad en el carrito
    export const substractQuantityCart = async(req, res) => {
      const { cartId, gameId } = req.body;
      
      try {
        const existingItem = await db.CartItem.findOne({
          where: {
            cart_id: cartId,
            game_id: gameId
          }
        });
        
        existingItem.quantity -= 1;
        await existingItem.save();
        return res.status(200).json({ message: 'Se resto una unidad al producto del carrito' });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    }
  
  // Comprar desde el carrito
  export const checkoutCart = async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Obtener el carrito con sus items
      const cart = await db.Cart.findOne({
        where: { user_id: userId },
        include: [{
          model: db.CartItem,
          include: [{
            model: db.Game,
            attributes: ['price']
          }]
        }]
      });
  
      if (!cart || !cart.CartItems.length) {
        return res.status(400).json({ message: 'Carrito vacío' });
      }
  
      // Calcular el total
      let total = cart.CartItems.reduce((sum, item) => {
        return sum + (item.Game.price * item.quantity)
      }, 0);
  
      // Crear la compra
      const purchase = await db.Purchase.create({
        user_id: userId,
        date: new Date(),
        total
      });
  
      // Crear los detalles de la compra
      await Promise.all(cart.CartItems.map(item => {
        return db.PurchaseDetail.create({
          purchase_id: purchase.id,
          game_id: item.game_id,
          quantity: item.quantity
        });
      }));
  
      // Limpiar el carrito
      await db.CartItem.destroy({
        where: { cart_id: cart.id }
      });
  
      return res.status(200).json({
        message: 'Compra realizada exitosamente',
        purchase
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };


// Eliminar un item del carrito
export const removeFromCart = async (req, res) => {
  const { cartItemId } = req.params;

  try {
      const deleted = await db.CartItem.destroy({
          where: { id: cartItemId }
      });

      if (!deleted) {
          return res.status(404).json({ message: 'Item no encontrado en el carrito' });
      }

      return res.status(200).json({ message: 'Item eliminado del carrito exitosamente' });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};

// Vaciar todo el carrito
export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
      const cart = await db.Cart.findOne({
          where: { user_id: userId }
      });

      if (!cart) {
          return res.status(404).json({ message: 'Carrito no encontrado' });
      }

      await db.CartItem.destroy({
          where: { cart_id: cart.id }
      });

      return res.status(200).json({ message: 'Carrito vaciado exitosamente' });
  } catch (error) {
      return res.status(500).json({ message: error.message });
  }
};