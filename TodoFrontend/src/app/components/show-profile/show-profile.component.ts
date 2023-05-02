import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from 'src/app/services/user-registration.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent implements OnInit{

  constructor(private user_reg:UserRegistrationService){} 

  usersData:any;
  userProfile:any;

  ngOnInit(): void {
     this.usersData = this.user_reg.getUser();
     this.userProfile = this.usersData.profile;
  }

}
