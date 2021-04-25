import emailValidator from 'deep-email-validator';

class ValidateUserEmailService {
  async execute(email: string) {
    try {
      return emailValidator(email);
    } catch (error) {
      throw new Error(error.message);      
    }
  }
}

export default ValidateUserEmailService;