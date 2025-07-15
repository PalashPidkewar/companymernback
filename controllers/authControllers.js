import UserSchema from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//     try {
//         const { name, email, password, role } = req.body;
//         const user = await UserSchema.findOne({ email });
//         if (user) {
//             return res.status(409)
//                 .json({ message: "User is already exist you are login", success: false })
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const Users = await UserSchema.create({
//             name,
//             email,
//             password: hashedPassword,
//             role,
//             photo: req.file.path

//         });
//         Users.save();
//         res.status(201).json({ message: 'User registered successfully' });

//     } catch (error) {
//         return res.status(401).json({ msg: error })
//     }
// }

export const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check if user already exists
        const existingUser = await UserSchema.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists. Please login.",
                success: false
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user object
        const newUser = await UserSchema.create({
            name,
            email,
            password: hashedPassword,
            role,
            imgpath: req.file?.path // Will only be required if role === 'employee' (handled by schema)
        });

        // Save user
        await newUser.save();

        res.status(201).json({
            message: 'User registered successfully',
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            msg: error.message || "Something went wrong",
            success: false
        });
    }
};
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserSchema.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: `invaid user login please register first then login`, success: false })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({ token, user: { name: user.name, role: user.role } });




    } catch (error) {
        return res.status(501).json({ msg: error.message })
    }
}
// get employeer user data get
export const getRegisterUser = async (req, res) => {
    try {
        const employees = await UserSchema.find({ role: 'employee' }).select('name').select('email').select('imgpath');
        res.status(200).json({
            msg: "All employee names",
            employees,

        });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
};


// password upadte admin and users


// export const Updatepassword = async (req, res) => {

//     const { oldpassword, newpassword } = req.body;

//     console.log("Request body:", req.body);
//     console.log("User from JWT:", req.users);
//     try {
//         const user = await UserSchema.findById(req.users.id)
//         if (!user) {
//             return res.status(404).json({ msg: "User not found" });
//         }


//         const isMatch = await bcrypt.compare(oldpassword, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ msg: "Old password is incorrect" });
//         }

//         const hashedPassword = await bcrypt.hash(newpassword, 10);
//         user.password = hashedPassword;
//         await user.save();

//         res.json({ msg: "Password updated successfully" });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: "Server error" });
//     }
// }
export const Updatepassword = async (req, res) => {
    const { oldpassword, newpassword } = req.body;

    console.log("Request body:", req.body);
    console.log("User from JWT:", req.user);

    try {
        const user = await UserSchema.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(oldpassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Old password is incorrect" });
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ msg: "Password updated successfully" });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ msg: "Server error" });
    }
};
