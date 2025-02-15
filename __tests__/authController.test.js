// __tests__/authController.test.js
const authController = require('../src/controllers/authController');
const User = require('../src/models/User');

// mock es hacer una imitación de algo, en este caso de la función User.findOne
jest.mock('../src/models/User');

describe('Auth Controller', () => {
  describe('login', () => {
    it('should return a token if login is successful', async () => {
      // mock encontrar un usuario
      User.findOne.mockResolvedValue({
        email: 'test@gmail.com',
        password: '12345',
      });

      // Mock bcrypt comparar contraseñas
      jest.spyOn(require('bcrypt'), 'compare').mockResolvedValue(true);

      // Mock jwt.sign para devolver un token falso
      jest.spyOn(require('jsonwebtoken'), 'sign').mockReturnValue('fake-token');

      const req = {
        body: {
          email: 'test@gmail.com',
          password: '12345',
        },
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await authController.login(req, res);

      expect(res.json).toHaveBeenCalledWith({ token: 'fake-token' });
    });

    it('should return an error if login fails', async () => {
      // Mock Usuario no encontrado
      User.findOne.mockResolvedValue(null);

      const req = {
        body: {
          email: 'test@gmail.com',
          password: '12345',
        },
      };

      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };

      await authController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials.' });
    });
  });
});