import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
  }

  public async set(key: string, value: any) {
    return this.storage.set(key, value);
  }

  public async get(key: string){
      return this.storage.get(key);
  }

  public async remove(key: string){
      return this.storage.remove(key);
  }

  public async getKeys(){
      return this.storage.keys();
  }

  public async removeAll(){
    return this.storage.clear();
  }

  public getMemo(){
    return {
      CURRENT_USER: "current_user",
      TOKEN_KEY: 'access_token',
      WALLET: 'WALLET',
      GUARDIANS: 'GUARDIANS',
    }
  }

}