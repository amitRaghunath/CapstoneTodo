import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import Swal from 'sweetalert2';
import { NewPasswordFormComponent } from '../new-password-form/new-password-form.component';
import { OtpVerificationComponent } from '../otp-verification/otp-verification.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;

  //defining property to receve response after login
  resData:any = "";

  // injection snack bar form builder user registration service and router
  constructor(private snack:MatSnackBar, 
    private fb:FormBuilder, 
    private user_service:UserRegistrationService, 
    private router:Router, private dialog:MatDialog,
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


    // defining structure of login form
  loginForm = this.fb.group(
    {
    email:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
    password:['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]]
    }
  )

  // function for login
  onSubmit(){
      this.user_service.loginCheck(this.loginForm.value).subscribe(
        (res:any)=>{
          this.resData = res;
          this.user_service.loginUser(this.resData.token);
          console.log("Indise Login OnSubmit")
          console.log(this.resData.token);
          console.log(this.resData.userid);
          Swal.fire('Success',
          'You Have Logged In Succesfully',
          'success')
          this.user_service.getCurrentUser().subscribe(
            (user:any)=>{
              this.user_service.setUser(user);
              this.router.navigate(['userDashboard/taskDetails']);
              this.user_service.loginStatusSubject.next(true);
            }
          )

          // setTimeout(() => {
          //   window.location.reload();
          // }, 2000);
         this.loginForm.reset();
         this.dialog.closeAll();
        },
        (error:any)=>{
          this.snack.open(
            "Invalid Credentials !!", "Ok",{
              duration:3000,
            });
        }
      )
  }

  // defining getter setter to apply validation
  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

  openMatDialog()
  {
    const dialogRef=this.dialog.open(NewPasswordFormComponent,
      {
        // height: '250px'
        width: '500px',
      });
  }

}
