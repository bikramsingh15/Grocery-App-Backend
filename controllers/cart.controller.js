import User from "../models/user.model.js";

// Update user cartData :  api/cart/update

export const updateCart = async (req, res) => {
  try {
    const userId = req.user;
    const { cartItems } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { cartItems },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "User Not Found!",
        success: false,
      });
    }
    res.status(200).json({
      message: "Cart Updated successfully",
      success: true,
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
