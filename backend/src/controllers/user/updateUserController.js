import User from "../.././model/user.js"

export async function updateUser(req, res){
    console.log("ipdate user")
    try {
        const {name, email, password, role} = req.body;
        console.log(req.body.name);
        console.log(req.body.email);
        console.log(req.body.password);
        console.log(req.body.role);
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {name, email, password, role},
            {
                new:true
            }
        );
        console.log('vids =',updatedUser)
        if (!updatedUser) return res.status(404).json({ message: "User not found" });

        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in creating user in user controller.", error);
        res.status(500).json({message: "Internal server error"});
    }
}

