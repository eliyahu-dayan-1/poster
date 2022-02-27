import UserInformation from '../interfaces/data-contracts/UserInformation';
import {
  passwordCollection,
  blacklistCollection,
  userCollection,
} from './collections-service';
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
    console.log(userInformation);
    if (userInformation.password) {
      const hashPassword = await bcrypt.hash(
        userInformation.password,
        this.saltRounds
      );
      delete userInformation.password;

      const addUserRes: any = await userCollection.add({
        ...userInformation,
        createdAt: Date.now(),
      });

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
