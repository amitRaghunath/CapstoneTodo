import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Category, Todo } from 'src/app/datatypes/datatypes';
import { TodosService } from 'src/app/services/todos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-todo',
  templateUrl: './update-todo.component.html',
  styleUrls: ['./update-todo.component.css']
})
export class UpdateTodoComponent 
{
  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;
 // defining array for priority
 priorities:string[] = ["High", "Medium", "Low"];

 //defining array to get category details
 categoryDetails:Category[] = [];

 //defining array to get category details
 categoryDetail:Category[] = [];
  
 //defining property store category name
 catName:string ="";
 
 // defining array to store only category name
 availableCategory:string[]=[];

 // defining property to show due date div
 showDateOption:boolean = false;

 // defining property to show reminder date  div
 showReminderDate:boolean = false;

 // defining property to show open priority input div
 openPriorityInput:boolean = false;

 //defining property to show category form
 showCatForm:boolean = false;

 //defining array to get todos
 allTodos:Todo[]=[];

 //defining property to get single todo
 individualTodo:any;

 //defining property to store todo id;
 todoId:any;
   
 //  injecting form builder and todo service
 constructor(private fb:FormBuilder,
   private todo:TodosService, 
  private activeRoute:ActivatedRoute,
  private breakpointObserver: BreakpointObserver)
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

 //getting all the todos & categories
 ngOnInit(): void {
  this.todoId = this.activeRoute.snapshot.paramMap.get('id');
    this.todo.getAllCategories().subscribe(
     response=>{
        this.categoryDetail = response;
        for(let categories of this.categoryDetail){
         this.availableCategory.push(categories.categoryName);
        }
     }
    )
    this.todo.getAllTasks().subscribe(
      result=>{
        this.allTodos=result;
        for(let todo of this.allTodos)
        {
             if(todo.todoId===this.todoId){
              this.individualTodo = todo;
              break;
             }
        }
      }
     )
    
 }

 //  form to add todo
 todoAddForm = this.fb.group(
  {
   todoTitle:['',[Validators.required]],
   todoDesc:[''],
   priorities:[''],
   categoryName:[''],
   dueDate:[''],
   reminderDate:['']
  }
)

// form add category
categoryForm = this.fb.group(
  {
   categoryName:['']
  }
)

// function to add category
addCategory(){
  if(!(this.categoryForm.value.categoryName === null ||
     this.categoryForm.value.categoryName === undefined || 
     this.categoryForm.value.categoryName === "")){
  this.todo.addTodosCategory(this.categoryForm.value).subscribe(
    res=>{
       console.log(res);
    },
    error=>{
      console.log(error);
    }
  )
  }
  }

//  function to update todos
addTodoTask(){
  this.todo.updateTodosDetails(this.todoId, this.individualTodo).subscribe(
    res=>{
      this.addCategory();
      Swal.fire('Success',
      'Your Task Has Been Updated',
      'success')
      setTimeout(()=>{
        this.todo.getAllCategories().subscribe(
          result=>{
            this.categoryDetails = result;
            for(let cat of this.categoryDetails){
              if(cat.categoryName === this.categoryForm.value.categoryName
                || cat.categoryName === this.todoAddForm.value.categoryName
                ){
               this.catName = cat.categoryName;
              }
            }
          }
         )
      }, 2000)

       setTimeout(()=>{
        this.todo.addTodosIntoCategory(this.todoAddForm.value, this.catName).subscribe(
          result=>{
            console.log(result);
          },
          error=>{
            console.log(error);
          }
         );

       }, 3000)   
    },
    error=>{
      console.log(error);
    }
  )
  setTimeout(()=>{
     window.location.reload();
  }, 4000)
}

// function to open and close category form
openCatForm(){
  if(!this.showCatForm){
    this.showCatForm = true;
  }else{
    this.showCatForm = false;
  }

}

// function to open and close priorty option
setPriortyOption(){
  if(!this.openPriorityInput){
    this.openPriorityInput = true;
  }else{
    this.openPriorityInput = false;
  }
}

// function to open and close due date option
openDueDateOption(){
  if(!this.showDateOption){
    this.showDateOption = true;
  }else{
    this.showDateOption = false;
  }
}

// function to open and close reminder date option
openReminderDateOption(){
  if(!this.showReminderDate){
    this.showReminderDate = true;
  }else{
    this.showReminderDate = false;
  }
}
}
