import db from "../../models/index.js";

export const getAllReviews = async (req, res) => {
  try {
    const obtainReviews = await db.Review.findAll();

    if (obtainReviews.length === 0) {
      return res.status(204).json('El listado de comentarios está vacío.');

    } else {
      return res.status(200).json(obtainReviews);

    };

  } catch (error) {
    return res.status(500).json({ message: error });

  };

};

export const getReviewsByGame = async (req, res) => {
  const { gameId } = req.params;
  
  try {
    const reviews = await db.Review.findAll({
      where: { game_id: gameId },
      include: [{
        model: db.User,
        attributes: ['userName', 'email'] 
      }],
      attributes: ['id', 'rating', 'comment', 'user_id'],
    });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({ 
        message: 'No se encontraron reviews para este juego' 
      });
    }

    return res.status(200).json({
      reviews
    });
    
  } catch (error) {
    return res.status(500).json({ 
      message: 'Error al obtener las reviews',
      error: error.message 
    });
  }
};

export const postReview = async (req, res) => {
  const { game_id, user_id, rating, comment } = req.body;

  try {
    const newReview = await db.Review.create(
      {
        game_id: game_id,
        user_id: user_id,
        rating: rating,
        comment: comment
      },

    )

    return res.status(201).json(newReview);

  } catch (error) {
    return res.status(500).json({ message: error });

  };

};

export const updateReview = async (req, res) => {
  const { game_id, user_id, rating, comment } = req.body;

  try {
    const { id } = req.params;
    const findReview = await db.Review.findByPk(id); // findByPk devuelve una promesa.

    if (findReview) {
      try {
        findReview.set({
          game_id: game_id,
          user_id: user_id,
          rating: rating,
          comment: comment
        });

        await findReview.save();

        return res.status(200).json({ message: `El juego con ID ${id} se actualizó correctamente.` });

      } catch (err) {
        return res.status(500).json({ message: err });

      };

    } else {
      return res.status(404).json(`El juego con ID ${id} no existe.`);

    };


  } catch (error) {
    return res.status(500).json({ message: error });

  };

};

export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const findReview = await db.Review.findByPk(id); // findByPk devuelve una promesa.

    if (findReview) {
      try {
        await findReview.destroy();

        return res.status(200).json({ message: `El comentario con ID ${id} fue borrado exitosamente.` });

      } catch (error) {
        return res.status(500).json({ message: error });

      };

    } else {
      return res.status(404).json(`El comentario con ID ${id} no existe.`);

    };

  } catch (error) {
    return res.status(500).json({ message: error });

  };

};