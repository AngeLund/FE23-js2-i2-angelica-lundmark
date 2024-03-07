import { createToDo, getTasks } from "./fetch";
const formCreateTodo = document.getElementById("form");
formCreateTodo.addEventListener('submit', createToDo)
getTasks()