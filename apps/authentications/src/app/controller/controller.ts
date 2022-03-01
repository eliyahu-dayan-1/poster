import { Request, Response } from 'express';
import { authLogger as logger } from '../services/logger/logger.service';
import authService from '../services/auth/auth.service';
import UserInformation from '../interfaces/data-contracts/UserInformation';

class AuthController {
  getSession = async (req: Request, res: Response) => {
    // console.log('getting session.........');

    try {
      res.send(req.session.user);
    } catch (err) {
      res.status(500).send(err);
    }
  };

  login = async (req: Request, res: Response) => {
    const { userName, password } = req.body;

    try {
      const hashPassword = await authService.hashingPassword(password);
      const { jwt, success } = await authService.login({
        userName,
        hashPassword,
      });
      if (success) {
        req.session = { jwt };
      }

      res.json();
    } catch (err) {
      res.status(401).send(err);
    }
  };

  signup = async (req: Request, res: Response) => {
    try {
      const {
        password,
        firstName,
        lastName,
        phone,
        userName,
      }: UserInformation = req.body;
      const registerUserRes = await authService.registerUser({
        password,
        firstName,
        lastName,
        userName,
        phone,
      });

      if (registerUserRes.success && registerUserRes.response) {
        const jwt = await authService.login({
          userName: registerUserRes.response.userName,
          hashPassword: registerUserRes.response.password,
        });

        if (registerUserRes.response.password)
          delete registerUserRes.response.password;
        req.session = { jwt };
      }

      res.json(registerUserRes);
    } catch (err) {
      logger.error('[SIGNUP] ' + err);
      res.status(500).send(err);
    }
  };

  logout = async (req: Request, res: Response) => {
    // let loogedUser = req.session.user
    try {
      req.session.destroy();
      res.send({ message: 'success' });
    } catch (err) {
      res.status(500).send(err);
    }
  };
}

export { AuthController };
