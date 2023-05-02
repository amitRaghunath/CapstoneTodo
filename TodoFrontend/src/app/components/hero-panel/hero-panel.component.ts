import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SigninComponent } from 'src/app/pages/signin/signin.component';

@Component({
  selector: 'app-hero-panel',
  templateUrl: './hero-panel.component.html',
  styleUrls: ['./hero-panel.component.css']
})
export class HeroPanelComponent 
{
  constructor(private dialog:MatDialog){}

  openDialogSignIn(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(SigninComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

}
