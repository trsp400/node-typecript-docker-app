import User from "@models/User";
import ValidateUserEmailService from './ValidateUserEmailService';

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

    const emailValidator = new ValidateUserEmailService();

    const {valid: isEmailValid} = await emailValidator.execute(email);

    if (!isEmailValid) throw new Error("Invalid e-mail");

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
      age,
      weigth,
      ethnicity,
    });

    await usersRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
