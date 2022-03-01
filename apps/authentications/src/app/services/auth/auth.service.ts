import UserInformation from '../../interfaces/data-contracts/UserInformation';
import UsersCollectionStructure from '../../interfaces/data-contracts/UserCollectionStructure';
import {
  passwordCollection,
  blacklistCollection,
  usersCollection,
} from '../collections/collections.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authLogger } from '../logger/logger.service';

class AuthService {
  saltRounds = 10;
  addPassword = async ({ hashPassword, userId }: any) => {
    const addPasswordRes = passwordCollection.add({
      userId,
      password: hashPassword,
    });
    return addPasswordRes;
  };

  getUserByUserName = async (userName: string) => {
    return await usersCollection.query({ userName });
  };

  login = async ({
    hashPassword,
    userName,
  }: {
    hashPassword: string;
    userName: string;
  }): Promise<{ jwt: string; success: boolean }> => {
    let isLoginSuccess = false;
    let userJwt = '';

    const getUserByUserNameRes = await this.getUserByUserName(userName);
    if (getUserByUserNameRes) {
      const isPasswordMatch = getUserByUserNameRes.password === hashPassword;
      const isUserNameMatch = getUserByUserNameRes.userName === hashPassword;

      const isUserCanLogin = isUserNameMatch && isPasswordMatch;
      if (isUserCanLogin) {
        isLoginSuccess = true;
        // Generate JWT
        userJwt = jwt.sign(getUserByUserNameRes, 'abcd');
      }
    }

    return { jwt: userJwt, success: isLoginSuccess };
  };
  hashingPassword = async (
    password: string,
    saltRounds = this.saltRounds
  ): Promise<string> => {
    return await bcrypt.hash(password, saltRounds);
  };
  registerUser = async (
    userInformation: UserInformation
  ): Promise<{
    success: boolean;
    response: UsersCollectionStructure | undefined;
  }> => {
    let registerUserRes;
    let isRegisterUserSuccess = false;

    const isAllFieldsFull =
      userInformation.firstName &&
      userInformation.lastName &&
      userInformation.userName &&
      userInformation.phone &&
      userInformation.password;

    if (isAllFieldsFull) {
      const user: Array<UsersCollectionStructure> | undefined =
        await usersCollection.query({
          userName: userInformation.userName,
        });
      const userAlreadyExist = !!user;
      if (!userAlreadyExist) {
        const hashPassword = this.hashingPassword(userInformation.password);

        const addUserPayload: UsersCollectionStructure = {
          firstName: userInformation.firstName,
          lastName: userInformation.lastName,
          userName: userInformation.userName,
          phone: userInformation.phone,
          password: hashPassword,
          createdAt: Date.now(),
        };

        const addUserRes: UsersCollectionStructure = await usersCollection.add(
          addUserPayload
        );

        if (addUserRes) {
          registerUserRes = addUserRes;
          isRegisterUserSuccess = true;
          authLogger.debug(
            `auth.route - new account created: ` + userInformation.userName
          );
        }
      }
    }

    return { success: isRegisterUserSuccess, response: registerUserRes };
  };
}

const authService = new AuthService();

export default authService;
