import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import jwt from 'jsonwebtoken'
import UserModel from '../models/userModels.js'

export const verifyJWT = asyncHandler(async (req, _, next) => {
    console.log("vierifyJWT........................")
    try {
        // const token = req.cookies?.accessToken
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace('Bearer ', "")
        console.log("verifyJwt=========: ", token);

        // console.log("token: ", process.env.ACCESS_TOKEN_SECRET)

        if (!token) {
            console.log("Error===========================")
            throw new ApiError(401, "Unauthorized request")
        }

        console.log("decodedToken =============: ")
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET); 
        // const decodedToken = jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzQ4OTEwZTU5YmZjNjM0MjVkOWIzZDQiLCJlbWFpbCI6InJhbUBnYW1pbC5jb20iLCJ1c2VybmFtZSI6InJhbTk5IiwiaWF0IjoxNzMyOTkyNTM1LCJleHAiOjE3MzM0MjQ1MzV9.oPdTL700GsUMQRZC4bfkslRsLi6eeJ2TUHvKRfct_Go", process.env.ACCESS_TOKEN_SECRET); 
        console.log("decodedToken --------------: ")
        
        const user = await UserModel.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid Access Token");
        }

        req.user = user;
        next();
    } catch (error) {

        console.log("verifyJwt: ", error.name);
        // console.log("verifyJwt----------: ", error?.message);
        throw new ApiError(401, error?.message || "Invalid access token");
    }
})