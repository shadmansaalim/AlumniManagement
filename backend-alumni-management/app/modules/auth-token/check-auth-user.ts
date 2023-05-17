import { verify } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();

export const authGuard = async (req: Request, res: Response, next: NextFunction) => {
  let message = "Authentication fail";
  try {
    const token = req?.headers?.authorization?.split(" ")[1]??"";
    verify(token, process?.env?.SECRET_KEY??' ', function (err, decoded) {
      if (err) {
        if (err.name == "TokenExpiredError") {
          message = "Session expired";
        }
        throw Error();
      }
    });
    next();
  } catch (error) {
    return res.status(401).json({
      message: message,
      code: 401,
    });
  }
}

