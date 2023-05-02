import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Category } from 'src/app/datatypes/datatypes';
import { TodosService } from 'src/app/services/todos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit
{
  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;
//defining array to get all Categories
allCategoryDetails:Category[] = [];

//showing msg while no category available
showWelcomeMsg:boolean = false;

///showing div container
showCategoryContainer:boolean = false;

pageSlice:any;


//  injecting form builder and todo service
constructor
( 
  private fb:FormBuilder, private todo:TodosService,
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

//getting all categories
ngOnInit(): void {
  this.getAllCategory();
}

getAllCategory(){
  this.todo.getAllCategories().subscribe(
    response=>{
        this.allCategoryDetails = response;
        this.pageSlice = this.allCategoryDetails.slice(0, 6)
        if(this.allCategoryDetails === null){
          this.showWelcomeMsg = true;
        }else if(this.allCategoryDetails !== null){
         this.showCategoryContainer = true;
        }
    }
   )
}

// defining structure of add category form
categoryForm = this.fb.group(
  {
  categoryName:['',[Validators.required]]
  }
)

// function to create categories
addCategories(){
   this.todo.addTodosCategory(this.categoryForm.value).subscribe(
    result=>{
      Swal.fire(
        'Success',
        'Your Category Has been Created Successfully!',
        'success'
      )
      this.getAllCategory();
    },
    error=>{
      this.snak.open(
        "Something went wrong !!", "Ok",{
          duration:3000,
        });
    }
   )
   this.categoryForm.reset();
}

deleteCategory(categoryId:string){
  this.todo.deleteCategory(categoryId).subscribe(
    response=>{
      Swal.fire(
        "success",
        "Your Category has been Deleted Sucessfully",
        "success"
      )
      this.getAllCategory();
    },
    error=>{
      console.log(error);
    }
  )
}

onPageChange(event:PageEvent){
  console.log(event);
   const startIndex = event.pageIndex*event.pageSize;
   let endIndex = startIndex + event.pageSize;
   if(endIndex > this.allCategoryDetails.length){
    endIndex = this.allCategoryDetails.length;
   }
   this.pageSlice = this.allCategoryDetails.slice(startIndex, endIndex);
}
   
 
}
