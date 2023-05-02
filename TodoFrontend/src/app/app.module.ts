import { importProvidersFrom, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import { SigninComponent } from './pages/signin/signin.component';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import { LoginComponent } from './pages/login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { HeroPanelComponent } from './components/hero-panel/hero-panel.component';
import { FooterComponent } from './pages/footer/footer.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { SearchTodoComponent } from './components/search-todo/search-todo.component';
import { ShowTaskDetailsComponent } from './components/show-task-details/show-task-details.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import {MatListModule} from '@angular/material/list';
import {MatExpansionModule} from '@angular/material/expansion';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ShowPrioritiesComponent } from './components/show-priorities/show-priorities.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import{DateTimePickerModule} from '@syncfusion/ej2-angular-calendars';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TodoTaskDetailsComponent } from './pages/todo-task-details/todo-task-details.component';
import { ShowCategoryDetailsComponent } from './pages/show-category-details/show-category-details.component';
import {MatChipsModule} from '@angular/material/chips';
import { UpdateTodoComponent } from './pages/update-todo/update-todo.component';
import { UpdateUserDetailsComponent } from './pages/update-user-details/update-user-details.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { OtpVerificationComponent } from './pages/otp-verification/otp-verification.component';
import { NewPasswordFormComponent } from './pages/new-password-form/new-password-form.component';
import { CompletedTaskComponent } from './pages/completed-task/completed-task.component';
import { TodoOfCategoryComponent } from './pages/todo-of-category/todo-of-category.component';
import { ResponsiveDirective } from './pages/Directive/responsive.directive';
import { BannerComponent } from './components/banner/banner.component';
import { ClickEventPropogationDirective } from './pages/DirectiveSignin/click-event-propogation.directive';



 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SigninComponent,
    LoginComponent,
    UserDashboardComponent,
    HeroPanelComponent,
    FooterComponent,
    AddTodoComponent,
    SearchTodoComponent,
    ShowTaskDetailsComponent,
    SidebarComponent,
    AddCategoryComponent,
    ShowPrioritiesComponent,
    ShowProfileComponent,
    TodoTaskDetailsComponent,
    ShowCategoryDetailsComponent,
    UpdateTodoComponent,
    UpdateUserDetailsComponent,
    ArchiveComponent,
    OtpVerificationComponent,
    NewPasswordFormComponent,
    CompletedTaskComponent,
    TodoOfCategoryComponent,
    ResponsiveDirective,
    BannerComponent,
    ClickEventPropogationDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatSelectModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DateTimePickerModule,
    NgxMaterialTimepickerModule,
    NgxMaterialTimepickerModule.setLocale('ar-AE'),
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
