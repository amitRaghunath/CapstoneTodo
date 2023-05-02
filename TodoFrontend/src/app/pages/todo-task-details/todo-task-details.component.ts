import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/datatypes/datatypes';
import { TodosService } from 'src/app/services/todos.service';
 
@Component({
  selector: 'app-todo-task-details',
  templateUrl: './todo-task-details.component.html',
  styleUrls: ['./todo-task-details.component.css']
})
export class TodoTaskDetailsComponent implements OnInit{
  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;

    // defining array to get all the todos
  todos:undefined | Todo[];

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
    let todoId = this.activeRoute.snapshot.paramMap.get('todoId');
    console.log(todoId)
     todoId && this.todo.getAllTasks().subscribe(
      result=>{
         this.todos = result;
         console.log(this.todos)
         for(let todo of this.todos){
          if(todo.todoId === todoId){
            this.individualTodo = todo;
            break;
          }
         }
      }
     )
  }
 
  

}
