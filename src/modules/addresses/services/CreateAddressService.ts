import Address from "@models/Address";

import { getRepository } from "typeorm";

interface Request {
  street: string;
  number: number;
  complement: string;
  cep: number;
  city: string;
  state: string;
}

class CreateUserService {
  async execute({
    street,
    number,
    complement,
    cep,
    city,
    state,
  }: Request): Promise<Address> {
    const addressRepository = getRepository(Address);

    const newAddress = addressRepository.create({
      street,
      number,
      complement,
      cep,
      city,
      state,
    });

    await addressRepository.save(newAddress);

    return newAddress;
  }
}

export default CreateUserService;
