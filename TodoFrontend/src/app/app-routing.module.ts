import { NgModule } from '@angular/core';
import { ChildrenOutletContexts, RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ShowPrioritiesComponent } from './components/show-priorities/show-priorities.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { ShowTaskDetailsComponent } from './components/show-task-details/show-task-details.component';
import { ArchiveComponent } from './pages/archive/archive.component';
import { CompletedTaskComponent } from './pages/completed-task/completed-task.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewPasswordFormComponent } from './pages/new-password-form/new-password-form.component';
import { ShowCategoryDetailsComponent } from './pages/show-category-details/show-category-details.component';
import { SigninComponent } from './pages/signin/signin.component';
import { TodoOfCategoryComponent } from './pages/todo-of-category/todo-of-category.component';
import { TodoTaskDetailsComponent } from './pages/todo-task-details/todo-task-details.component';
import { UpdateTodoComponent } from './pages/update-todo/update-todo.component';
import { UpdateUserDetailsComponent } from './pages/update-user-details/update-user-details.component';
import { UserDashboardComponent } from './pages/user-dashboard/user-dashboard.component';
const routes: Routes = [
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"", redirectTo:"/home", pathMatch:"full"
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'signIn',
    component:SigninComponent
  },
  {
    path:'userDashboard',
    component:UserDashboardComponent,
    children:[
      {
        path:'addTodo',
        component:AddTodoComponent
      },
      {
        path:'taskDetails',
        component:ShowTaskDetailsComponent
      },
      {
        path:'add-category',
        component:AddCategoryComponent
      },
      {
        path:'show-priority',
        component:ShowPrioritiesComponent
      },
      {
        path:'show-profile',
        component:ShowProfileComponent
      },
      {
      path:'todo-details/:todoId',
      component:TodoTaskDetailsComponent
      },
      {
        path:'show-category-details/:name',
        component:ShowCategoryDetailsComponent
      },
      {
        path:'update/:id',
        component:UpdateUserDetailsComponent
      },
      {
        path:'updateTodo/:id',
        component:UpdateTodoComponent
      },
      {
        path:'archivedItem',
        component:ArchiveComponent
      },
      {
        path:'completed',
        component:CompletedTaskComponent
      },
      {
        path:'catTodo/:todoid/:Catname',
        component:TodoOfCategoryComponent
      }

    ]
  },
  {
  path:'password',
  component:NewPasswordFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
