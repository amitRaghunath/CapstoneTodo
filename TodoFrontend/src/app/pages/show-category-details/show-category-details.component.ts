import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Category, Todo } from 'src/app/datatypes/datatypes';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-show-category-details',
  templateUrl: './show-category-details.component.html',
  styleUrls: ['./show-category-details.component.css']
})
export class ShowCategoryDetailsComponent implements OnInit 
{
  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;
  // defining array for receving todos
allTodosOfCategory:Todo[] = [];

//defining property show div if no any todo is available in category
showWelcomeMsg:boolean = false;

//defining property show container
showMainContainer:boolean = false;

pageSlice:any;

categoryname:any;

 //injecting todo service activated route service
constructor(private todo:TodosService, 
 private activateRoute:ActivatedRoute,
 private snak:MatSnackBar,
 private breakpointObserver: BreakpointObserver
 )
 {
  this.breakpointObserver
    .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Large])
    .subscribe({
      next: (result: any) => {
        for (let breakpoint of Object.keys(result.breakpoints))
          if (result.breakpoints[breakpoint]) {
            if (breakpoint === Breakpoints.XSmall){
              this.iphoneMode = true;
              this.smartPhoneMode = false;
              this.tabletMode = false;
              this.pcMode = false;
            }

            if (breakpoint === Breakpoints.Small){ 
              this.smartPhoneMode = true;
              this.tabletMode = false;
              this.iphoneMode = false;
              this.pcMode = false;
            }

            if (breakpoint === Breakpoints.Medium){ 
              this.smartPhoneMode = false;
              this.tabletMode = true;
              this.iphoneMode = false;
              this.pcMode = false;
            }
            if (breakpoint === Breakpoints.Large){ 
              this.smartPhoneMode = false;
              this.pcMode = true;
              this.tabletMode = false;
              this.iphoneMode = false;
            }
          }
      },
    });
 }

// getting alltodos form category
ngOnInit(): void {
  this.getTodosFromCategories();
   }

   getTodosFromCategories(){
     this.categoryname  = this.activateRoute.snapshot.paramMap.get('name');
     this.categoryname && this.todo.getTodosFromCategory(this.categoryname).subscribe(
        result=>{
          this.allTodosOfCategory = result;
          console.log(this.allTodosOfCategory)
          this.pageSlice = this.allTodosOfCategory.slice(0, 9)
          if(this.allTodosOfCategory===null){
            this.showWelcomeMsg = true;
          }else if(this.allTodosOfCategory !== null){
            this.showMainContainer = true;
          }
        }
       )
   }

//function to getTodos and add into archive

addTodosIntoArchive(todo:Todo, todoId:string){
  this.todo.addTodosIntoArchived(todo).subscribe(
   result=>{
     this.todo.deleteTodoFromCategory(todoId, this.categoryname).subscribe(
       result=>{
         this.snak.open("1 Task Archived !!", "ok",{
           duration:3000,
         });
         this.getTodosFromCategories();
       }
     )
   },
   error=>{
     this.snak.open("Something went Wrong !!", "Ok",{
       duration:3000,
     });
   }
 )
 }
   // function to delete todo
  
deleteTodos(todoId:string){
  console.log(todoId)
  this.todo.deleteTodoFromCategory(todoId, this.categoryname).subscribe(
 result=>{
   this.snak.open("1 Todo Deleted !!", "ok",{
     duration:3000,
   });
   this.getTodosFromCategories();
 }
)
}

addTodosIntoArchiveCompleted(task:Todo, taskId:string){
  this.todo.addTodosIntoCompleted(task).subscribe(
   result=>{
    this.todo.deleteTodoFromCategory(taskId, this.categoryname).subscribe(
      result=>{
        this.snak.open("1 Task Completed !!", "ok",{
          duration:3000,
        });
        this.getTodosFromCategories();
      }
    )
   },
   error=>{
     console.log(error);
     this.snak.open("Something went Wrong !!", "Ok",{
       duration:3000,
     });
   }
  )
}

onPageChange(event:PageEvent){
  const startIndex = event.pageIndex*event.pageSize;
  let endIndex = startIndex + event.pageSize;
  if(endIndex > this.allTodosOfCategory.length){
   endIndex = this.allTodosOfCategory.length;
  }
  this.pageSlice = this.allTodosOfCategory.slice(startIndex, endIndex);
}


}
  
