import db from "../../models/index.js";
import { Op } from 'sequelize';

export const getAllGames = async (req, res) => {
  try {
    const obtainGames = await db.Game.findAll();

    if (obtainGames.length === 0) {
      return res.status(204).json('El listado de juegos está vacío.');

    } else {
      return res.status(200).json(obtainGames);

    };

  } catch (error) {
    return res.status(500).json({ message: error });

  };

};

export const getGame = async (req, res) => {
  try {
    const { id } = req.params;
    const obtainGame = await db.Game.findByPk(id);

    if (obtainGame.length === 0) {
      return res.status(204).json('No existen juegos con ese id.');

    } else {
      return res.status(200).json(obtainGame);

    };

  } catch (error) {
    return res.status(500).json({ message: error });

  };
};

export const postGame = async (req, res) => {
  const { title, genre, platform, price, available } = req.body;

  try {
    const newGame = await db.Game.create(
      {
        title: title,
        genre: genre,
        platform: platform,
        price: price,
        available: available
      },

    )

    return res.status(201).json({ message: 'Juego creado exitosamente.' });

  } catch (error) {
    return res.status(500).json({ message: error });

  };

};

export const updateGame = async (req, res) => {
  const { title, genre, platform, price, available } = req.body;

  try {
    const { id } = req.params;
    const findGame = await db.Game.findByPk(id); // findByPk devuelve una promesa.

    if (findGame) {
      try {
        findGame.set({
          title: title,
          genre: genre,
          platform: platform,
          price: price,
          available: available

        });

        await findGame.save();

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

export const deleteGame = async (req, res) => {
  try {
    const { id } = req.params;
    const findGame = await db.Game.findByPk(id); // findByPk devuelve una promesa.

    if (findGame) {
      try {
        await findGame.destroy();

        return res.status(200).json({ message: `El juego con ID ${id} fue borrado exitosamente.` });

      } catch (error) {
        return res.status(500).json({ message: error });

      };

    } else {
      return res.status(404).json(`El juego con ID ${id} no existe.`);

    };

  } catch (error) {
    return res.status(500).json({ message: error });

  };

};

export const searchGamesByName = async (req, res) => {
  const { query } = req.query;
  console.log('🚀 ~ searchGamesByName ~ query:', query);

  if (!query) {
    return res.status(400).json({ message: "El parámetro de búsqueda no puede estar vacío." });
  }

  try {
    console.log("Consulta recibida:", query);

    const matchingGames = await db.Game.findAll({
      where: {
        title: {
          [Op.like]: `%${query}%`
        }
      },
      attributes: ['id', 'title', 'genre', 'platform', 'price', 'available']
    });

    if (matchingGames.length === 0) {
      return res.status(404).json({ message: "No se encontraron juegos con ese nombre." });
    }

    return res.status(200).json(matchingGames);

  } catch (error) {
    console.error("Error en la búsqueda de juegos:", error);
    return res.status(500).json({ message: "Error en el servidor al realizar la búsqueda." });
  }
};