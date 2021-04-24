import User from "../models/User";

import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

interface Request {
  name: string;
  email: string;
  password: string;
  phone: string;
  age: number;
  weigth: number;
  ethnicity: "branco" | "preto" | "indigena" | "parda" | "amarelo";
}

class CreateUserService {
  async execute({
    name,
    email,
    password,
    phone,
    age,
    weigth,
    ethnicity,
  }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne({
      where: {
        email,
      },
    });

    if (userExists) throw new Error("There is already a user with this email");

    const hashedPassword = await hash(password, 8);

    const newUser = usersRepository.create({
      name,
      email,
      password: hashedPassword,
      phone,
      age: 12,
      weigth: 70,
      ethnicity: "indigena",
    });

    await usersRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
