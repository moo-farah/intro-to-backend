import { User} from '../models/user.models.js';

const registerUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // basic validation
        if(!username || !email || !password) {
            return res.status(400).json({message: "All fields are required"})
        }

        // check if user exist already
        const existing = await User.findOne({email: email.toLowerCase() });
        if(existing) {
            return res.status(400).json({message: "User already exists"});
        }

        // create user

        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password,
            loggedIn: false,  
        });

        res.status(201).json({
            message: "User registered",
            user: {id: user._id, email: user.email, username: user.username }
        });

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message});
    }
}

 // creating the user login
const loginUser = async (req, res) => {
    try {
        // checking if the user already exists
        const { email, password } = req.body;

        const user = await User.findOne({
            email: email.toLowerCase()
        });

        if(!user) return res.status(400).json({
            message: "User not found"
        });

        // compare password
        const isMatch = await user.comparePassword(password);
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials"

        });

        res.status(200).json({
            message: "User Logged",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}


export {
    registerUser,
    loginUser
}