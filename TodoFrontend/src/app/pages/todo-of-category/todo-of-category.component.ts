import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/datatypes/datatypes';
import { TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'app-todo-of-category',
  templateUrl: './todo-of-category.component.html',
  styleUrls: ['./todo-of-category.component.css']
})
export class TodoOfCategoryComponent
{
  
  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;
      // defining array to get all the todos
      todos:any;

      // defining property to store individual todo
      individualTodo:undefined | Todo;
    
      //injecting activate route and todo service
      constructor(private activeRoute:ActivatedRoute, private todo:TodosService,private breakpointObserver: BreakpointObserver)
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
    
      //getting todos
      ngOnInit(): void {
        let todoid = this.activeRoute.snapshot.paramMap.get('todoid');
        let categoryid=this.activeRoute.snapshot.paramMap.get('Catname')
        console.log(todoid)
        console.log(categoryid)
        todoid && this.todo.getTodosAsPerId(todoid,categoryid).subscribe(
          result=>{
             this.individualTodo =result;
             console.log(this.individualTodo)
            //  for(let todo of this.todos){
            //   if(todo.todoId === todoid){
            //     this.individualTodo = todo;
            //     break;
            //   }
            //  }
          }
         )
      }
}
