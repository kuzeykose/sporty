import { SigninResponse } from '../types/auth';

export const LocalStorageAuth = {
  setUserToken: (signin: SigninResponse) => {
    localStorage.setItem('sporty-cred', JSON.stringify(signin));
  },
  getUserToken: () => {
    const userCred = localStorage.getItem('sporty-cred');
    if (userCred) {
      return JSON.parse(userCred);
    }
  },
  deleteUserToken: () => {
    localStorage.removeItem('sporty-cred');
  },
};
