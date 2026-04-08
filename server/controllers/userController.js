import catchAsync from "../utils/catchAsync.js";

export const getMe = catchAsync(async (req, res) => {
  res.status(200).json({
    status: "success",
    data: req.user,
  });
});

export default { getMe };
