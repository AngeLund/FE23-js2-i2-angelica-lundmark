import { createBoards, addToBoard, funcTodo } from "./boardUtils";
async function getTasks(){
    const res = await fetch("http://localhost:3000/tasks", {
      method: "GET",
      headers: {
        "Content-type": "application/json"
    }
      // Set the FormData instance as the request body
    })
    let tasks = await res.json();
    createBoards(tasks);
  
}

async function createToDo(event) {
  event.preventDefault();
  const body = {
    task: document.getElementById("text").value,
    category: document.getElementById("job").value,
  };
  try {
    const res = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Set the FormData instance as the request body
      body: JSON.stringify(body),
    });
    const task = await res.json();
    addToBoard(task, funcTodo)
  } catch (e) {
    console.error(e);
  }
}


    
async function moveToInProgress(event, assigned, id) {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/tasks/moveToInprogress/${id}/${assigned}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        }
      });
      let tasks = await res.json();
      createBoards(tasks);
    } catch (e) {
      console.error(e);
    }
  }
  
  async function moveToDone(event, id) {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/tasks/moveToDone/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let tasks = await res.json();
      createBoards(tasks);
  
    } catch (e) {
      console.error(e);
    }
  }
  
  async function remove(event, id) {
    event.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let tasks = await res.json();
      createBoards(tasks);
  
    } catch (e) {
      console.error(e);
    }
  }
  export {getTasks,createToDo,moveToInProgress, moveToDone, remove}