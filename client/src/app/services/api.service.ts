import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BindingFlags } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(public http: HttpClient) { }

  get_host(){
    if(window.location.hostname == "localhost"){
      return "http://localhost:3000/";
    } else {
      return window.location.hostname + "/";
    }
  }

  get(path) {
    var endpoint = this.get_host() + path;
    
    return this.http.get(endpoint);
  }

  post(path, body){
    var endpoint = this.get_host() + path;

    return this.http.post(endpoint, body);
  }

  delete(path){
    var endpoint = this.get_host() + path;

    return this.http.delete(endpoint);
  }

  update(path, body){
    var endpoint = this.get_host() + path;

    return this.http.put(endpoint, body);
  }
}
