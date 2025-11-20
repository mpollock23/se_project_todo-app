import { initialTodos, validationConfig } from "../utils/constants.js";
import { FormValidator } from "../components/FormValidator.js";
import { Todo } from "../components/Todo.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoForm = document.querySelector(".popup__form");

// instantiating classes

const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const todoSection = new Section({
  items: initialTodos,
  renderer: (items) => {
    const todo = new Todo(items, "#todo-template", todoCounter);
    todoSection.addItem(todo.getView());
  },
  containerSelector: ".todos__list",
});

const todoSubmit = new PopupWithForm("#add-todo-popup", (inputs) => {
  const name = inputs.name;
  const dateInput = inputs.date;
  const date = new Date(dateInput);
  date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
  const id = uuidv4();
  const values = { name, date, id };
  const todo = new Todo(values, "#todo-template", todoCounter);
  todoSection.addItem(todo.getView());
  todoSubmit.close();
  formValidator.resetValidation();
  todoCounter.updateTotal(true);
});

const formValidator = new FormValidator(validationConfig, addTodoForm);

// initial page rendering
addTodoButton.addEventListener("click", () => {
  todoSubmit.open();
});
todoSection.renderItems();
todoSubmit.setEventListeners();
formValidator.enableValidation();
