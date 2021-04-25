import faker from 'faker';

import CreateUserService from './CreateUserService';
import User from "@models/User";

let fakeUserData: User;
const ethnicityArray = ["branco", "preto", "indigena", "parda", "amarelo"]

describe('Create User', () => {
  beforeAll(() => {
    fakeUserData = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumber(),
      age: Math.random() * 100,
      //@ts-ignore
      ethnicity: ethnicityArray[Math.floor(Math.random() * ethnicityArray.length) ],
      weigth: Math.random() * 100,
      password: faker.internet.password(),
    }
  })

  it('should be able to create a user', () => {
    const createUserService = new CreateUserService();

    console.log(fakeUserData)
  })
})