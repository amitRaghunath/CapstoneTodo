import { AbstractControl, ValidatorFn } from "@angular/forms";

export function emailValidator(): ValidatorFn 
{
    return (control: AbstractControl): {[key: string]: any} | null => 
    {
      const email = control.value;
      if (email && (email.endsWith('@gmail.com')||(email.endsWith('@yahoo.com')||(email.endsWith('@rediffmail.com'))||(email.endsWith('@yahoo.in'))||(email.endsWith('@hotmail.com'))||(email.endsWith('@live.com')) || (email.endsWith('@outlook.com')))) ){
        return null;  // email is valid
      } else {
        return {'invalidEmail': true};  // email is invalid
      }
    }
}