import { environment } from "src/environments/environment";

export const WsConstant = {

  postSignin: `${environment.apiUrl}auth-service/v1/voter/login`,
  postSignout: `${environment.apiUrl}auth-service/v1/voter/logout`,

  postTokenVerify: `${environment.apiUrl}auth-service/v1/voter/login/token/verify`,

  postSignup: `${environment.apiUrl}mobile-service/v1/register/voters/signup`,

  postCheckNim: `${environment.apiUrl}mobile-service/v1/register/voters/nim`,

  getCandidateList: `${environment.apiUrl}mobile-service/v1/vote/candidate/list`,

  postVoteCheckin: `${environment.apiUrl}mobile-service/v1/vote/checkin`,

  postVoteCandidateVoting: `${environment.apiUrl}mobile-service/v1/vote/candidate/voting`,

  getProfilingDetail: `${environment.apiUrl}mobile-service/v1/register/profiling/detail`,

  postProfilingUpdate: `${environment.apiUrl}mobile-service/v1/register/profiling/update`,

  getContentPostList: `${environment.apiUrl}mobile-service/v1/content/post/list`

}
