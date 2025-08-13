import User from "../.././model/user.js"

export async function createUser(req, res){
    try {
        const {name, email, password, role} = req.body;
        const newUser = new User({name, email, password, role});
        await newUser.save();
        res.status(201).json({message:"User created successfully!"});
    } catch (error) {
        console.log("Error in creating user in user controller.", error);
        res.status(500).json({message: "Internal server error"});
    }
}
