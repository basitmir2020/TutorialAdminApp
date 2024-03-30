import {AbstractControl} from "@angular/forms";

export function dropdownBoxValueChange(c:AbstractControl):{[key:string]:boolean} | null{
  if(c.value === 'default'){
    return {'dropdown':false}
  }
  return null;
}
