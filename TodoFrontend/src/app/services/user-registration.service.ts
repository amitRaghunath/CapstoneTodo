import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {

  constructor(private http:HttpClient) { }

  public loginStatusSubject = new Subject<boolean>();

  base_url = "http://localhost:8095/userTodo";

  login_url = "http://localhost:8095/userService";

  //Method to Register User

  registerUser(userDetails:any){
    return this.http.post(`${this.base_url}/register`, userDetails);
  }

  //Method To Login User

  loginCheck(user:any){
    return this.http.post(`${this.login_url}/login`, user);
  }

  //method to Set Token Into Data base

  public loginUser(token:any){
    localStorage.setItem('token', token);
    return true;
}

// method to check user is login or not

isLoggedIn(){
 let token = localStorage.getItem("token");
     if(token == undefined || token == '' || token == null){
      return false;
     }else{
      return true;
     }
}

//method to logout user

logout(){
   localStorage.clear();
  return true;
}

//method to get token

public getToken(){
let token = localStorage.getItem('token');
console.log("Get Tocken "+token);
}

//method to get logged in user

public getCurrentUser(){
let httpHeaders=new HttpHeaders({
  'Content-Type':'application/json',
  Authorization :'Bearer '+localStorage.getItem('token')
});
let requestOption= {headers:httpHeaders}
return this.http.get(this.base_url+"/current-user", requestOption);
}

 //function to get User By its id
 public getById()
 {
   let httpHeaders=new HttpHeaders({
     'Content-Type':'application/json',
     Authorization :'Bearer '+localStorage.getItem('token')
   });
   let requestOption= {headers:httpHeaders}
   return this.http.get(this.base_url+"/current-user",requestOption);
 }

// function to set user into local storage
public setUser(user:any){
  localStorage.setItem('user', JSON.stringify(user));
}

// function to get user form local storage
public getUser(){
  let userStr = localStorage.getItem('user');
  if(userStr != null){
    return JSON.parse(userStr);
  }else{
    this.logout();
    return null;
  }
}

//function to update user
public updateUser(user:any){
  let httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    Authorization :'Bearer '+localStorage.getItem('token')
  });
  let requestOption= {headers:httpHeaders}
  return this.http.put(`${this.base_url}/updateUser`, user, requestOption);
}

public otpSend(emailid:any){
  // let httpHeaders=new HttpHeaders({
  //   'Content-Type':'application/json',
  //   Authorization :'Bearer '+localStorage.getItem('token')
  // });
  // let requestOption= {headers:httpHeaders}
  return this.http.get(this.base_url+"/otp/"+emailid);
}

public changePassword(id:any,data:any)
{
  return this.http.put(this.base_url+"/update/"+id,data);
}

public enquiry(data:any)
{
  return this.http.post(this.base_url+"/enquiry/",data);
}

public getAllUsers()
{
  return this.http.get(this.base_url+"/allUser");
}


}
