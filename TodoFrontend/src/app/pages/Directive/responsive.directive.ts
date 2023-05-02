import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appResponsive]'
})
export class ResponsiveDirective {

  constructor(
    private elementRef:ElementRef,
    private breakPointObeserver:BreakpointObserver
  ) { 
    this.breakPointObeserver.observe([Breakpoints.HandsetPortrait, 
      Breakpoints.WebLandscape, Breakpoints.TabletLandscape, Breakpoints.HandsetLandscape,
      Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait,
       Breakpoints.Web, Breakpoints.Tablet, Breakpoints.Handset, Breakpoints.XLarge,
       Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall
    ])
    .subscribe(
      result=>{
        for(let breakpoint of Object.keys(result.breakpoints))
        if(result.breakpoints[breakpoint]){
          if(breakpoint === Breakpoints.XLarge){
          this.elementRef.nativeElement.classList.add('x-large');
          this.elementRef.nativeElement.classList.remove('XSmall');
          this.elementRef.nativeElement.classList.remove('small');
          this.elementRef.nativeElement.classList.remove('medium');
          this.elementRef.nativeElement.classList.remove('large');
          }

          if(breakpoint === Breakpoints.Large){
          this.elementRef.nativeElement.classList.add('large');
          this.elementRef.nativeElement.classList.remove('small');
          this.elementRef.nativeElement.classList.remove('medium');
          this.elementRef.nativeElement.classList.remove('x-large');
          this.elementRef.nativeElement.classList.remove('XSmall');
          }

          if(breakpoint === Breakpoints.Medium){
          this.elementRef.nativeElement.classList.add('medium');
          this.elementRef.nativeElement.classList.remove('XSmall');
          this.elementRef.nativeElement.classList.remove('small');
          this.elementRef.nativeElement.classList.remove('large');
          this.elementRef.nativeElement.classList.remove('x-large');
          }
          
          if(breakpoint === Breakpoints.Small){
          this.elementRef.nativeElement.classList.add('small');
          this.elementRef.nativeElement.classList.remove('XSmall');
          this.elementRef.nativeElement.classList.remove('medium');
          this.elementRef.nativeElement.classList.remove('large');
          this.elementRef.nativeElement.classList.remove('x-large');
          }

          if(breakpoint === Breakpoints.XSmall){
            this.elementRef.nativeElement.classList.add('XSmall');
            this.elementRef.nativeElement.classList.remove('small');
            this.elementRef.nativeElement.classList.remove('medium');
            this.elementRef.nativeElement.classList.remove('large');
            this.elementRef.nativeElement.classList.remove('x-large');
          }
        }
      })

  }

}
