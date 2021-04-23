import {Router} from 'express';
import AuthenticateUserService from "../services/AuthenticateUserService";

const sessionsRoutes = Router();

sessionsRoutes.post("/", async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    delete user.password;
    return response.status(201).send({ user, token });
  } catch (error) {
    return response.status(401).send({
      error: error.message,
    });
  }
});

export {sessionsRoutes}