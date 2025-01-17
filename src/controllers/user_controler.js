import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import UserModel from "../models/userModels.js";

// token generator ================== Not Implemented =======================================
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await UserModel.findById(userId);

    // generate access token
    const accessToken = user.generateAccessToken();

    // refresh token
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(501, "Server Error, during token generation");
  }
};

// register user =========================================================
const registerUser = asyncHandler(async (req, res, next) => {
  try {
    console.log("====== ", req.body);
    const { username, email, password } = req.body;

    // check is user data empty
    if ([username, email, password].some((v) => v?.trim() === "")) {
      throw new ApiError(401, "All fields are required");
    }

    // user is existed or not
    const exitedUser = await UserModel.findOne({
      $or: [{ username }, { email }],
    });

    if (exitedUser) {
      throw new ApiError(401, `User with ${email} and ${username} username already exists`);
    }

    // create user
    const user = await UserModel.create({
      username,
      email,
      password,
    });

    // console.log("========= ", user._id);

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
      user._id
    );

    // save refreshtoken
    user.refreshToken = refreshToken;
    await user.save();

    const signedUser = await UserModel.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "Strict", 
    };

    // send respons with cookies
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: signedUser,
            refreshToken,
            accessToken,
          },
          "User Signed successfully"
        )
      );
  } catch (err) {
    console.log("err: ", err);
    throw new ApiError(501, err.message || "Server Error");
  }
});

// login =========================================================
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { username, password } = req.body;

    // check is user data empty
    if ([username, password].some((v) => v?.trim() === "")) {
      throw new ApiError(401, "All fields are required");
    }

    // find the user
    const user = await UserModel.findOne({ username });

    // check user is existed or not
    if (!user) {
      throw new ApiError(401, "User with email does not exist");
    }

    // check password
    const isPasswordCorrect = await user.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
      throw new ApiError(401, "Password is incorrect");
    }

    // generate access token and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

    // save refreshtoken
    user.refreshToken = refreshToken;
    await user.save();

    const loggedUser = await UserModel.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict'
    };

    // send respons with cookies
    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            user: loggedUser,
            accessToken,
            refreshToken,
          },
          "User Logged in successfully"
        )
      );
  } catch (error) {
    console.log("error: ", error);
    throw new ApiError(401, error.message || "Server Error");
  }
});

// Log out user =================================================================================
const userLogout = asyncHandler(async (req, res, next) => {
  console.log("user Log ou===============")
  try {
      
      console.log("logout user---------------");

      await UserModel.findByIdAndUpdate(
          req.user._id,
          {
              $unset: {
                  refreshToken: 1 // this delete the field from document.
              }
          },
          {
              new: true
          }
      )

      const options = {
          httpOnly: true,
          secure: true
      }

      res.status(200)
          .clearCookie("accessToken", options)
          .clearCookie("refreshToken", options)
          .json(new ApiResponse(200, {}, "User logged out successfully"))
  } catch (error) {
      console.log("error: ", error);
      throw new ApiError(401, "Server Error")
  }
})

// refresh token ======================== not implemented in project ===========================
const refreshAccessToken = asyncHandler(async (req, res, next) => {
    // console.log("Refresh Token ===============: ", req.body)
    // access kockies
    // const incomingRefreshToken = req.cookies?.refreshToken || req.header?.refreshToken?.split(" ")[1];
    const incomingRefreshToken = req.cookies?.refreshToken || req.header("Authorization")?.split(" ")[1]
    console.log("incomingRefreshToken: ",incomingRefreshToken);
    console.log("Cookies: ",req.cookies?.refreshToken )
    if (!incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is required");
    }
    try { 
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET); 
 
        console.log("decoded: ", decodedToken)

        // check refresh token is existed or not
        if (!decodedToken) {
            throw new ApiError(401, "Refresh token is expired!");
        }

        // check user
        const user = await UserModel.findById(decodedToken?._id);

        // is user existed or not
        if (!user) {
            throw new ApiError(401, "Invalid Refresh Token");
        }

        // check is refresh token expired or not
        if (incomingRefreshToken!== user?.refreshToken) {
            throw new ApiError(401, "Invalid Refresh Token, Something is wrong!");
        }

        // generate access token and refresh token
        const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(user._id);

        const options = {
          httpOnly: true,
          secure: false, // Set to true in production
          sameSite: "Lax", // Use "Strict" in production
      };

        // send respons with cookies
        res.status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken
                    },
                    "Access Token refreshed successfully"
                )
            )

    } catch (error) {
        console.log("error------: ", error.message);
        throw new ApiError(401, error?.message || "Server Error")
    }
})

export { registerUser, loginUser, refreshAccessToken, userLogout };
