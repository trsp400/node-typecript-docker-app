import { HookHandlerDoneFunction, FastifyReply, FastifyRequest } from "fastify";
import { verify } from "jsonwebtoken";

interface TokenPayload {
  sub: string;
  exp: number;
  iat: number;
}

interface ICustomRequest extends FastifyRequest {
  user?: {
    id: string;
  };
}

export default function verifyAuthentication(
  request: ICustomRequest,
  reply: FastifyReply,
  next: HookHandlerDoneFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new Error("JWT missing");

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
