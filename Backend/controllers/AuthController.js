const bcrypt = require('bcrypt');
const UserModel = require("../Models/users");
const jwt = require('jsonwebtoken');



const signup = async (req, res) => {
    try{
        const {name,email,password} = req.body;
        const user = await UserModel.findOne({ email});
        if (user) {
            return res.status(409)
            .json({ messaage: "user is already exist, you can login", success: false});
        }
        const userModel = new UserModel ({name,email,password});
        userModel.password = await bcrypt.hash(password, 10);
        await userModel.save();
        res.status(201)
        .json({
            message: "Signup successfully",
            success:true
        })
    } catch(err){
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
}

const login = async (req, res) => {
    try{
        const {email,password} = req.body;
        const user = await UserModel.findOne({ email});
        const errorMsg = 'Auth failed  email or  password is wrong';
        if (!user) {
            return res.status(409)
            .json({ messaage: errorMsg, success: false});
        }
        const isPassEqual = await bcrypt.compare(password, user.password); 
        if (!isPassEqual){
            return res.status(409)
            .json({ messaage: errorMsg, success: false});
        }
        const jwToken = jwt.sign(
            {email: user.email, _id: user._id},
            process.env.JWT_SECRET,
            { expiresIn: '24'}
        )
        
        res.status(200)
        .json({
            message: "Login successfully",
            success:true,
            jwToken,
            email,
            name: user.name
        })
    } catch(err){
        res.status(500)
        .json({
            message: "Internal server error",
            success: false
        })
    }
}

module.exports = {
    signup, 
    login
}