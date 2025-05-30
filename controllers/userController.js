const User = require('../schema/userSchema')

const createUser = async (req, res) => {
    try {
        const {userName, password, email} = req.body;
        if (!userName | !password | !email) {
            return res.status(400).json({message: "Username or email or password is missing"})
        }
        const existingUser = await User.findOne({email})
        if (existingUser) {
            res.status(400).json({message: "A user with this email already exist, pls sign in"})
            return
        }
       const newUser = new User(req.body)
       await newUser.save()
       res.status(201).json({message:'user created'})
    } catch (error) {
     res.send('error creating user', error )
    }
}

const fetchUsers = async (req,res) => {
    try {
        const users = await User.find()
        res.status(200).json(users, {message: "Users found"})
    } catch (error) {
        
    }
}

const fetchAUser = async (req,res) => {
    try {
        const {email} = req.params
        const user = await User.findOne({email})
        res.status(200).json(user,{message: "User found"})
    } catch (error) {
        
    }
}

const updateUser = async (req,res) => {
    try {
        const {userName} = req.body
         const { email} = req.params

        const user = await User.findOne({email})
        if (user.userName === userName ) {
            return res.status(400).json({message: "This is already your username"})
        }
        const existingUserName = await User.findOne({userName})
        if (existingUserName) {
            return res.status(400).json({message: "This username is already taken"})
        }
        const updated = await User.findOneAndUpdate({email}, {userName}, {new: true} )
        res.status(200).json(updated)
    } catch (error) {
 return res.status(500).json({message: "error"})
        console.log('error')
    }
}

const deleteUser = async (req,res) => {
   try {
    const {email} = req.params
    const user = await User.findOne({email})

    if (!user || typeof email !== 'string') {
            return res.status(404).json({message: "user doesn't exist"})
        }
        const deleted = await User.findOneAndDelete({email})
        res.status(200).json({ message: "User deleted successfully", data: deleted });
        
   } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({message: "An error occurred while deleting the user", error: error.message})
        console.log('error')
   } 
}

module.exports = {fetchUsers, fetchAUser, createUser, updateUser, deleteUser}
