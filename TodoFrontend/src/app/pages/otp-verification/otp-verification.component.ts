import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import Swal from 'sweetalert2';
import { NewPasswordFormComponent } from '../new-password-form/new-password-form.component';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp-verification.component.html',
  styleUrls: ['./otp-verification.component.css']
})
export class OtpVerificationComponent implements OnInit
{


//   ngOnInit(): void 
//   {
//     this.getAllUser();
//   }

// otpForm=this.fb.group
// (
//   {
//     email:[""],
//     otp:[""]
//   }
// )

// get email(){
//   return this.otpForm.get('email');
// }

// get otp(){
//   return this.otpForm.get('otp');
// }

// everyUser:any;
// getAllUser()
// {
//   this.usr.getAllUsers().subscribe
//   (
//     {
//       next:
//       data=>
//       {
//         console.log(data);
//         this.everyUser=data;
//       },error:err=>alert("Error")
//     }
//   )
// }

// otpNumber:any;
// sendOtp()
// {
//   // if(this.otpForm.value.email !== "")
  
//     for(let e of this.everyUser)
//     {
//       if(e.email===this.otpForm.value.email && this.otpForm.value.email !== "")
//       {
//         this.usr.otpSend(this.otpForm.value.email).subscribe
//         (
//           data=>
//           {
//             console.log(data);
//            this.otpNumber=data;
//            Swal.fire('An OTP is been send to Your Registered Email Id -_-')
           
//           }
//         )
//         break;
//       }
//       else
//       {
//         Swal.fire('Please Enter Your Registered Email Id -_-')
//       }
//     }
  
// }


// verifyOtp()
// {
//   if(this.otpForm.value.otp !== "")
//   {
    
//     console.log(this.otpForm.value.otp)
//     if(this.otpForm.value.otp == this.otpNumber)
//     {
//       this.dialog.closeAll();
//       const dialogRef=this.dialog.open(NewPasswordFormComponent,
//         {
//           height: '350px',
//           width: '500px',
//         });
//     }
   
//   }
//   else
//   {
//     Swal.fire("Please Enter Your OTP");
//   }
// }




otp1:boolean = false;

  otp2:boolean = false;

  otp3:any;

  storeEmail:string[] = [];


  allUsers:any;

  constructor(private fb:FormBuilder, private user:UserRegistrationService,
     private dialog:MatDialog, private snak:MatSnackBar, private router:Router){}

  ngOnInit(): void {
    this.user.getAllUsers().subscribe(
      response=>{
          this.allUsers = response;
          for(let item of this.allUsers){
            this.storeEmail.push(item.email);
          }
      }
    )
  }
 
  generateOtp(email:string){
    let flag = false;
    for(let item of this.storeEmail){
      if(email===item){
        flag = true;
        break;
      }
    }
      if(flag){
        this.user.otpSend(email).subscribe(
          response=>{
             this.otp3 = response;
             console.log(this.otp3);
            Swal.fire("Success","Otp Sent On Your Email Id", "success");
            this.otp1 = true;
          },
          error=>{
            console.log(error);
          }
         )
      }else{
        this.snak.open(
          "Provide Valid Email !!", "Ok",{
            duration:5000,
          });
      }
   }

   enterOtp(otp:string)
   {
     if(otp==this.otp3)
     {
      this.otp2 = true;
      
     }
   }

  
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void 
  {
    this.dialog.closeAll();
    this.dialog.open(NewPasswordFormComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}
