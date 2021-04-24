import { Request, Response } from "express";
import { Router } from "express";
import { getRepository } from "typeorm";

import verifyAuthentication from "../middlewares/verifyAuthentication";
import Address from "../models/Address";
import CreateAddressService from "../services/CreateAddressService";

const addressesRoutes = Router();

addressesRoutes.get(
  "/:id",
  verifyAuthentication,
  async (request: Request, response: Response) => {
    const { id } = request.params;
    const addressesRepository = getRepository(Address);
    return response.send(await addressesRepository.findByIds([id]));
  }
);

addressesRoutes.get(
  "/",
  verifyAuthentication,
  async (request: Request, response: Response) => {
    const addressesRepository = getRepository(Address);
    return response.send(await addressesRepository.find());
  }
);

addressesRoutes.post("/", async (request: Request, response: Response) => {
  try {
    const { street, number, complement, cep, city, state } = request.body;

    const createAddress = new CreateAddressService();

    const address = await createAddress.execute({
      street,
      number,
      complement,
      cep,
      city,
      state,
    });

    return response.status(201).send(address);
  } catch (error) {
    return response.status(500).json(error.message);
  }
});

addressesRoutes.put(
  "/:id",
  verifyAuthentication,
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params;
      const { street, number, complement, cep, city, state } = request.body;

      const addressesRepository = getRepository(Address);

      const addressExists = await addressesRepository.findOne(id);

      if (!addressExists)
        return response.status(404).send({
          error: "Address not found",
        });

      addressExists.street = street;
      addressExists.number = number;
      addressExists.complement = complement;
      addressExists.cep = cep;
      addressExists.city = city;
      addressExists.state = state;

      await addressesRepository.save(addressExists);

      return response.status(200).send(addressExists);
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
);

addressesRoutes.delete(
  "/:id",
  verifyAuthentication,
  async (request: Request, response: Response) => {
    try {
      const { id } = request.params;

      const addressesRepository = getRepository(Address);

      const addressExists = await addressesRepository.findOne(id);

      console.log(addressExists);

      if (!addressExists)
        return response.status(404).send({
          error: "Address not found",
        });

      await addressesRepository.delete(addressExists);

      return response.status(200).send();
    } catch (error) {
      return response.status(500).json(error.message);
    }
  }
);

export { addressesRoutes };
