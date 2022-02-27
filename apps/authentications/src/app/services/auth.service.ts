import UserInformation from '../interfaces/data-contracts/UserInformation';
import UsersCollectionStructure from '../interfaces/data-contracts/UserCollectionStructure';
import {
  passwordCollection,
  blacklistCollection,
  usersCollection as usersCollection,
} from './collections.service';
import bcrypt from 'bcryptjs';

class AuthService {
  saltRounds = 10;
  addPassword = async ({ hashPassword, userId }: any) => {
    const addPasswordRes = passwordCollection.add({
      userId,
      password: hashPassword,
    });
    return addPasswordRes;
  };
  registerUser = async (userInformation: UserInformation) => {
    let registerUserRes;

    if (
      userInformation.firstName &&
      userInformation.lastName &&
      userInformation.userName &&
      userInformation.phone &&
      userInformation.password
    ) {
      const hashPassword = await bcrypt.hash(
        userInformation.password,
        this.saltRounds
      );

      const addUserPayload: UsersCollectionStructure = {
        firstName: userInformation.firstName,
        lastName: userInformation.lastName,
        userName: userInformation.userName,
        phone: userInformation.phone,
        password: userInformation.password,
        createdAt: Date.now(),
      };

      const addUserRes: any = await usersCollection.add({ addUserPayload });

      const addPasswordRes = this.addPassword({
        userId: addUserRes._id,
        hashPassword,
      });

      // logger.debug(`username: ${userName}`)
      // if (!password || !userName) return Promise.reject('All fields are required')
      // const user = await userService.getByUsername(userName)
      // if (user) return Promise.reject('This username already exists!')
      delete addUserRes.password;
      registerUserRes = addUserRes;
    }

    return registerUserRes;
  };
}

const authService = new AuthService();

export default authService;
