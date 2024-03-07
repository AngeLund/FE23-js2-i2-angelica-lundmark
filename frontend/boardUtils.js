import { moveToInProgress, moveToDone, remove } from "./fetch";
function resetBoard(board) {
  const ulElement = document.querySelector(`#${board} ul`);
  if (ulElement) {
    ulElement.remove();
  }
  const ulEl = document.createElement("ul");
  document.getElementById(board).appendChild(ulEl);
}

function createBoards(tasks) {
  //rensa brädan först
  resetBoard("todo");
  resetBoard("inprogress");
  resetBoard("done");

  tasks.forEach((task) => {
    const { status } = task;
    if (status === "todo") {
      addToBoard(task, funcTodo);
    } else if (status === "inprogress") {
      addToBoard(task, funcProgress);
    } else {
      addToBoard(task, funcDone);
    }
  });
}

function addToBoard(task, func) {
  const ulElement = document.querySelector(`#${task.status} ul`);
  func(task, ulElement);
}
function funcTodo(todo, ulEl) {
  const formToDo = document.createElement("form");
  const textP = document.createElement("p");
  const buttonEl = document.createElement("button");
  const inputEl = document.createElement("input");

  const liEl = document.createElement("li");
  textP.innerText = todo.task;
  buttonEl.innerText = "Assign >>";
  inputEl.setAttribute("type", "text");
  liEl.classList.add(todo.category);
  ulEl.appendChild(liEl);
  liEl.appendChild(textP);
  formToDo.appendChild(inputEl);
  formToDo.appendChild(buttonEl);
  liEl.appendChild(formToDo);
  formToDo.classList.add("todoForm");
  textP.classList.add("pTo");
  inputEl.classList.add("inputDo");

  formToDo.addEventListener("submit", (e) =>
    moveToInProgress(e, inputEl.value, todo.id)
  );
}

function funcProgress(inprogress, ulEl) {
  const progForm = document.createElement("form");
  const pText = document.createElement("p");
  const buttonEl = document.createElement("button");
  const pEl = document.createElement("p");
  const liEl = document.createElement("li");
  pText.innerText = inprogress.task;
  buttonEl.innerText = "Done >>";
  pEl.innerText = `-${inprogress.assigned}`;
  liEl.classList.add(inprogress.category);
  liEl.appendChild(pText);
  ulEl.appendChild(liEl);
  liEl.appendChild(pEl);
  progForm.appendChild(buttonEl);
  liEl.appendChild(progForm);
  progForm.classList.add("progFor");
  pText.classList.add("progTex");
  buttonEl.classList.add("buttonprog");
  pEl.classList.add("progName");

  progForm.addEventListener("submit", (e) => moveToDone(e, inprogress.id));
}

function funcDone(done, ulDoneEl) {
  const pName = document.createElement("p");
  const pEltext = document.createElement("p");
  const doneForm = document.createElement("form");
  const buttonEla = document.createElement("button");
  const liDoneEl = document.createElement("li");
  pName.innerText = `-${done.assigned}`;
  pEltext.innerText = done.task;
  liDoneEl.classList.add(done.category);
  buttonEla.innerText = "Remove X";
  liDoneEl.appendChild(pEltext);
  liDoneEl.appendChild(pName);
  liDoneEl.appendChild(buttonEla);
  ulDoneEl.appendChild(liDoneEl);
  doneForm.appendChild(buttonEla);
  liDoneEl.appendChild(doneForm);
  doneForm.classList.add("formDo");
  pEltext.classList.add("doneText");
  buttonEla.classList.add("doneButton");
  pName.classList.add("doneName");

  doneForm.addEventListener("submit", (e) => remove(e, done.id));
}
export { resetBoard, createBoards, addToBoard, funcTodo };
