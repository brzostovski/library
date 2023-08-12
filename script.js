const BOOKS_TABLE = document.querySelector(".books-table-body");
const NEW_BOOK_FORM = document.querySelector("form");
const ADD_BOOK_BUTTON = document.querySelector("#add-book-button");
const CANCEL_BUTTON = document.querySelector("#cancel");
const CONFIRM_BUTTON = document.querySelector("#confirm");

const TABLE_HEADERS = `<tr>
  <th scope="col">Title</th>
  <th scope="col">Author</th>
  <th scope="col">Pages</th>
  <th scope="col">Read?</th>
  </tr>`;
const BOOK_READ_SYMBOL = `✅`;
const BOOK_NOT_READ_SYMBOL = `❌`;

let readBookButtons;
let removeBookButtons;

let myLibrary = [
  (new Book("The Hobbit", "J.R.R Tolkien", 295, 1)),
  (new Book("Carrie", "Stephen King", 200, 1)),
  (new Book("Dzienniki Gwiazdowe", "Stanisław Lem", 300, 1)),
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function toggleRead(book) {
  book["read"] === 1 ? (book["read"] = 0) : (book["read"] = 1);
}

function addBookToLibrary(book, library = myLibrary) {
  library.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function displayBooks(library = myLibrary, table = BOOKS_TABLE) {
  table.innerHTML = TABLE_HEADERS;
  library.forEach((book) => {
    let index = library.indexOf(book);
    let newRow = `<tr data-index="${index}">`;
    for (key in book) {
      switch (key) {
        case "title":
          newRow += `<td><em>${book[key]}</em></td>`;
          break;
        case "read":
          newRow += `<td><button class="book-read" data-index="${index}">`;
          parseInt(book[key]) === 1
            ? (newRow += BOOK_READ_SYMBOL)
            : (newRow += BOOK_NOT_READ_SYMBOL);
          newRow += `</button></td>`;
          break;
        default:
          newRow += `<td>${book[key]}</td>`;
      }
    }
    newRow += `<td>
        <button class="remove-book" data-index="${index}">
          Remove
        </button>
      </td>`;
    table.innerHTML += `${newRow}</tr>`;
  });
  readBookButtons = document.querySelectorAll(".book-read");
  readBookButtonListener();
  removeBookButtons = document.querySelectorAll(".remove-book");
  removeBookButtonListener();
}

function showForm() {
  NEW_BOOK_FORM.classList.remove("hidden");
  ADD_BOOK_BUTTON.classList.add("hidden");
}

function sanitize(string) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
}

function confirmForm() {
  let title = sanitize(document.getElementById("title").value);
  let author = sanitize(document.getElementById("author").value);
  let pages = parseInt(document.getElementById("pages").value);

  let read;
  let readState = document.getElementsByName("read");
  for (button of readState) {
    if (button.checked) {
      read = button.value;
    }
  }

  let newBook = new Book(title, author, pages, read);
  for (key in newBook) {
    switch (key) {
      case "pages":
        if (isNaN(newBook[key])) {newBook[key] = '-'};
        break;
      default:
        if (newBook[key] === "") {
          newBook[key] = "-";
        }
    }
  }

  if (
    newBook["title"] === "-" &&
    newBook["author"] === "-" &&
    newBook["pages"] === "-"
  ) {
    alert('Cannot add book - no usable data was provided');
    return 0;
  } else {
    addBookToLibrary(newBook);
  }
}

function hideForm() {
  NEW_BOOK_FORM.classList.add("hidden");
  ADD_BOOK_BUTTON.classList.remove("hidden");
}

function confirmAction() {
  if (confirm("Are you sure?")) {
    return true;
  } else {
    return false;
  }
}

window.addEventListener("load", () => displayBooks());

ADD_BOOK_BUTTON.addEventListener("click", () => showForm());

CONFIRM_BUTTON.addEventListener("click", () => {
  let formState = confirmForm();
  if (formState === 0) {return 0};

  BOOKS_TABLE.innerHTML = "";
  NEW_BOOK_FORM.reset();
  hideForm();
  displayBooks();
});

CANCEL_BUTTON.addEventListener("click", () => {
  NEW_BOOK_FORM.reset();
  hideForm();
});

function readBookButtonListener() {
  readBookButtons.forEach((button) => {
    button.addEventListener("click", () => {
      let targetBook = myLibrary[button.dataset.index];
      toggleRead(targetBook);
      displayBooks();
    });
  });
}

function removeBookButtonListener() {
  removeBookButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (!confirmAction()) {
        return 0;
      } else {
        let removeIndex = button.dataset.index;
        removeBookFromLibrary(removeIndex);
        displayBooks();
      }
    });
  });
}
