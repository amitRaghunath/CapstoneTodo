import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/datatypes/datatypes';
import { TodosService } from 'src/app/services/todos.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnInit
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

//defining date variable
minDate:any;

//setting values null while setting past date
values:any;

//  injecting form builder and todo service
constructor(private fb:FormBuilder, 
  private todo:TodosService,
  private matSnak:MatSnackBar,
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

//getting all the todos and categories

ngOnInit(): void {
   this.todo.getAllCategories().subscribe(
    response=>{
       this.categoryDetail = response;
       for(let categories of this.categoryDetail){
        this.availableCategory.push(categories.categoryName);
       }
    }
   )
  this.pastDateTime();  
}


//function to configure date
pastDateTime(){
  let tDate = new Date();
  let date:any = tDate.getDate();
  if(date<10){
    date = "0"+date;
  }
  let month:any = tDate.getMonth()+1;
   if(month<10){
    month = "0"+month;
   }
   let year = tDate.getFullYear();
   let hours = tDate.getHours();
   let minutes = tDate.getMinutes();
   this.minDate = year+"-"+month+"-"+date+"T"+hours+":"+minutes;
}

onChange(e:any){
  let todayDate = new Date().getTime();
  let selectedDate = new Date(e).getTime();
  if(todayDate > selectedDate)
  {
    this.values = "";
    this.matSnak.open(
      "Select Valid Date & Time !!", "OK",{
        duration:3000,
      });
  }

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

//  function to add todos
addTodoTask(){
  this.todo.addTodoList(this.todoAddForm.value).subscribe(
    res=>{
      this.addCategory();
      Swal.fire(
        'Success',
        'Your Todo Has been Added Successfully!',
        'success'
      )
      setTimeout(()=>{
        this.todo.getAllCategories().subscribe(
          result=>{
            this.categoryDetails = result;
            for(let cat of this.categoryDetails){
              console.log(cat.categoryName);
              if(cat.categoryName === this.categoryForm.value.categoryName
                || cat.categoryName === this.todoAddForm.value.categoryName
                ){
               this.catName = cat.categoryName;
              }
            }
          }
         )
      }, 1000)

       setTimeout(()=>{
        this.todo.addTodosIntoCategory(this.todoAddForm.value, this.catName).subscribe(
          result=>{
            console.log(result);
          },
          error=>{
            console.log(error);
          }
         );

       }, 2000)   
    },
    error=>{
      console.log(error);
    })
    setTimeout(()=>{
      this.todoAddForm.reset();
    }, 2500)
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


// function to open and close reminder date option
openReminderDateOption(){
  if(!this.showReminderDate){
    this.showReminderDate = true;
  }else{
    this.showReminderDate = false;
  }
}

}

