// This class represents a todo item and its associated
// data: the todo title and a flag that shows whether the
// todo item is done.

class Todo {
  static DONE_MARKER = "X";
  static UNDONE_MARKER = " ";

  constructor(title) {
    this.title = title;
    this.done = false;
  }

  toString() {
    let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
    return `[${marker}] ${this.title}`;
  }

  markDone() {
    this.done = true;
  }

  markUndone() {
    this.done = false;
  }

  isDone() {
    return this.done;
  }

  getTitle() {
    return this.title;
  }
}

// This class represents a collection of Todo objects.
// You can perform typical collection-oriented actions
// on a TodoList object, including iteration and selection.

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  // rest of class needs implementation
  add(todoItem) {
    if (!(todoItem instanceof Todo)) {
      throw new TypeError('can only add Todo objects');
    }
    
    this.todos.push(todoItem);
  }
  
  size() {
    return this.todos.length;
  }
  
  first() {
    return this.todos[0];
  }
  
  last() {
    return this.todos[this.size() - 1];
  }
  
  itemAt(index) {
    this._validateIndex(index);
    return this.todos[index];
  }
  
  _validateIndex(index) {
    if (!this.todos[index]) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }
  
  markDoneAt(index) {
    this._validateIndex(index);
    this.todos[index].markDone();
  }
  
  markUndoneAt(index) {
    this._validateIndex(index);
    this.todos[index].markUndone();
  }
  
  isDone() {
    //My solution which breaks early rather than iterating through whole list
    // for(let idx = 0; idx < this.todos.length; idx ++) {
    //   if (this.todos[idx].isDone() === false) return false;
    // }
    
    // return true;
    
    //LS Solution
    return this.todos.every(todo => todo.isDone());
  }
  
  shift() {
    return this.todos.shift();
  }
  
  pop() {
    return this.todos.pop();
  }
  
  removeAt(index) {
    this._validateIndex(index);
    
    return this.todos.splice(index, 1);
  }
  
  toString() {
    let returnStr = `---- ${this.title} ----\n`;
    this.todos.forEach(todo => returnStr += todo.toString() + '\n');
    return returnStr;
  }
  
  forEach(callback) {
    for (let idx = 0; idx < this.size(); idx += 1) {
      callback(this.todos[idx]);
    }
  }
  
  filter(callback) {
    let filteredTodoList = new TodoList(this.title);
    
    this.forEach(todo => {
      if (callback(todo)) {
        filteredTodoList.add(todo);
      }
    });
    
    return filteredTodoList;
  }
  
  findByTitle(title) {
    return this.filter(todo => todo.getTitle() === title).first();
  }
  
  allDone() {
    return this.filter(todo => todo.isDone());
  }
  
  allNotDone() {
    return this.filter(todo => !todo.isDone());
  }
  
  markDone(title) {
    let firstTitleMatch = this.findByTitle(title);
    if (firstTitleMatch) {
      firstTitleMatch.markDone();
    }
  }
  
  markAllDone() {
    this.forEach(todo => todo.markDone());
  }
  
  markAllUndone() {
    this.forEach(todo => todo.markUndone());
  }
  
  toArray() {
    //I created a deep copy of each object, but I don't think that was necessary
    // let listCopy = [];
    // this.forEach(todo => listCopy.push(JSON.parse(JSON.stringify(todo))));
    // return listCopy;
    
    return this.todos.slice();
  }
}

//Testing-----------------------------------------------------------------------

// let list = new TodoList("Today's Todos");
// console.log(list); // TodoList { title: "Today's Todos", todos: [] }

// let todo1 = new Todo("Buy milk");
// let todo2 = new Todo("Clean room");
// let todo3 = new Todo("Go to the gym");
// let todo4 = new Todo("Go shopping");

// list.add(todo1);
// list.add(todo2);
// list.add(todo3);
// list.add(todo4);
// console.log(list);

// console.log(list.size());  // 4

// console.log(list.first());
// console.log(list.last());

// let emptyList = new TodoList("Empty List");
// console.log(emptyList.first());
// console.log(emptyList.last());

// console.log(list.itemAt(1));

// list.markDoneAt(1);
// console.log(list);

// list.markUndoneAt(1);
// console.log(list);


// console.log(list.isDone()); // false

// list.markDoneAt(0);
// list.markDoneAt(1);
// list.markDoneAt(2);
// list.markDoneAt(3);
// console.log(list.isDone()); // true

// list.markUndoneAt(2);
// console.log(list.isDone()); // false


// console.log(list.shift());
// console.log(list.pop());
// console.log(list);

// console.log(emptyList.shift());
// console.log(emptyList.pop());
// console.log(emptyList);

// // First, let's create some new todos.
// let todo5 = new Todo("Feed the cats");
// let todo6 = new Todo("Study for Launch School");
// list.add(todo5);
// list.add(todo6);
// console.log(list);

// console.log(list.removeAt(2));
// console.log(list.removeAt(0));
// console.log(list.removeAt(1));
// console.log(list);


// list.add(todo1);
// list.add(todo2);
// list.add(todo4);
// list.add(todo5);
// list.add(todo6);
// console.log(`${list}`);

// //For Each test code
// let todo1 = new Todo("Buy milk");
// let todo2 = new Todo("Clean room");
// let todo3 = new Todo("Go to the gym");
// let todo4 = new Todo("Go shopping");
// let todo5 = new Todo("Feed the cats");
// let todo6 = new Todo("Study for Launch School");
// let list = new TodoList("Today's Todos");

// list.add(todo1);
// list.add(todo2);
// list.add(todo3);
// list.add(todo4);
// list.add(todo5);
// list.add(todo6);

// list.forEach(todo => console.log(todo.toString()));

// //filter test code
// let todo1 = new Todo("Buy milk");
// let todo2 = new Todo("Clean room");
// let todo3 = new Todo("Go to the gym");
// let todo4 = new Todo("Go shopping");
// let todo5 = new Todo("Feed the cats");
// let todo6 = new Todo("Study for Launch School");
// let list = new TodoList("Today's Todos");

// list.add(todo1);
// list.add(todo2);
// list.add(todo3);
// list.add(todo4);
// list.add(todo5);
// list.add(todo6);
// todo1.markDone();
// todo5.markDone();

// let doneTodos = list.filter(todo => todo.isDone());
// console.log(doneTodos);

// console.log(list.filter(todo => todo.isDone()).first());


// //new methods test code
// let todo1 = new Todo("Buy milk");
// let todo2 = new Todo("Clean room");
// let todo3 = new Todo("Go to the gym");
// let todo4 = new Todo("Go shopping");
// let todo5 = new Todo("Feed the cats");
// let todo6 = new Todo("Study for Launch School");
// let todo7 = new Todo("Clean room");
// let list = new TodoList("Today's Todos");

// list.add(todo1);
// list.add(todo2);
// list.add(todo3);
// list.add(todo4);
// list.add(todo5);
// list.add(todo6);
// list.add(todo7);
// todo1.markDone();
// todo5.markDone();
// todo7.markDone();
// console.log(list);

// console.log(list.findByTitle('Clean room'));
// console.log(list.findByTitle('Clean roomasdfdas')); //undefined
// console.log(list.allDone());
// console.log(list.allNotDone());

//list.markDone('Clean room');
//list.markAllDone();
//list.markAllUndone();

//console.log(list);

// //test toArray method
// let arrayList = list.toArray();
// arrayList[0]['title'] = 'NO BUY MILK';
// console.log(arrayList);
// console.log(list);


//LS Implementation-------------------------------------------------------------
// // This class represents a todo item and its associated
// // data: the todo title and a flag that shows whether the
// // todo item is done.

// class Todo {
//   static DONE_MARKER = "X";
//   static UNDONE_MARKER = " ";

//   constructor(title) {
//     this.title = title;
//     this.done = false;
//   }

//   toString() {
//     let marker = this.isDone() ? Todo.DONE_MARKER : Todo.UNDONE_MARKER;
//     return `[${marker}] ${this.title}`;
//   }

//   markDone() {
//     this.done = true;
//   }

//   markUndone() {
//     this.done = false;
//   }

//   isDone() {
//     return this.done;
//   }

//   getTitle() {
//     return this.title;
//   }
// }

// // This class represents a collection of Todo objects.
// // You can perform typical collection-oriented actions
// // on a TodoList object, including iteration and selection.

// class TodoList {
//   constructor(title) {
//     this.title = title;
//     this.todos = [];
//   }

//   add(todo) {
//     if (!(todo instanceof Todo)) {
//       throw new TypeError("can only add Todo objects");
//     }

//     this.todos.push(todo);
//   }

//   size() {
//     return this.todos.length;
//   }

//   first() {
//     return this.todos[0];
//   }

//   last() {
//     return this.todos[this.size() - 1];
//   }

//   itemAt(index) {
//     this._validateIndex(index);
//     return this.todos[index];
//   }

//   markDoneAt(index) {
//     this.itemAt(index).markDone();
//   }

//   markUndoneAt(index) {
//     this.itemAt(index).markUndone();
//   }

//   isDone() {
//     return this.todos.every(todo => todo.isDone());
//   }

//   shift() {
//     return this.todos.shift();
//   }

//   pop() {
//     return this.todos.pop();
//   }

//   removeAt(index) {
//     this._validateIndex(index);
//     return this.todos.splice(index, 1);
//   }

//   toString() {
//     let title = `---- ${this.title} ----`;
//     let list = this.todos.map(todo => todo.toString()).join("\n");
//     return `${title}\n${list}`;
//   }

//   forEach(callback) {
//     this.todos.forEach(todo => callback(todo));
//   }

//   filter(callback) {
//     let newList = new TodoList(this.title);
//     this.forEach(todo => {
//       if (callback(todo)) {
//         newList.add(todo);
//       }
//     });

//     return newList;
//   }

//   findByTitle(title) {
//     return this.filter(todo => todo.getTitle() === title).first();
//   }

//   allDone() {
//     return this.filter(todo => todo.isDone());
//   }

//   allNotDone() {
//     return this.filter(todo => !todo.isDone());
//   }

//   markDone(title) {
//     let todo = this.findByTitle(title);
//     if (todo !== undefined) {
//       todo.markDone();
//     }
//   }

//   markAllDone() {
//     this.forEach(todo => todo.markDone());
//   }

//   markAllUndone() {
//     this.forEach(todo => todo.markUndone());
//   }

//   toArray() {
//     return this.todos.slice();
//   }

//   _validateIndex(index) { // _ in name indicates "private" method
//     if (!(index in this.todos)) {
//       throw new ReferenceError(`invalid index: ${index}`);
//     }
//   }
// }
