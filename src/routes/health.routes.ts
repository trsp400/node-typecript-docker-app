import { Request, Response } from "express";
import { Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/", async (request: Request, response: Response) => {
  const { createdAt } = request;
  const aliveTime = new Date().getTime() - createdAt.getTime();

  try {
    return response.status(200).json({
      createdAt,
      aliveTime,
    });
  } catch (error) {
    return response.status(error.status).json(error.message);
  }
});

export { healthRoutes };
