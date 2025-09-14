import User from "../model/userModel.js";
//...................................................................................................
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) return res.status(404).json({ message: "user not found" });

    const isINdb = await User.findOne({ email: req.body.email });
    if (isINdb)
      return res.status(403).json({
        message: "please change the email address , this address is in usee",
      });

    await user.updateOne({
      password: user.password,
      email: req.body.email,
      username: req.body.username,
      role: user.role,
    });

    res.status(201).json({ message: "user updated successfully", user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};

//...................................................................................................

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) res.status(404).json({ message: "there is no users" });
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "server error" });
  }
};
//...................................................................................................
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User has been deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
