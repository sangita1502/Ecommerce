import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseurl ="http://localhost:8081/"

  constructor(private http:HttpClient) { }
  post(api:string,data:any){
    const headers ={'content-type':'application/json'};
    const body= JSON.stringify(data);
    console.log(body);
    return this.http.post(this.baseurl+ api,body,{'headers':headers});
  }


}
