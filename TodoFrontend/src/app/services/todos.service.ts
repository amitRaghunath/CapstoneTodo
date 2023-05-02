import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category, Todo } from '../datatypes/datatypes';

@Injectable({
  providedIn: 'root'
})
export class TodosService {


  //defining base url
  base_url = "http://localhost:8095/userTodo";

  //defining url for archive service

  archive_url = "http://localhost:8095/archiveService";

  // injecting http client 
  constructor(private http:HttpClient) { }

 
  // function to add todos
  public addTodoList(task:Object){
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('token')
    });
    let requestOption= {headers:httpHeaders}
     return this.http.post(`${this.base_url}/addTodo`, task, requestOption);
  }

  // function to get all the todos
  public getAllTasks(){
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('token')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.get<Todo[]>(`${this.base_url}/todos`, requestOption);
  }

//  function add categories  
  public addTodosCategory(category:Object){
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('token')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.post(`${this.base_url}/addCategory`, category, requestOption);
  }

//  function to add todos in category
  public addTodosIntoCategory(todoTask:Object, category:string){
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('token')
    });
    let requestOption= {headers:httpHeaders}
   return this.http.post(`${this.base_url}/addTodoIntoCategory/${category}`, todoTask, requestOption);
  }

  // function to get all categories
  public getAllCategories(){
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('token')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.get<Category[]>(`${this.base_url}/categories`, requestOption);
  }

  // function to get todos from category
  public getTodosFromCategory(categoryId:string){
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('token')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.get<Todo[]>(`${this.base_url}/getTodosOfCategory/${categoryId}`, requestOption);
  }

  //function to get todo using todo id
  // public getTodosAsPerId(todoId:string){
  //   let httpHeaders=new HttpHeaders({
  //     'Content-Type':'application/json',
  //     Authorization :'Bearer '+localStorage.getItem('token')
  //   });
  //   let requestOption= {headers:httpHeaders}
  //   return this.http.get<Todo>(`${this.base_url}/getSingleTodo/${todoId}`, requestOption);
  // }

  //function to add todos in archive 
   public addTodoIntoArchieve(todoDetails:any){
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('token')
    });
    let requestOption= {headers:httpHeaders}
      return this.http.post(`${this.archive_url}/addArchivedTodo`, todoDetails, requestOption);
   }

   //function to get User By its id
   public getById()
   {
     let httpHeaders=new HttpHeaders({
       'Content-Type':'application/json',
       Authorization :'Bearer '+localStorage.getItem('token')
     });
     let requestOption= {headers:httpHeaders}
     return this.http.get(this.base_url+"/current-user",requestOption);
   }

   //function to update todos
   public updateTodosDetails(todoId:string, todo:any){
    let httpHeaders=new HttpHeaders({
      'Content-Type':'application/json',
      Authorization :'Bearer '+localStorage.getItem('token')
    });
    let requestOption= {headers:httpHeaders}
    return this.http.put(`${this.base_url}/updateTodo/${todoId}`, todo, requestOption);
   }

      //function to delete todos
      public deleteTodos(todoId:string)
      {
        let httpHeaders=new HttpHeaders({
          'Content-Type':'application/json',
          Authorization :'Bearer '+localStorage.getItem('token')
        });
        let requestOption= {headers:httpHeaders}
        return this.http.delete(`${this.base_url}/deleteTodo/${todoId}`, requestOption);
       }


         //function to get todos from archive database
      public getTodosFromArchieve()
      {
        let httpHeaders=new HttpHeaders({
          'Content-Type':'application/json',
          Authorization :'Bearer '+localStorage.getItem('token')
        });
        let requestOption= {headers:httpHeaders}
        return this.http.get(this.archive_url+"/allTodos", requestOption);
       }

//function to add Todo in Completed List

public addTodosIntoCompleted(task:Todo)
{
  let httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    Authorization :'Bearer '+localStorage.getItem('token')
  });
  let requestOption= {headers:httpHeaders}
   return this.http.post(`${this.archive_url}/addCompletedTodos`, task, requestOption);
}

//function add to todos into archived list

public addTodosIntoArchived(task:Todo)
{
  let httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    Authorization :'Bearer '+localStorage.getItem('token')
  });
  let requestOption= {headers:httpHeaders}
   return this.http.post(`${this.archive_url}/addArchivedTodo`, task, requestOption);
}

//function to show completed task

public showCompletedTask(){
  let httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    Authorization :'Bearer '+localStorage.getItem('token')
  });
  let requestOption= {headers:httpHeaders}
  return this.http.get<Todo[]>(`${this.archive_url}/completedTodos`, requestOption);
 }

  //function to show Archived task

 public showArchivedTask(){
  let httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    Authorization :'Bearer '+localStorage.getItem('token')
  });
  let requestOption= {headers:httpHeaders}
  return this.http.get<Todo[]>(`${this.archive_url}/archivedTodos`, requestOption);
 }

 public deleteTodosFromArchived(todoId:string){
  let httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    Authorization :'Bearer '+localStorage.getItem('token')
  });
  let requestOption= {headers:httpHeaders}
  return this.http.delete(`${this.archive_url}/deleteTodo/${todoId}`, requestOption);
 }


 //function to delete category

 public deleteCategory(categoryId:string){
  let httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    Authorization :'Bearer '+localStorage.getItem('token')
  });
  let requestOption= {headers:httpHeaders}
  return this.http.delete(`${this.base_url}/deleteCategory/${categoryId}`, requestOption);
 }

 //function to delete todo from category

public deleteTodoFromCategory(todoId:string,categoryName:string){
let httpHeaders=new HttpHeaders({
  'Content-Type':'application/json',
  Authorization :'Bearer '+localStorage.getItem('token')
});
let requestOption= {headers:httpHeaders}
return this.http.delete(`${this.base_url}/deleteTodoFromCategory/${todoId}/${categoryName}`, requestOption);
}

//function to get todo using todo id
public getTodosAsPerId(todoId:string, categoryname:any){
  let httpHeaders=new HttpHeaders({
    'Content-Type':'application/json',
    Authorization :'Bearer '+localStorage.getItem('token')
  });
  let requestOption= {headers:httpHeaders}
  return this.http.get<Todo>(`${this.base_url}/getSingleTodo/${todoId}/${categoryname}`, requestOption);
}



}
