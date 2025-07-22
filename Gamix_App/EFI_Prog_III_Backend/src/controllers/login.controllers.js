import bcrypt from 'bcrypt';
import db from "../../models/index.js";
import { generateToken } from '../helpers/generateToken.js'
import { where } from "sequelize";

export const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await db.User.findOne({ where: { userName: username } });

  if (user) {
    const userPassword = user.passWord;

    const isValidPassword = await bcrypt.compare(password, userPassword);

    if (!isValidPassword) {
      return res.status(404).json('La contraseña ingresada es incorrecta.');

    } else {
      const token = generateToken({ id: user.id, username: user.userName, role: user.role, email: user.email });

      return res.json({
        success: true,
        message: 'Autenticación exitosa',
        token: token

      });

    };

  } else {
    return res.status(404).json('El nombre de usuario no existe.');

  };

};