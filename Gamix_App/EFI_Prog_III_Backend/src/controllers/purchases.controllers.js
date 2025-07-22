import { where } from "sequelize";
import db from "../../models/index.js";

export const getAllPurchases = async (req, res) => {
  try {
    const obtainPurchase = await db.Purchase.findAll();

    if (obtainPurchase.length === 0) {
      return res.status(204).json('El listado de ventas está vacío.');

    } else {
      return res.status(200).json(obtainPurchase);

    };

  } catch (error) {
    return res.status(500).json({ message: error });

  };

};

export const getPurchesesByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const obtainPurchase = await db.Purchase.findAll(
      {
        where: {user_id: userId },
        include: [{
          model: db.PurchaseDetail,
          attributes: ['game_id','quantity'],
          include: [{            
            model: db.Game,
            attributes: ['title', 'price']
          }]
        }]
      }
    )
    if (obtainPurchase.length === 0) {
      return res.status(404).json({ message: 'El listado de compras del usuario está vacío.' });
    } else {
      return res.status(200).json(obtainPurchase);
    }
  } catch(error) {
    return res.status(500).json({ message: error.message });
  }
}

export const postPurchase = async (req, res) => {
  const { user_id, date, details } = req.body;
  
  try {
    // Primero calculamos el total
    let total = 0;
    for (const detail of details) {
      const game = await db.Game.findByPk(detail.game_id);
      if (game) {
        total += game.price * detail.quantity;
      }
    }

    // Luego creamos la Purchase con el total calculado
    const newPurchase = await db.Purchase.create({
      user_id: user_id,
      date: date,
      total: total  // Usamos el total que calculamos
    });

    // Finalmente creamos los detalles
    if (details && details.length > 0) {
      await Promise.all(details.map(async (detail) => {
        return await db.PurchaseDetail.create({
          purchase_id: newPurchase.id,
          game_id: detail.game_id,
          quantity: detail.quantity
        });
      }));
    }

    return res.status(201).json({ 
      message: 'Venta y detalles creada exitosamente.',
      purchase: newPurchase 
    });

  } catch (error) {
    console.log('🚀 ~ postPurchase ~ error:', error);
    return res.status(500).json({ message: error.message });
  }
};