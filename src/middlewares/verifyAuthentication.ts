import { Request, Response, NextFunction, response } from "express";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
  exp: number;
  iat: number;
}

interface ICustomRequest extends Request {
  user?: {
    id: string;
  };
}

export default function verifyAuthentication(
  request: ICustomRequest,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) response.status(401).json({message: 'JWT missing'});

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, "63854069a11465796075cff3674aa761");

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new Error("Invalid JWT");
  }
}
