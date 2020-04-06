import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_URL: string = "http://localhost:3000/";

  constructor(public http: HttpClient) { }

  get(path) {
    var endpoint = this.API_URL + path;
    
    return this.http.get(endpoint);
  }

  post(path, body){
    var endpoint = this.API_URL + path;

    return this.http.post(endpoint, body);
  }

  delete(path){
    var endpoint = this.API_URL + path;

    return this.http.delete(endpoint);
  }

  update(path, body){
    var endpoint = this.API_URL + path;

    return this.http.put(endpoint, body);
  }
}
