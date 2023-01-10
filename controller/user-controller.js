import User from "../model/user.js";
import Token from "../model/token.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signupUser = async (request, response) => {
  //console.log(request.body);
  try {
    // const user = {
    //   name: request.body.name,
    //   username: request.body.username,
    //   password: request.body.password,
    // };

    // to encrypt the password ..
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const user = {
      name: request.body.name,
      username: request.body.username,
      password: hashedPassword,
    };
    const newUser = new User(user);
    await newUser.save();

    return response
      .status(200)
      .json({ msg: "Signup Successful!. Data Stored in DB!" });
  } catch (error) {
    return response
      .status(500)
      .json({ msg: "Signup Failed, Data didn't save in DB!", err: error });
  }
};

export const loginUser = async (request, response) => {
  let user = await User.findOne({ username: request.body.username });
  if (!user) {
    return response.status(400).json({ msg: "Username doesn't exist in DB.." });
  }

  try {
    let match = await bcrypt.compare(request.body.password, user.password);
    if (match) {
      // to generate Secret key tun this code in node shell-> require('crypto').randomBytes(64).toString('hex')
      let accessToken = jwt.sign(user.toJSON(), process.env.SECRET_ACCESS_KEY, {
        expiresIn: "15m",
      });
      let refreshToken = jwt.sign(
        user.toJSON(),
        process.env.SECRET_REFRESH_KEY
      );

      const newToken = new Token({ token: refreshToken });

      await newToken.save();

      return response.status(200).json({
        accessToken: accessToken,
        refreshToken: refreshToken,
        name: user.name,
        username: user.username,
      });
    } else {
      return response.status(400).json({ msg: "Password doesn't match.." });
    }
  } catch (error) {
    return response.status(500).json({ msg: "Error while login the User.." });
  }
};
