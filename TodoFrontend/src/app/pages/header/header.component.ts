import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

//   
constructor(public dialog: MatDialog,
  private user:UserRegistrationService, 
  private router:Router){}

isLoggedIn:boolean=false;   
users:any;
userProfile:any;
seeDetails:boolean = false;

menuVariable:boolean = false;

menuOption:boolean = false;

menu_icon_variable:boolean = false;

ngOnInit(): void {
 this.isLoggedIn = this.user.isLoggedIn();
 this.users = this.user.getUser();
//  this.userProfile =this.users.profile; 
 this.user.loginStatusSubject.asObservable().subscribe((data:any)=>{
   this.isLoggedIn = this.user.isLoggedIn();
   this.users = this.user.getUser();
 })
}

openMenu(){
  this.menuVariable =! this.menuVariable;
  this.menu_icon_variable =! this.menu_icon_variable;
}

openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
 this.dialog.open(LoginComponent, {
   enterAnimationDuration,
   exitAnimationDuration
 });
}

openDialogSignIn(enterAnimationDuration: string, exitAnimationDuration: string): void {
 this.dialog.open(SigninComponent, {
   enterAnimationDuration,
   exitAnimationDuration
 });
}

logoutUser(){
 this.user.logout();
 this.user.loginStatusSubject.next(false);
 this.router.navigate(['home']);
}
showDetails(){
 if(!this.seeDetails){
  this.seeDetails = true;
 }else{
   this.seeDetails = false;
 }  
}

toAbout(){
document.getElementById("footer")?.scrollIntoView({behavior:"smooth"});
}


toContact(){
document.getElementById("footer")?.scrollIntoView({behavior:"smooth"});
}
}

