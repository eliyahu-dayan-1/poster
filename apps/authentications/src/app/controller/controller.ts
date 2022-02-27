import {
  passwordCollection,
  blacklistCollection,
} from '../services/collections-service';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authLogger as logger } from '../services/logger.service';
import authService from '../services/auth-service';
import UserInformation from '../interfaces/data-contracts/UserInformation';
// Generate JWT
// const userJwt = jwt.sign(
//   {
//     id: 'aaaa',
//     email: 'ggggggg',
//   },
//   'asdf'
// );

// // Store it on session object
// req.session = {
//   jwt: userJwt,
// };
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
    const { username, password } = req.body;
    try {
      const user = await authService.login(username, password);
      req.session.user = user;

      res.json(user);
    } catch (err) {
      res.status(401).send(err);
    }
  };

  signup = async (req: Request, res: Response) => {
    try {
      const { password, firstName, lastName, phone }: UserInformation =
        req.body;
      console.log(firstName + ', ' + password + ', ' + lastName);
      const registerUserRes = await authService.registerUser({
        password,
        firstName,
        lastName,
        phone,
      });
      logger.debug(
        `auth.route - new account created: ` + JSON.stringify(registerUserRes)
      );
      // const user = await authService.login(username, password);
      // req.session.user = user;
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
