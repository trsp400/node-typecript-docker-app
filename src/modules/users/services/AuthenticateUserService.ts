import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import User from "@models/User";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) throw new Error("Incorrect credentials");

    const passwordMatch = await compare(password, user.password || "");

    if (!passwordMatch) throw new Error("Incorrect credentials");

    const token = sign({}, "63854069a11465796075cff3674aa761", {
      subject: user.id,
      expiresIn: "1d",
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
