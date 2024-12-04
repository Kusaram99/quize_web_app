import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

// Define the schema with validation
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"], 
        minlength: [3, "Username must be at least 3 characters long"],
        maxlength: [30, "Username cannot exceed 30 characters"], 
        trim: true, // Removes leading/trailing spaces
    },
    email: {
        type: String,
        required: [true, "Email is required"], 
        unique: true, // Ensures email is unique in the collection
    },
    password: {
        type: String,
        required: [true, "Password is required"],  
    },
    refreshToken:{
        type: String
    }
}, { 
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
});


// store user password to the database as hashed password
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

// check old password is correct
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

// generate AccessToken
userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// generate refresh token
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// Create the model
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
