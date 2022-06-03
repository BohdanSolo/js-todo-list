let addMessage = document.querySelector(".message");
let addButton = document.querySelector(".add");
let todoList = [];
let todo = document.querySelector(".todo");
if (localStorage.getItem("todo")) {
  todoList = JSON.parse(localStorage.getItem("todo")); //Don't forget to get data for parsing. The data is from local storage
  localStorage.setItem("todo", JSON.stringify(todoList));
  displayMessage();
}1

addButton.addEventListener("click", function () {
  if (addMessage.value === "") return;
  let todo = {
    todo: addMessage.value,
    checked: false,
    important: false,
  };
  todoList.push(todo);
  localStorage.setItem("todo", JSON.stringify(todoList));
  displayMessage();
  addMessage.value = "";
});

addMessage.addEventListener("change", function (e) {
  if (addMessage.value === "") return;
  let todo = {
    todo: addMessage.value,
    checked: false,
    important: false,
  };
  todoList.push(todo);
  displayMessage();
  localStorage.setItem("todo", JSON.stringify(todoList));
  addMessage.value = "";
});

function displayMessage() {
  let displayMessage = "";
  if (todoList.length === 0) todo.innerHTML = "";
  todoList.forEach((item, i) => {
    displayMessage += `
    <li class="todo__item" >
    <div>
    <input type="checkbox" id="item__${i}" ${item.checked ? "checked" : ""}>
    <label for="item__${i}" class="${item.important ? "important" : ""}">${
      item.todo
    }</label>
    </div>
    <button class="todo__btn">-</button>
    </li>
    
    `;
    return (todo.innerHTML = displayMessage);
  });
} // Any data of a layout should be wrapped by ${}!!!

todo.addEventListener("change", function (e) {
  let valueLabel = todo.querySelector(
    "[for=" + e.target.getAttribute("id") + "]"
  ).innerHTML;
  todoList.forEach((item) => {
    if (item.todo === valueLabel) {
      item.checked = !item.checked; //Accuracy!!!!
      localStorage.setItem("todo", JSON.stringify(todoList))

    }
  });
});





todo.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  todoList.forEach((item, i) => {
    if (item.todo === e.target.innerHTML) {
      if (e.ctrlKey || e.metaKey) {
        todoList.splice(i, 1);
      } else {
        item.important = !item.important;
      }
    }
    displayMessage();
    localStorage.setItem("todo", JSON.stringify(todoList));
  });
});



todo.addEventListener("click", function (e) {
  if (e.target.classList.contains("todo__btn")) {
    e.target.closest('li').remove()
  }
});

