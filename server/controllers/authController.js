import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError(
      "Por favor ingresa tu correo electrónico y contraseña",
      400,
    );
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Correo electrónico o contraseña incorrectos", 401);
  }

  createSendToken(user, 200, res);
});

export default { signup, login };
