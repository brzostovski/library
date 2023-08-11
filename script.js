const BOOKS_TABLE = document.querySelector(".books-table-body");
const NEW_BOOK_FORM = document.querySelector("form");
const ADD_BOOK_BUTTON = document.querySelector("#add-book-button");
const CANCEL_BUTTON = document.querySelector("#cancel");
const CONFIRM_BUTTON = document.querySelector("#confirm");

const BOOK_READ = `<button class="book-read">✅</button>`;
const BOOK_NOT_READ = `<button class="book-read">❌</button>`;

let deleteButtons;

let myLibrary = [
  (theHobbit = new Book("The Hobbit", "J.R.R Tolkien", 295, 1)),
  (harryPotter = new Book(
    "Harry Potter i Zakon Feniksa",
    "J.K. Rowling",
    600,
    1
  )),
  (dziennikiGwiazdowe = new Book(
    "Dzienniki Gwiazdowe",
    "Stanisław Lem",
    300,
    1
  )),
];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book, library = myLibrary) {
  library.push(book);
}

function removeBookFromLibrary(index) {
  myLibrary.splice(index, 1);
}

function displayBooks(library = myLibrary, table = BOOKS_TABLE) {
  table.innerHTML = `<tr>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">Pages</th>
      <th scope="col">Read?</th>
    </tr>`;
  library.forEach((book) => {
    let index = library.indexOf(book);
    let newRow = `<tr data-index="${index}">`;
    for (key in book) {
      switch (key) {
        case "title":
          newRow += `<td>"${book[key]}"</td>`;
          break;
        case "read":
          parseInt(book[key]) === 1
            ? (newRow += `<td>${BOOK_READ}</td>`)
            : (newRow += `<td>${BOOK_NOT_READ}</td>`);
          break;
        default:
          newRow += `<td>${book[key]}</td>`;
      }
    }
    newRow += (
      `<td>
        <button class="delete-book" data-index="${index}">
          Delete
        </button>
      </td>`
    );
    table.innerHTML += `${newRow}</tr>`;
  });
  deleteButtons = document.querySelectorAll(".delete-book");
  deleteButtonListener();
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

  addBookToLibrary(new Book(title, author, pages, read));
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
  confirmForm();
  BOOKS_TABLE.innerHTML = "";
  NEW_BOOK_FORM.reset();
  hideForm();
  displayBooks();
});

CANCEL_BUTTON.addEventListener("click", () => {
  NEW_BOOK_FORM.reset();
  hideForm();
});

function deleteButtonListener() {
  deleteButtons.forEach((button) => {
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
