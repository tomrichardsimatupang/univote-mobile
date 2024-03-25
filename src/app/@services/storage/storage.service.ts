import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setSession(key: string, item: any, json=true) {
    if(json) {
      sessionStorage.setItem(key, JSON.stringify(item));
    }else {
      sessionStorage.setItem(key, item);
    }
  }

  getSession(key: string, json=true) {
    try {
      if(json) {
        return JSON.parse(sessionStorage.getItem(key) ?? '');
      }else {
        return sessionStorage.getItem(key);
      }
    }catch(e) {
      return null;
    }
  }

  setLocal(key: string, item: any, json=true) {
    if(json) {
      localStorage.setItem(key, JSON.stringify(item));
    }else {
      localStorage.setItem(key, item);
    }
  }

  getLocal(key: string, json=true) {
    try {
      if(json) {
        return JSON.parse(localStorage.getItem(key) ?? '');
      }else {
        return localStorage.getItem(key);
      }
    }catch(e) {
      return null;
    }
  }

  clearSession() {
    sessionStorage.clear();
  }

}
