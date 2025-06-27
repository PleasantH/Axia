const bcrypt = require('bcrypt');
const User = require('../schema/userSchema')
const jwt = require('jsonwebtoken');


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

const createUser = async (req, res) => {
    try {
        const {userName, email, password, admin, AltimaAdmin, profile} = req.body
       if (!userName || !email || !password, !profile) {
            return res.status(400).json({message: "Please fill all fields"})
        }
        const existingUser = await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({message: "User already exists"})
        }
        const salt = 12;
        const hashedPassword = await bcrypt.hashSync(password, salt)


        if (email === 'tobi@gmail.com' || email === 'seyi@gmail.com') {
            const newUser = ({...req.body, password: hashedPassword, admin: true})
            const savedUser = new User({
                ...newUser,
            })
            await savedUser.save()
            res.status(201).json({message: "User created successfully", data: savedUser})   
        }
        
        const newUser = new User({
            userName,
            email,
            password: hashedPassword,
            profile,
            AltimaAdmin,
            admin
        })


        const savedUser = await newUser.save()
        console.log("User created successfully:", savedUser)
        res.status(201).json({message: "User created successfully", data: savedUser})  
    }
    catch (error) {
        console.error('Error creating user:', error);
        return res.status(500).json({message: "An error occurred while creating the user", error: error.message})
    }
}


const login = async (req, res) => {
    try {
          const {email, password} = req.body
       if (!email || !password) {
            return res.status(400).json({message: "Please fill all fields"})
        }
        const existingUser = await User.findOne({email})
        if (!existingUser) {
            return res.status(400).json({message: "User doesn't exist, kindly sign up"})
        }
        const isPasswordCorrect = await bcrypt.compareSync(password, existingUser.password)
        if (!isPasswordCorrect) {
            return res.status(400).json({message: "Invalid email or password"})
        }
        const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        });
        res.cookie("access_token", token, {
        httpOnly: true,           // Can't be accessed via JavaScript (for security)
        secure: process.env.NODE_ENV === "production", 
      sameSite: "strict",       
      maxAge: 60 * 60 * 1000    
    });

    
        console.log('Token generated:', token);
        res.status(201).json({message: "User retrieved successfully", data: {
            userName: existingUser.userName,
            email: existingUser.email,
            role: existingUser.role
        }})  
    } catch (error) {
        console.error('Error logging user:', error);
        return res.status(500).json({message: "An error occurred logging the user", error: error.message})
    }
}



const updateUser = async (req,res) => {
    try {
        const {userName, token} = req.body
         const { email} = req.params
        if (!userName) {
            return res.status(400).json({message: "Please fill all fields"})
        }
const decoded = jwt.verify(token, process.env.JWT_SECRET, function(err, decoded) {
    if (err) {
        return res.status(401).json({message: "Invalid token"});
    }
  return decoded;
});
        const user = await User.findOne({email})
        const loggedInUser = await User.findById({_id: decoded.id})
        const isSameUser = user._id.toString() == loggedInUser._id.toString()
        const isAdmin = loggedInUser.role === 'admin' || loggedInUser.role === 'superAdmin'
        if (!isSameUser && !isAdmin) {
            console.log("User is not authorized to update this user", isSameUser, isAdmin)
            return res.status(403).json({message: "You are not authorized to update this user"})
        }
        if (user.userName === userName ) {
            return res.status(400).json({message: "This is already your username"})
        }
        const existingUserName = await User.findOne({userName})
        if (existingUserName) {
            return res.status(400).json({message: "This username is already taken"})
        }
        const updated = await User.findOneAndUpdate({email}, { $set: { userName } },
            {new: true} )
        res.status(200).json(updated)
    } catch (error) {
        console.log('error', error)
 return res.status(500).json({message: "error"})
    }
}

const deleteUser = async (req,res) => {
   try {
    const {loggedInUserId} = req.body
    const {email} = req.params
     if (!loggedInUserId) {
            return res.status(400).json({message: "Please fill all fields"})}
    const user = await User.findOne({email})
    const loggedInUser = await User.findById({_id: loggedInUserId})
    const isSameUser = user._id.toString() == loggedInUser._id.toString()
    const isAdmin = loggedInUser.role === 'admin'
    if (!isSameUser && !isAdmin) {
            console.log("User is not authorized to delete this user", isSameUser, isAdmin)
            return res.status(403).json({message: "You are not authorized to delete this user"})}
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

module.exports = {fetchUsers, fetchAUser, createUser, updateUser, deleteUser, login}
