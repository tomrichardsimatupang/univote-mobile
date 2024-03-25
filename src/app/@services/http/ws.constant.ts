import { environment } from "src/environments/environment";

export const WsConstant = {

  postSignin: `${environment.apiUrl}auth-service/v1/voter/login`,
  postSignout: `${environment.apiUrl}auth-service/v1/voter/logout`,
  postTokenVerify: `${environment.apiUrl}auth-service/v1/voter/login/token/verify`,

  postSignup: `${environment.apiUrl}mobile-service/v1/register/voters/signup`,

  postCheckNim: `${environment.apiUrl}mobile-service/v1/register/voters/nim`,

}
