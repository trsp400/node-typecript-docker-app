import { Request, Response } from "express";
import { Router } from "express";
import { getRepository } from "typeorm";

import verifyAuthentication from "../middlewares/verifyAuthentication";
import User from "../models/User";
import CreateUserService from "../services/CreateUserService";

const usersRoutes = Router();

usersRoutes.get(
  "/:id",
  verifyAuthentication,
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const usersRepository = getRepository(User);
    return response.send(await usersRepository.findByIds([id]));
  }
);

usersRoutes.get(
  "/",
  // verifyAuthentication,
  async (request: Request, response: Response) => {
    const usersRepository = getRepository(User);
    return response.send(await usersRepository.find());
  }
);

usersRoutes.post("/", async (request: Request, response: Response) => {
  try {
    const {
      name,
      phone,
      email,
      password,
      age,
      weigth,
      ethnicity,
    } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
      phone,
      age,
      weigth,
      ethnicity,
    });

    delete user.password;

    return response.status(201).send(user);
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

usersRoutes.put(
  "/:id",
  verifyAuthentication,
  async (request: Request, response: Response) => {
    try {
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
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
);

usersRoutes.delete(
  "/:id",
  verifyAuthentication,
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const usersRepository = getRepository(User);

      const userExists = await usersRepository.findOne(id);

      if (!userExists)
        return response.status(404).send({
          error: "User not found",
        });

      await usersRepository.delete(userExists);

      return response.status(200).send();
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
);

export { usersRoutes };
