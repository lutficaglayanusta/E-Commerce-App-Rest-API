import CustomError from "../../helpers/error/CustomError.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { isTokenIncluded, getAccessTokenFromHeader } from "../../helpers/authorization/tokenHelpers.js";

dotenv.config();

export const getAccessToRoute = (req, res, next) => {
    if(!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized to access this route", 401));
    }
    const access_token = getAccessTokenFromHeader(req);

    jwt.verify(access_token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if(err){
            return next(new CustomError("You are not authorized to access this route", 401));
        }
        req.user = {
            id: decoded.id,
            name: decoded.name
        }
        next();
    })

    
}