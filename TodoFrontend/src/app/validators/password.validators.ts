import { AbstractControl } from "@angular/forms";

export function passwordValidators(cntrl:AbstractControl):{[key:string]:any}|null{

    const password = cntrl.get('password')?.value;
    const confirmPassword = cntrl.get('confirmPassword')?.value;
    if(!password || !confirmPassword){
        return null;
    }
      if(password != confirmPassword){
        return {'mustMatch':true};
    }
    return null;

}