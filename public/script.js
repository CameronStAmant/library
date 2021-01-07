let myLibrary = [];

class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
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
    bookRead.innerHTML = 'Mark read/unread';
    bookRead.id = 'readUnread' + i;
    bookshelf.appendChild(deleteBtn);
    bookshelf.appendChild(bookRead);
    bookshelf.appendChild(displayBook);
    bookshelf.appendChild(lineBreak);
  }
}

const preObject = document.getElementById('bookshelf');
const dbRefObject = firebase.database().ref().child('bookshelf');
let dbArray = [];
let second = {};
let nextID = 1;
const getBooks = () => {
  firebase
    .database()
    .ref()
    .child('bookshelf')
    .on('value', (book) => {
      dbArray = [];
      myLibrary = [];
      dbArray.push(book.val());
      second = Object.values(dbArray[0]);
      second.forEach((element) => {
        let newBooks = new Book(
          element.title,
          element.author,
          element.pageCount,
          element.read,
          element.id
        );
        myLibrary.push(newBooks);
      });
      if (nextID === 1) {
        nextID = second.length + 1;
      }
      bookshelf.innerHTML = '';
      addBookToLibrary();
      deletes();
      readUn();
    });
};
getBooks();

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
  firebase.database().ref().child('bookshelf').child(`Book${nextID}`).update({
    author: author.value,
    id: nextID,
    pageCount: pages.value,
    read: read.checked,
    title: title.value,
  });
  nextID += 1;
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

let buttonArray = [];

function deletes() {
  for (let a = 0; a < myLibrary.length; a++) {
    buttonArray[a] = document.getElementById(a);
    buttonArray[a].addEventListener('click', () => {
      firebase
        .database()
        .ref()
        .child('bookshelf')
        .child(`Book${second[a].id}`)
        .remove();
      bookshelf.innerHTML = '';
      addBookToLibrary();
      deletes();
      readUn();
    });
  }
}

Book.prototype.readUnread = function () {
  this.info = function () {
    return `<div>${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}</div>`;
  };
  if (this.read === 'true') {
    firebase
      .database()
      .ref()
      .child('bookshelf')
      .child(`Book${this.id}`)
      .update({
        read: 'false',
      });
  } else {
    firebase
      .database()
      .ref()
      .child('bookshelf')
      .child(`Book${this.id}`)
      .update({
        read: 'true',
      });
  }
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
