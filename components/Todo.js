import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export class Todo {
  constructor(data, selector) {
    this._data = data;
    this._selector = selector;
  }
  _getTemplate() {
    const todoElement = document
      .querySelector("#todo-template")
      .content.querySelector(".todo")
      .cloneNode(true);
    return todoElement;
  }
  getView() {
    this._element = this._getTemplate();
    this._todoNameEl = this._element.querySelector(".todo__name");
    this._todoCheckboxEl = this._element.querySelector(".todo__completed");
    this._todoLabel = this._element.querySelector(".todo__label");
    this._todoDate = this._element.querySelector(".todo__date");
    this._todoDeleteBtn = this._element.querySelector(".todo__delete-btn");
    this._todoNameEl.textContent = this._data.name;
    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = uuidv4();
    this._todoLabel.setAttribute("for", `${this._todoCheckboxEl.id}`);

    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      this._todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._todoDeleteBtn.addEventListener("click", () => {
      this._element.remove();
    });

    this._todoCheckboxEl.addEventListener("click", () => {
      this._toggleCheckbox();
    });
  }
  _toggleCheckbox() {
    this._data.completed = !this._data.completed;
  }
}
