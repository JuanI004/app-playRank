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

  if (
    !email ||
    !password ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
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

export const protect = catchAsync(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res
      .status(401)
      .json({ status: "fail", message: "No token provided" });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    throw new AppError("El usuario ya no existe", 401);
  }

  req.user = currentUser;
  next();
});

export default { signup, login, protect };
