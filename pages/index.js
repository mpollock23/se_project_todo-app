import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Todo } from "../components/Todo.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopup = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopup.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopup.querySelector(".popup__close");
const todoTemplate = document.querySelector("#todo-template");
const todosList = document.querySelector(".todos__list");

const openModal = (modal) => {
  modal.classList.add("popup_visible");
};

const closeModal = (modal) => {
  modal.classList.remove("popup_visible");
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopup);
});

addTodoCloseBtn.addEventListener("click", () => {
  closeModal(addTodoPopup);
});

const formValidator = new FormValidator(validationConfig, addTodoForm);
formValidator.enableValidation();

addTodoForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = evt.target.name.value;
  const dateInput = evt.target.date.value;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const values = { name, date };
  const todo = new Todo(values, todoTemplate);
  const todoEl = todo.getView();
  todosList.append(todoEl);
  closeModal(addTodoPopup);
  formValidator.resetValidation();
});

initialTodos.forEach((item) => {
  const todo = new Todo(item, todoTemplate);
  const todoEl = todo.getView();
  todosList.append(todoEl);
});
