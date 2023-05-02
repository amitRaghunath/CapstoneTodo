import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRegistrationService } from 'src/app/services/user-registration.service';
import { emailValidator } from 'src/app/validators/email';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent 
{
  constructor(private fb:FormBuilder,private usr:UserRegistrationService){}
  moveToHeader()
  {
    document.getElementById("header")?.scrollIntoView({behavior:"smooth"});
  }

  footerForm=this.fb.group
  (
    {
      emailid:[''],
      messageBody:['']
    }
  );

  get email(){
    return this.footerForm.get('emailid');
  } 
  get message(){
    return this.footerForm.get('messageBody');
  } 
 
  sendData()
  {
    this.usr.enquiry(this.footerForm.value).subscribe
    (
      data=>
      {
          console.log(data);
      }
    )
  }

}
