import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/datatypes/datatypes';
import { TodosService } from 'src/app/services/todos.service';
 
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  //defining array to store all categories
  allCategoryDetails:Category[] = [];

  // defining property to show priority option
  showPriorites:boolean = false;

  //defining property to show category div
  showCategoryDiv:boolean = false;

 
  
//injecting todo serivce
  constructor(private todo:TodosService){}
  menuVariable:boolean=false;
  menu_icon_variable:boolean=false;
  //get all the categories
  ngOnInit(): void {
    this.todo.getAllCategories().subscribe(
      response=>{
          this.allCategoryDetails = response;
      }
     )
  }
  openMenu(){
    this.menuVariable =! this.menuVariable;
  }

  // function to show and hide priority div
  showPriorityDiv(){
    if(!this.showPriorites){
      this.showPriorites = true;
    }else{
      this.showPriorites = false;
    }
  }

  //function get category and match
  // categoryDetails(data:string){
  //   let result:boolean = false;
  //     let catName = '';
  //     for(let item of this.allCategoryDetails){
  //        if(item.categoryName === data){
  //          result = true;
  //          catName = item.categoryName;
  //          break;
  //        }
  //       }
  //     }
   
  // function to show and hide category div
  openCategoryDiv(){
    if(!this.showCategoryDiv){
      this.showCategoryDiv = true;
    }else{
      this.showCategoryDiv = false;
    }
  }

}
