let myLibrary = [];

class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }
  info() {
    return `<div>${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}</div>`;
  }
}

function addBookToLibrary() {
  for (let i = 0; i < myLibrary.length; i++) {
    let displayBook = document.createElement('div');
    displayBook.innerHTML = myLibrary[i].info();
    displayBook.id = myLibrary[i].title;
    displayBook.className = 'left-btn';
    let deleteBtn = document.createElement('BUTTON');
    deleteBtn.id = i;
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = 'Remove';
    let lineBreak = document.createElement('BR');
    let bookRead = document.createElement('BUTTON');
    bookRead.innerHTML = 'Mark read';
    bookRead.id = 'readUnread' + i;
    bookshelf.appendChild(deleteBtn);
    bookshelf.appendChild(bookRead);
    bookshelf.appendChild(displayBook);
    bookshelf.appendChild(lineBreak);
  }
}

let theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'true');
let theLordOfTheRings = new Book(
  'The Lord of the Rings',
  'J.R.R Tolkien',
  1000,
  'false'
);
let mistborn = new Book('Mistborn', 'Sanderson', 400, 'false');

myLibrary.push(theHobbit);
myLibrary.push(theLordOfTheRings);
myLibrary.push(mistborn);

let bookshelf = document.querySelector('#bookshelf');
let modal = document.getElementById('modal');
let closeBtn = document.getElementById('closeBtn');

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
});

const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  modal.style.display = 'block';
  closeBtn.style.display = 'block';
});

const addToShelf = document.getElementById('addToShelf');

addToShelf.addEventListener('click', () => {
  let title = document.getElementById('title');
  let author = document.getElementById('author');
  let pages = document.getElementById('pages');
  let read = document.getElementById('read');
  if (
    !title.checkValidity() ||
    !author.checkValidity() ||
    !pages.checkValidity()
  ) {
    const titleError = document.getElementById('titleError');
    const authorError = document.getElementById('authorError');
    const pagesError = document.getElementById('pagesError');

    if (!title.checkValidity()) {
      titleError.innerHTML = 'Please add a title.';
    } else {
      titleError.innerHTML = '';
    }
    if (!author.checkValidity()) {
      authorError.innerHTML = 'Please add an author.';
    } else {
      authorError.innerHTML = '';
    }
    if (!pages.checkValidity()) {
      pagesError.innerHTML = 'Please add the number of pages.';
    } else {
      pagesError.innerHTML = '';
    }
    return;
  }
  let newBook = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(newBook);
  bookshelf.innerHTML = '';
  addBookToLibrary();
  modal.style.display = 'none';
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
  deletes();
  readUn();
});

addBookToLibrary();
let buttonArray = [];

function deletes() {
  for (let a = 0; a < myLibrary.length; a++) {
    buttonArray[a] = document.getElementById(a);
    buttonArray[a].addEventListener('click', () => {
      myLibrary.splice(a, 1);
      bookshelf.innerHTML = '';
      addBookToLibrary();
      deletes();
      readUn();
    });
  }
}

deletes();

Book.prototype.readUnread = function () {
  this.read = 'true';
  this.info = function () {
    return `<div>${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}</div>`;
  };
};

let readArray = [];

function readUn() {
  for (let b = 0; b < myLibrary.length; b++) {
    readArray[b] = document.getElementById('readUnread' + b);
    readArray[b].addEventListener('click', () => {
      myLibrary[b].readUnread();
      bookshelf.innerHTML = '';
      addBookToLibrary();
      deletes();
      readUn();
    });
  }
}

readUn();
