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

  getMissingImages( checksums: Array<string> ): Array<string> {
    const images = JSON.parse(localStorage.getItem("images") ?? '[]') as Array<string>;
    return checksums.filter( checksum => !images.includes(checksum) );
  }

  removeCacheImages( checksum: Array<string> ) {
    const images = JSON.parse(localStorage.getItem("images") || '[]') as Array<string>;
    const saved = images.filter(image => !checksum.includes(image));
    localStorage.setItem("images", JSON.stringify(saved));
  }

  updateCacheImages( cacheImages: Array<{checksum: string, content: string}> ) {
    const images = JSON.parse(localStorage.getItem("images") || '[]') as Array<string>;
    const add: Array<string> = [];
    cacheImages.forEach((item) => {
      add.push(item.checksum);
      localStorage.setItem(item.checksum, item.content);
    });
    const saved = [...images, ...add];
    localStorage.setItem("images", JSON.stringify(saved));
  }

  getCacheImage( checksum: Array<string> ): Array<any> {
    const images = JSON.parse(localStorage.getItem("images") || '[]') as Array<string>; // [id1, id2];
    const cache = checksum.filter((item: string) => images.includes(item));
    if(cache) {
      return cache.map((image: string) => ({
        checksum: image,
        content: localStorage.getItem(image)
      }));
    }else {
      return [];
    }
  }

}
