import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appClickEventPropogation]'
})
export class ClickEventPropogationDirective {

  constructor() 
  {

  }
  @HostListener("click", ["$event"])
  public onClick(event: any): void
  {
      event.preventDefault();
  }

}
