import db from "../../models/index.js";
import { Op } from "sequelize";

export const getUserRegister = async (req, res) => {
  try {
    const userRegisters = await db.User.findAll();
    res.json(userRegisters);
  } catch (error) {
    console.error("Error:", error)

  };

};

export const postUsersRegister = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    const alreadyExist = await db.User.findOne({
      where: {
        [Op.or]: [
          { userName: username },
          { email: email }

        ]

      }

    });

    if (alreadyExist) {
      if (alreadyExist.userName === username) {
        return res.status(409).json('El nombre de usuario ya existe.');

      } else {
        return res.status(409).json('Ya existe un usuario con ese email.');

      }

    } else {
      const newUser = await db.User.create(
        {
          userName: username,
          passWord: password,
          email: email,
          role: 'gamer'
        },

      );

      res.status(201).json({ message: 'Usuario creado exitosamente' });

    };

  } catch (error) {
    return res.status(500).json({ error: 'Error al insertar base de datos' });

  };

};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await db.User.findByPk(id);

    if (findUser) {
      try {
        return res.status(200).json(findUser);

      } catch (error) {
        return res.status(500).json({ message: error });

      }

    } else {
      return res.status(404).json({ message: `El usuario con ID ${id} no existe.` });

    };

  } catch (error) {
    return res.status(500).json({ message: error });

  };

};

export const getAuthUser = async (req, res) => {
  try {
    const currentUser = req.user;

    return res.status(200).json({ 'Usuario actual': currentUser });

  } catch (error) {
    return res.status(500).json('Error al obtener los datos del usuario.');

  };

};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;

  try {
    const user = await db.User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: `El usuario con ID ${id} no existe.` });
    }

    const alreadyExist = await db.User.findOne({
      where: {
        [Op.or]: [
          { userName: username },
          { email: email }
        ],
        id: { [Op.ne]: id }
      }
    });

    if (alreadyExist) {
      if (alreadyExist.userName === username) {
        return res.status(409).json('El nombre de usuario ya existe.');
      } else {
        return res.status(409).json('Ya existe un usuario con ese email.');
      }
    }
    user.userName = username;
    user.email = email;
    await user.save();
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
};
