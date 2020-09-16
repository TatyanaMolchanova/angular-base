import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay } from 'rxjs/operators';
import {Todo, TodosService} from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  todos: Todo[] = [];
  todoTitle = '';
  loading = false;
  error = '';

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.fetchTodos();
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return;
    }

    this.todosService.addTodo({
      title: this.todoTitle,
      completed: false
    }).subscribe(todo => {
        this.todos.push(todo);
        this.todoTitle = '';
    });

  }

  fetchTodos() {
    this.loading = true;
    this.todosService.fetchTodos()
      .subscribe(todos => {
        this.todos = todos;
        this.loading = false;
      }, error => {
        this.error = error.message;
      });
  }

  removeTodo(id: number) {
    this.todosService.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id);
      });
  }

  completeTodo(id: number) {
    this.todosService.completeTodo(id).subscribe(todo => {
      // console.log('todo ', todo);
      // todo = JSON.parse(todo);
      this.todos.find(t => t.id === todo.id).completed = true;
    });
  }
}




























// Todo
// import { Component, OnInit } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { delay } from 'rxjs/operators';

// export interface Todo {
//   completed: boolean;
//   title: string;
//   id?: number;
// }

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnInit {

//   todos: Todo[] = [];
//   todoTitle = '';
//   loading = false;

//   constructor(private http: HttpClient) {}

//   ngOnInit() {
//     this.fetchTodos();
//   }

//   addTodo() {
//     if (!this.todoTitle.trim()) {
//       return;
//     }

//     const newTodo: Todo = {
//       title: this.todoTitle,
//       completed: false
//     };

//     this.http.post<Todo>('https://jsonplaceholder.typicode.com/todos', newTodo)
//       .subscribe(todo => {
//         console.log('todo ', todo);
//         this.todos.push(todo);
//         this.todoTitle = '';
//       });
//   }

//   fetchTodos() {
//     this.loading = true;
//     this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=2')
//       .pipe(delay(1500))
//       .subscribe(todos => {
//         this.todos = todos;
//         this.loading = false;
//       });
//   }

//   removeTodo(id: number) {
//     this.http.delete<void>(`https://jsonplaceholder.typicode.com/todos/${id}`)
//       .subscribe(() => {
//         this.todos = this.todos.filter(t => t.id !== id);
//       });
//   }
// }




// RxJS part 3

// import { Component } from '@angular/core';
// import { Subscription, Subject } from 'rxjs';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {

//   sub: Subscription;

//   stream$: Subject<number> = new Subject<number>();
//   counter = 0;

//   constructor() {
//       this.sub = this.stream$.subscribe(value => {
//         console.log('Subscribe', value);
//       });
//   }
//   stop() {
//     this.sub.unsubscribe();
//   }
//   next() {
//     // this.stream$.next();
//     this.counter++;
//     this.stream$.next(this.counter);
//   }

// }



// RxJS part 2

// import { Component } from '@angular/core';
// import { Subscription, Observable } from 'rxjs';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {

//   sub: Subscription;
  
//   constructor() {

//     const stream$ = new Observable(observer => {
//       setTimeout(() => {
//         observer.next(1);
//       }, 1500);

//       setTimeout(() => {
//         observer.complete();
//       }, 2100);

//       setTimeout(() => {
//         observer.error('Something went wrong');
//       }, 2000);

//       setTimeout(() => {
//         observer.next(2);
//       }, 2500);

//     });

//     this.sub = stream$
//       .subscribe(
//         value => console.log('Next ', value),
//         error => console.log('Error ', error),
//         () => console.log('Complete')
//       );
   
//   }

//   stop() {
//     this.sub.unsubscribe();
//   }

// }






// RxJS part 1

// import { Component } from '@angular/core';
// import { interval, Subscription } from 'rxjs';
// import { map, filter, switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {

//   sub: Subscription;
  
//   constructor() {

//     const intervalStream$ = interval(1000);

//     this.sub = intervalStream$
//     .pipe(
//       filter(value => value % 2 === 0),
//       map((value) => `Mapped value ${value}`),
//       // switchMap(() => interval(500))
//     )
//     .subscribe((value) => {
//       console.log(value);
//     });
//   }

//   stop() {
//     this.sub.unsubscribe();
//   }

// }
