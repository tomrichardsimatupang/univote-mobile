import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WsConstant } from './ws.constant';
import { StorageService } from '../storage/storage.service';
import { Observable, of, throwError } from 'rxjs';

export interface SignInPayload {
  username: string,
  password: string
}

export interface UserData {
  userId: string,
  userName: string,
  userRole: string,
  userPhone: string,
  userEmail: string,
  facultyId: string,
  facultyName: string,
  majorId: string,
  majorName: string,
  accessMenu: Array<string>,
  accessDefault: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData!: UserData;
  accessToken!: string;
  refreshToken!: string;
  validity!: number;

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService
  ) {
    this.loadUserData();
  }

  isLoggedIn() {
    this.loadUserData();
    return this.userData && this.accessToken;
  }

  getUserData() {
    this.loadUserData();
    return this.userData;
  }

  postSignIn( payload: SignInPayload ) {
    return this.http.post( WsConstant.postSignin, payload );
  }

  postSignUp( payload: any ) {
    return this.http.post( WsConstant.postSignup, payload );
  }

  postSignOut( payload: any ) {
    return this.http.post( WsConstant.postSignout, payload );
  }

  postCheckNim( payload: any ) {
    return this.http.post( WsConstant.postCheckNim, payload );
  }

  postTokenVerify(): Observable<any> {
    return this.http.post( WsConstant.postTokenVerify, {});
  }

  saveUserData(userData: any) {
    const { accessToken, refreshToken, validity } = userData;
    userData.accessToken = undefined;
    userData.refreshToken = undefined;
    userData.validity = undefined;
    this.storageService.setSession("userData", userData);
    this.storageService.setSession("accessToken", accessToken, false);
    this.storageService.setSession("refreshToken", refreshToken, false);
    this.storageService.setSession("expireToken", validity, false);
  }

  loadUserData() {
    this.userData = this.storageService.getSession("userData") as UserData;
    this.accessToken = this.storageService.getSession("accessToken", false);
    this.refreshToken = this.storageService.getSession("refreshToken", false);
    this.validity = this.storageService.getSession("validity", false);
  }

  clearLogin() {
    this.storageService.clearSession();
    this.loadUserData();
  }

}
