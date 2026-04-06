import catchAsync from "../utils/catchAsync.js";
import User from "../models/userModel.js";

export const signup = catchAsync(async (req, res) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export default { signup };
