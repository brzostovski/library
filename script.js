const BOOKS_TABLE = document.querySelector('.books-table-body');
const NEW_BOOK_FORM = document.querySelector('form');
const ADD_BOOK_BUTTON = document.querySelector('#add-book-button');
const CANCEL_BUTTON = document.querySelector('#cancel');

let myLibrary = [
  theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, true),
  harryPotter = new Book('Harry Potter i Zakon Feniksa', 'J.K. Rowling', 600, true),
  dziennikiGwiazdowe = new Book('Dzienniki Gwiazdowe', 'S. Lem', 300, true),
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

function displayBooks(library = myLibrary, table = BOOKS_TABLE) {
  library.forEach(book => {
    let newRow = '<tr>';
    for (key in book) {
      (key === 'title')
        ? (newRow += `<td>"${book[key]}"</td>`)
        : (newRow += `<td>${book[key]}</td>`);
    }
    table.innerHTML += `${newRow}</tr>`;
  });
}

function showForm() {
  NEW_BOOK_FORM.classList.remove('hidden');
  ADD_BOOK_BUTTON.classList.add('hidden');
}

function cancelForm() {
  if (confirm('Are you sure?')) {
    NEW_BOOK_FORM.classList.add('hidden');
    ADD_BOOK_BUTTON.classList.remove('hidden');
  } else {
    return 0;
  }
}

window.addEventListener('load', () => displayBooks());

ADD_BOOK_BUTTON.addEventListener('click', () => showForm());

CANCEL_BUTTON.addEventListener('click', () => cancelForm());