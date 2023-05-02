import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { emailValidator } from 'src/app/validators/email';
import { passwordValidators } from 'src/app/validators/password.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-password-form',
  templateUrl: './new-password-form.component.html',
  styleUrls: ['./new-password-form.component.css']
})
export class NewPasswordFormComponent 
{

  // constructor(private fb:FormBuilder,private usr:UserRegistrationService,private route:Router,private dialog:MatDialog){}
 

  // Update=this.fb.group
  // (
  //   {
  //     email:[""],
  //     password:["",[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]]
  //   }
  // )
  // get email(){
  //   return this.Update.get('email');
  // }

  // get password(){
  //   return this.Update.get('password');
  // }

  // onSubmit()
  // {
  //   if(this.Update.value.email!=="")
  //   {
  //     this.usr.changePassword(this.Update.value.email,this.Update.value).subscribe
  //     ({
  //       next:
        
  //         data=>
  //         {
  //           console.log(data);
  //           this.Update.reset();
  //           this.dialog.closeAll();
  //           Swal.fire('Updated Successfully.!!')
  //           this.route.navigateByUrl("home");
  //         },error:err=>alert("Error")
  //       }
       
  //     )
  //   }
  //   else
  //   {
  //     Swal.fire('Please Enter Your Email ID')
  //   }
   
  // }
  // constructor(private fb:FormBuilder,
  //   private user:UserRegistrationService,
  //   private router:Router,
  //   private dialog:MatDialog
  //   ){}
 
  //  ngOnInit(): void {
  //    throw new Error('Method not implemented.');
  //  }
 
  //  updatePasswordForm = this.fb.group(
  //    {
  //      email:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
  //      password:['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]],
  //      confirmPassword:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]]
  //    }, {validators:passwordValidators}
  //  );
 
  //  onSubmit(){
  //     this.user.changePassword(this.updatePasswordForm.value.email,this.updatePasswordForm.value).subscribe(
  //      response=>{
  //        Swal.fire("Success", "Your Password Changed Sucessfully, Please LogIn", 'success');
  //        this.router.navigate(['home']);
  //        this.dialog.closeAll();
  //      },
  //      error=>{
  //        console.log(error);
  //      }
  //     )
  //  }
 
  //  get password(){
  //    return this.updatePasswordForm.get('password');
  //  }
 
  //  get confirmPassword(){
  //    return this.updatePasswordForm.get('confirmPassword');
  //  }
 
  //  get email(){
  //    return this.updatePasswordForm.get('email');
  //  }
  otp1:boolean = false;

  otp2:boolean = false;

  otp3:any;

  storeEmail:string[] = [];


  allUsers:any;

  constructor(private fb:FormBuilder, private user:UserRegistrationService,
     private dialog:MatDialog, private snak:MatSnackBar, private router:Router){}


     otpVerify=this.fb.group({
      email:['',[Validators.required,Validators.email,emailValidator]],
      password:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]],
      confirmPassword:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]]
    }, {validators:passwordValidators}
     )

     get password(){
      return this.otpVerify.get('password');
    }
  
    get confirmPassword(){
      return this.otpVerify.get('confirmPassword');
    }
  
    get email(){
      return this.otpVerify.get('email');
    }
    openOtp:boolean=false
  ngOnInit(): void {
  
  }
 
  openUpdate:boolean=false
  openEmail:boolean=true
  generateOtp(){
        this.user.otpSend(this.otpVerify.value.email).subscribe(
          response=>{
             this.otp3 = response;
             this.openOtp=true
             console.log(this.otp3);
            Swal.fire("Success","Otp Sent On Your Email Id", "success");
            this.otp1 = true;
          },
          error=>{
              this.snak.open(
            "Provide Valid OTP !!", "Ok",{
              duration:5000,
            });
          }       
       ) }

       verify(){
        Swal.fire('Success',
      'Otp is succesffully verified',
      'success');
        this.openOtp=false
        this.openEmail=false
        this.openUpdate=true
       }
  
   

   enterOtp(otp:string){
     if(otp==this.otp3){
      this.otp2 = true;
     }
   }


   update(){
    this.user.changePassword(this.otpVerify.value, 
     this.otpVerify.value.email).subscribe(
     response=>{
       Swal.fire("Success", "Your Password Changed Sucessfully, Please LogIn", 'success');
       this.router.navigate(['home']);
       this.dialog.closeAll();
     },
     error=>{
       console.log(error);
     }
    )
 }

}
