import User from "../.././model/user.js"

export async function getAllUsers(req, res){
    try {
        const users = await User.find().sort({createdAt: -1});
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in user controller", error);
        res.status(500).json({message: "Internal server error"});
        
    }
}
