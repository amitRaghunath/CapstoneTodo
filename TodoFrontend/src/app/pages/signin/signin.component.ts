import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from 'src/app/model/userFile';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { emailValidator } from 'src/app/validators/email';
import { passwordValidators } from 'src/app/validators/password.validators';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

   
  //property for setting profile img
  url:string='../../../assets/user-file.jpg';
  

  //property for adding profile picture
  // userFile1:any = File;
  // userFile2:any = File;

  //injecting snakbar domsanitizer, form builder, and user registration service
  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;

  constructor(private snak:MatSnackBar, 
    private sanitizer:DomSanitizer, 
    private fb:FormBuilder, 
    private user_reg:UserRegistrationService,
    private breakpointObserver: BreakpointObserver,
    private usr:UserRegistrationService
    )
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
    otp1:boolean = false;
    otp2:boolean=false;

    // defining structure of signin form
  signInForm = this.fb.group({
    profile:[''],
    fullname:['',[Validators.required]],
    email:['',[Validators.required, Validators.email,emailValidator()]],
    contact:['',[Validators.required,Validators.pattern(/^[789]\d{9}$/)]],
    password:['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]],
    confirmPassword:['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]]
  },{validators:passwordValidators});

  // function to select file from system
  onFileSelect(file:any)
  {
  if(file.target.files){
    const reader=new FileReader();

    reader.readAsDataURL(file.target.files[0]);
    console.log("Inside Onfile");
   
    reader.onload=(event:any)=>{
      this.url=event.target.result;
    }
  }

}


// otp3:any;
// enterOtp(otp:any)
// {
//   if(otp==this.otp3)
//   {
//     this.otp2=true;
//     Swal.fire("Success","Otp Verified ", "success");
//   }
//   else
//   {
    
//     this.otp2=false;
    
//   }
// }


// generateOtp()
// {
//   this.usr.otpSend(this.signInForm.value.email).subscribe
//   (data=>
// {
//       console.log(data)
//       this.otp3=data
//       Swal.fire("Success","Otp Sent On Your Email Id", "success");
// });
//   this.otp1=true;
// }

 
// function to submit registraiton form 
onSubmit(){
    this.user_reg.registerUser({
      profile:this.url,
      fullname:this.fullname?.value,
      email:this.email?.value,
      contact:this.contact?.value,
      password:this.password?.value,
      confirmPassword:this.confirmPassword?.value
    }).subscribe({
      next:(data:any)=>
      {
        console.log(data)
     
        Swal.fire('Success',
      'You Have Sign Up Succesfully',
       'success')
      },error:err=>
      {
        this.snak.open(
          "Something Went Wrong Seems Already Registered !!", "Ok",{
            duration:3000,
          });
      }
    })
}

// defining getters to set validations

get fullname(){
  return this.signInForm.get('fullname');
} 

get email(){
  return this.signInForm.get('email');
} 

get password(){
  return this.signInForm.get('password');
} 

get confirmPassword(){
  return this.signInForm.get('confirmPassword');
} 

get contact()
{
  return this.signInForm.get('contact');
}


hidebutton:boolean=false
openForm:boolean=false
showOtpField:boolean=false
otp:any
checkEmail(emailid:any){
  if(emailid)
  {
      this.hidebutton = true;
  }
  else if(!emailid)
  {
    this.hidebutton = false;
  }
}

sentOtp(emailId:string){
   this.usr.otpSend(emailId).subscribe(
    response=>{
     this.otp = response;
     console.log(this.otp);
     if(this.otp){
     this.showOtpField = true;
     Swal.fire(
      'Success',
      'Otp Sent On Your Mail Successfully!',
      'success'
    )
     }else{
      this.showOtpField = false;
     }
    }
   )
}

verifyOtp(otp:string){
  if(this.otp == otp){
    this.openForm = true;
  }else{
    this.openForm = false;
  }
}

}
