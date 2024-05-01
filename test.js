const { expect } = require('chai');
const bcrypt = require('bcrypt');
const {
  checkPasswordRequirements,
  hashPassword,
  compareWithHash,
} = require('./javaj.js'); // замініть 'yourFile' на шлях до вашого файлу з функціями

describe('Password Functions', function () {
  describe('checkPasswordRequirements', function () {
    it('should return true for a valid password', function () {
      const validPassword = 'Test123!';
      expect(checkPasswordRequirements(validPassword)).to.be.true;
    });

    it('should return false for a password with less than 8 characters', function () {
      const shortPassword = 'Short1!';
      expect(checkPasswordRequirements(shortPassword)).to.be.false;
    });

    it('should return false for a password without uppercase letters', function () {
      const noUppercasePassword = 'test123!';
      expect(checkPasswordRequirements(noUppercasePassword)).to.be.false;
    });

    it('should return false for a password without lowercase letters', function () {
      const noLowercasePassword = 'TEST123!';
      expect(checkPasswordRequirements(noLowercasePassword)).to.be.false;
    });

    it('should return false for a password without numbers', function () {
      const noNumberPassword = 'TestTest!';
      expect(checkPasswordRequirements(noNumberPassword)).to.be.false;
    });

    it('should return false for a password without special characters', function () {
      const noSpecialCharPassword = 'Test123';
      expect(checkPasswordRequirements(noSpecialCharPassword)).to.be.false;
    });
  });

  describe('hashPassword and compareWithHash', function () {
    it('should hash and compare password correctly', async function () {
      const password = 'Test123!';
      const hashedPassword = await hashPassword(password);
      expect(await compareWithHash(hashedPassword, password)).to.be.true;
    });

    it('should not match hash for incorrect password', async function () {
      const password = 'Test123!';
      const incorrectPassword = 'Test321!';
      const hashedPassword = await hashPassword(password);
      expect(await compareWithHash(hashedPassword, incorrectPassword)).to.be.false;
    });
  });
});
