import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from 'src/app/pages/signin/signin.component';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent 
{
  constructor(private dialog:MatDialog){}

  openDialogSignIn(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SigninComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    });
  }
}
