import db from "../../models/index.js";

export const getAllPurchaseDetail = async (req, res) => {
  try {
    const obtainPurchaseDetail = await db.PurchaseDetail.findAll();

    if (obtainPurchaseDetail.length === 0) {
      return res.status(204).json('El listado de detalles de ventas está vacío.');

    } else {
      return res.status(200).json(obtainPurchaseDetail);

    };

  } catch (error) {
    return res.status(500).json({ message: error });

  };

};

export const postPurchaseDetail = async (req, res) => {
  const { purchase_id, game_id, quantity } = req.body;

  try {
    const newPurchaseDetail = await db.PurchaseDetail.create(
      {
        purchase_id: purchase_id,
        game_id: game_id,
        quantity: quantity,
      },

    )

    return res.status(201).json({ message: 'Detalle creado exitosamente.' });

  } catch (error) {
    return res.status(500).json({ message: error });

  };

};
