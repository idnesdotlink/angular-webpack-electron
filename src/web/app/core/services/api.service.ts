import { Injectable } from '@angular/core';

@Injectable()
export class ApiService {
  constructor() {
    console.log('built api service');
  }
  logging(msg: string) {
    return msg;
  }
}
