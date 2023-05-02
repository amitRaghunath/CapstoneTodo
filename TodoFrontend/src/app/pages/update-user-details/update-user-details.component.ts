import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { passwordValidators } from 'src/app/validators/password.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user-details',
  templateUrl: './update-user-details.component.html',
  styleUrls: ['./update-user-details.component.css']
})
export class UpdateUserDetailsComponent implements OnInit
{
  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;
   //property for setting profile img
   url:string='../../../assets/user-file.jpg';
  

   //property for adding profile picture
   userFile1:any = File;
   userFile2:any = File;
 
   //injecting snakbar domsanitizer, form builder, and user registration service
   constructor(private snak:MatSnackBar, 
     private sanitizer:DomSanitizer, 
     private fb:FormBuilder, 
     private user_reg:UserRegistrationService,
     private activeRoute:ActivatedRoute,
     private route:Router,
     private breakpointObserver: BreakpointObserver)
     {
      this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Large])
      .subscribe({
        next: (result: any) => {
          for (let breakpoint of Object.keys(result.breakpoints))
            if (result.breakpoints[breakpoint]) {
              if (breakpoint === Breakpoints.XSmall){
                this.iphoneMode = true;
                this.smartPhoneMode = false;
                this.tabletMode = false;
                this.pcMode = false;
              }
  
              if (breakpoint === Breakpoints.Small){ 
                this.smartPhoneMode = true;
                this.tabletMode = false;
                this.iphoneMode = false;
                this.pcMode = false;
              }
  
              if (breakpoint === Breakpoints.Medium){ 
                this.smartPhoneMode = false;
                this.tabletMode = true;
                this.iphoneMode = false;
                this.pcMode = false;
              }
              if (breakpoint === Breakpoints.Large){ 
                this.smartPhoneMode = false;
                this.pcMode = true;
                this.tabletMode = false;
                this.iphoneMode = false;
              }
            }
        },
      });
     }

     users:any;
  ngOnInit(): void 
  {
    this.activeRoute.snapshot.paramMap.get('id');
    this.users = this.user_reg.getUser();
    this.url=this.users.profile;
  }
 
     // defining structure of signin form
     Update = this.fb.group({
     profile:[''],
     fullname:['',[Validators.required]],
     email:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
     contact:['',[Validators.required,Validators.pattern(/^[789]\d{9}$/)]]
    
   });
 
   // function to select file from system
   onFileSelect(file:any){
   if(file.target.files){
     const reader=new FileReader();
     reader.readAsDataURL(file.target.files[0]);
     reader.onload=(event:any)=>{
       this.url=event.target.result;
     }
   }
   const filedata=file.target.files[0];
   console.log(filedata);
   console.log(file);
 }
  
 // function to submit registraiton form 
 onSubmit(){
     this.user_reg.updateUser({
       profile:this.url,
       fullname:this.fullname?.value,
       email:this.email?.value,
       contact:this.contact?.value
     }).subscribe({
       next:(data:any)=>{
         this.user_reg.setUser(data);
      
         Swal.fire('Success',
       'Updated Succesfully',
        'success')
        this.route.navigate(["userDashboard/show-profile"])
        this.user_reg.loginStatusSubject.next(true);
        
       }
     })
 }
 
 // defining getters to set validations
 
 get fullname(){
   return this.Update.get('fullname');
 } 
 get profile(){
  return this.Update.get('profile');
} 
 
 get email(){
   return this.Update.get('email');
 }  
  
 
 get contact()
 {
   return this.Update.get('contact');
 }

}
