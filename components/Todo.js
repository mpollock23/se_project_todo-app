export class Todo {
  constructor(data, selector, counter) {
    this._data = data;
    this._selector = selector;
    this._counter = counter;
  }
  _getTemplate() {
    const todoElement = document
      .querySelector(this._selector)
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
    this._todoCheckboxEl.id = this._data.id;
    this._todoLabel.setAttribute("for", this._data.id);
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
      if (this._data.completed) {
        this._counter.updateCompleted(false);
      }
      this._counter.updateTotal(false);
    });
    this._todoCheckboxEl.addEventListener("click", () => {
      this._toggleCheckbox();
    });
  }
  _toggleCheckbox() {
    if (this._data.completed) {
      this._counter.updateCompleted(false);
    } else {
      this._counter.updateCompleted(true);
    }
    this._data.completed = !this._data.completed;
  }
}
