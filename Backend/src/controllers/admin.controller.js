import authModel from "../models/auth.model.js";

async function getAllUsers(req, res, next) {
  try {
    const users = await authModel
      .find({ role: "user" })   // only normal users
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}


async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    const user = await authModel.findOneAndDelete({
      _id: id,
      role: "user",
    });

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}

async function banUser(req, res, next) {
  try {
    const { id } = req.params;

    const user = await authModel.findOneAndUpdate(
      { _id: id, role: "user" },
      { $set: { banned: true } },
      { returnDocument: "after" } // update and return the document
    ).select("-password");

    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      throw err;
    }

    res.status(200).json({
      success: true,
      message: "User banned successfully",
      user,
    });
  } catch (err) {
    err.status = err.status || 500;
    next(err);
  }
}


export { getAllUsers, deleteUser, banUser };