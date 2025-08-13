import User from "../.././model/user.js"


export async function getUserById(req, res){
    console.log('id = ',req.params)
    try {
        const user = await User.findById(req.params.id);
        if(!user){
          return  res.status(404).json({message: "User not found."})
        }
        res.json(user)
    } catch (error) {
        console.log("Error in controller of get user by id.", error);
        res.status(500).json({message: "Internal Server Error"})
    }
}
