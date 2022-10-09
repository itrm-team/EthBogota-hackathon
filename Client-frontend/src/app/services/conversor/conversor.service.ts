import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConversorService {

  constructor() { }

  toBase64(str:any,name:any,type:any) {
    const datos = 'data:'+name+type+';base64,' + btoa(this.toBinary(str))
    return 'data:'+name+type+';base64,' + btoa(this.toBinary(str));
  }

  toBinary(string) {
    const codeUnits = new Uint16Array(string.length);
    for (let i = 0; i < codeUnits.length; i++) {
      codeUnits[i] = string.charCodeAt(i);
    }
    const buf = String.fromCharCode(...new Uint8Array(codeUnits.buffer))
    return buf;
  }
}
