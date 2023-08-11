const BOOKS_TABLE = document.querySelector('.books-table-body');
const NEW_BOOK_FORM = document.querySelector('form');
const ADD_BOOK_BUTTON = document.querySelector('#add-book-button');
const CANCEL_BUTTON = document.querySelector('#cancel');
const CONFIRM_BUTTON = document.querySelector('#confirm');

const BOOK_READ = '✅';
const BOOK_NOT_READ = '❌';

let myLibrary = [
  theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, true),
  harryPotter = new Book('Harry Potter i Zakon Feniksa', 'J.K. Rowling', 600, true),
  dziennikiGwiazdowe = new Book('Dzienniki Gwiazdowe', 'Stanisław Lem', 300, true),
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
  table.innerHTML =
    `<tr>
      <th scope="col">Title</th>
      <th scope="col">Author</th>
      <th scope="col">Pages</th>
      <th scope="col">Read?</th>
    </tr>`;
  library.forEach(book => {
    let newRow = `<tr data-attribute = "${library.indexOf(book)}">`;
    for (key in book) {
      switch (key) {
        case 'title':
          newRow += `<td>"${book[key]}"</td>`;
          break;
        case 'read':
          (book[key] === true)
            ? (newRow += `<td>${BOOK_READ}</td>`)
            : (newRow += `<td>${BOOK_NOT_READ}</td>`);
          break;
        default:
          newRow += `<td>${book[key]}</td>`;
      }
    }
    table.innerHTML += `${newRow}</tr>`;
  });
}

function showForm() {
  NEW_BOOK_FORM.classList.remove('hidden');
  ADD_BOOK_BUTTON.classList.add('hidden');
}

function confirmForm() {
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read;

  let readState = document.getElementsByName('read');
  for (button of readState) {
    if (button.checked) {read = button.value};
  }

  addBookToLibrary(new Book(title, author, pages, read));
  NEW_BOOK_FORM.reset();
}

function hideForm() {
  NEW_BOOK_FORM.classList.add('hidden');
  ADD_BOOK_BUTTON.classList.remove('hidden');
}

function cancelForm() {
  if (confirm('Are you sure?')) {
    hideForm();
  } else {
    return 0;
  }
}

window.addEventListener('load', () => displayBooks());

ADD_BOOK_BUTTON.addEventListener('click', () => showForm());

CONFIRM_BUTTON.addEventListener('click', () => {
  confirmForm();
  BOOKS_TABLE.innerHTML = '';
  hideForm();
  displayBooks();
});

CANCEL_BUTTON.addEventListener('click', () => cancelForm());