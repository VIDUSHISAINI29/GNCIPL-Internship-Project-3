import User from "../.././model/user.js"


export async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error("Error in deleteUser controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}