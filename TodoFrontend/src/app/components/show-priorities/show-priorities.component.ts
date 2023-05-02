import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/datatypes/datatypes';
import { TodosService } from 'src/app/services/todos.service';
 
@Component({
  selector: 'app-show-priorities',
  templateUrl: './show-priorities.component.html',
  styleUrls: ['./show-priorities.component.css']
})
export class ShowPrioritiesComponent implements OnInit
{
  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;
  //receving all to todos
allTodos:Todo[] = [];

//showing msg if no todo available
showWelcomeMsg:boolean = false;

//showing toods
showTodoContainer:boolean = false;

//defining property to apply filter
showDiv:boolean = true;


//storing page slice
 pageSlice:any;

//injecting todo service
constructor(private todos:TodosService,
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


// getting all the todos
ngOnInit(): void {
 this.getAllTodosFromList(); 
}

//function to get All The Todos
getAllTodosFromList(){
this.todos.getAllTasks().subscribe(
 result=>{
   this.allTodos = result;
   this.pageSlice = this.allTodos.slice(0, 6);
    if(this.allTodos === null){
     this.showWelcomeMsg = true;
    }else if(this.allTodos !== null){
     this.showTodoContainer = true;
    }
 }
)    
}


// function to delete todo
deleteTodos(todoId:string){
this.todos.deleteTodos(todoId).subscribe(
result=>{
  this.snak.open("1 Todo Deleted !!", "ok",{
    duration:3000,
  });
  this.getAllTodosFromList();
}
)
}


//function to filter high priority task
highPriorityTodo(){
this.todos.getAllTasks().subscribe({
 next: todos => {
     this.pageSlice = todos.filter(todo => todo.priorities==='High');
 },
 error: e => {
   this.snak.open("Something went Wrong !!", "Ok",{
     duration:3000,
   });
 }
})
}

//function to filter medium priority task
mediumPriorityTodo(){
this.todos.getAllTasks().subscribe({
 next: todos => {
     this.pageSlice = todos.filter(todo => todo.priorities==='Medium');
 },
 error: e => {
   this.snak.open("Something went Wrong !!", "Ok",{
     duration:3000,
   });
 }
})

}

//function to filter low priority task
lowPriorityTodo(){
this.todos.getAllTasks().subscribe({
 next: todos => {
     this.pageSlice = todos.filter(todo => todo.priorities==='Low');
 },
 error: e => {
   this.snak.open("Something went Wrong !!", "Ok",{
     duration:3000,
   });
 }
})  
}



onPageChange(event:PageEvent){
console.log(event);
const startIndex = event.pageIndex*event.pageSize;
let endIndex = startIndex + event.pageSize;
if(endIndex > this.allTodos.length){
endIndex = this.allTodos.length;
}
this.pageSlice = this.allTodos.slice(startIndex, endIndex);
}

//function to getTodos and add into archive

addTodosIntoArchive(todo:Todo, todoId:string){
  this.todos.addTodosIntoArchived(todo).subscribe(
   result=>{
     this.todos.deleteTodos(todoId).subscribe(
       result=>{
         this.snak.open("1 Task Archived !!", "ok",{
           duration:3000,
         });
         this.getAllTodosFromList();
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

 addTodosIntoArchiveCompleted(task:Todo, taskId:string){
  this.todos.addTodosIntoCompleted(task).subscribe(
   result=>{
     this.todos.deleteTodos(taskId).subscribe(
       result=>{
         this.snak.open("1 Task Completed !!", "ok",{
           duration:3000,
         });
         this.getAllTodosFromList();
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
}
