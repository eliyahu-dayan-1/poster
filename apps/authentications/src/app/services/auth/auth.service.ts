import UserInformation from '../../interfaces/data-contracts/UserInformation';
import UsersCollectionStructure from '../../interfaces/data-contracts/UserCollectionStructure';
import {
  passwordCollection,
  blacklistCollection,
  usersCollection,
} from '../collections/collections.service';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthService {
  saltRounds = 10;
  addPassword = async ({ hashPassword, userId }: any) => {
    const addPasswordRes = passwordCollection.add({
      userId,
      password: hashPassword,
    });
    return addPasswordRes;
  };

  getUserById = async (id: string) => {
    return await usersCollection.getById(id);
  };

  logIn = async ({
    hashPassword,
    userId,
  }: {
    hashPassword: string;
    userId: string;
  }): Promise<{ jwt: string; success: boolean }> => {
    let isLoginSuccess = false;
    let userJwt = '';

    const getUserRes = await this.getUserById(userId);
    if (getUserRes) {
      const isPasswordMatch = getUserRes.password === hashPassword;
      const isUserNameMatch = getUserRes.userName === hashPassword;

      const isUserCanLogin = isUserNameMatch && isPasswordMatch;
      if (isUserCanLogin) {
        isLoginSuccess = true;
        // Generate JWT
        userJwt = jwt.sign(getUserRes, 'abcd');
      }
    }

    return { jwt: userJwt, success: isLoginSuccess };
  };
  registerUser = async (userInformation: UserInformation) => {
    let registerUserRes;

    const isAllFieldsFull =
      userInformation.firstName &&
      userInformation.lastName &&
      userInformation.userName &&
      userInformation.phone &&
      userInformation.password;

    if (isAllFieldsFull) {
      const user: UsersCollectionStructure = await usersCollection.query({
        userName: userInformation.userName,
      });
      const userAlreadyExist = !!user;
      if (userAlreadyExist) {
        const hashPassword = await bcrypt.hash(
          userInformation.password,
          this.saltRounds
        );

        const addUserPayload: UsersCollectionStructure = {
          firstName: userInformation.firstName,
          lastName: userInformation.lastName,
          userName: userInformation.userName,
          phone: userInformation.phone,
          password: hashPassword,
          createdAt: Date.now(),
        };

        const addUserRes: any = await usersCollection.add(addUserPayload);

        delete addUserRes.password;
        registerUserRes = addUserRes;
      }
    }

    return registerUserRes;
  };
}

const authService = new AuthService();

export default authService;
