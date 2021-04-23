import {Router} from 'express';
import { getRepository } from "typeorm";

import verifyAuthentication from "../middlewares/verifyAuthentication";
import User from "../models/User";
import CreateUserService from "../services/CreateUserService";

const usersRoutes = Router();

usersRoutes.get(
  "/:id",
  verifyAuthentication,
  //@ts-ignore
  async (request, response) => {
    const { id } = request.params;
    const usersRepository = getRepository(User);
    return response.send(await usersRepository.findByIds([id]));
  }
);

usersRoutes.get(
  "/",
  // verifyAuthentication,
  async (request, response) => {
    const usersRepository = getRepository(User);
    return response.send(await usersRepository.find());
  }
);

usersRoutes.post("/", async (request, response) => {
  const { name, phone, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    phone,
    email,
    role: "seller",
    password,
  });

  delete user.password;

  return response.status(201).send(user);
});

usersRoutes.put(
  "/:id",
  verifyAuthentication,
  //@ts-ignore
  async (request, response) => {
    const { id } = request.params;
    const { name, phone, cpf, newPassword } = request.body;

    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne(id);

    if (!userExists)
      return response.status(404).send({
        error: "User not found",
      });

    userExists.name = name;
    userExists.phone = phone;
    userExists.password = newPassword;

    await usersRepository.save(userExists);

    return response.status(200).send(userExists);
  }
);

usersRoutes.delete(
  "/:id",
  verifyAuthentication,
  //@ts-ignore
  async (request, response) => {
    const { id } = request.params;

    const usersRepository = getRepository(User);

    const userExists = await usersRepository.findOne(id);

    if (!userExists)
      return response.status(404).send({
        error: "User not found",
      });

    usersRepository.delete(userExists);

    return response.status(200).send();
  }
);

export {usersRoutes};