let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function() {
    return `${title} by ${author}, ${pages} pages, ${read}`;
  }
}

function addBookToLibrary() {
  for (let i = 0; i < myLibrary.length; i++) {
    let displayBook = document.createElement('div');
    displayBook.innerHTML = myLibrary[i].info();
    displayBook.id = myLibrary[i].title;
    bookshelf.appendChild(displayBook);
  }
}

let theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', 295, 'read');
let theLordOfTheRings = new Book('The Lord of the Rings', 'J.R.R Tolkien', 1000, 'read');
let mistborn = new Book('Mistborn', 'Sanderson', 400, 'unread');

myLibrary.push(theHobbit);
myLibrary.push(theLordOfTheRings);
myLibrary.push(mistborn);

let bookshelf = document.querySelector('#bookshelf');
let modal = document.getElementById('modal');
// let closeBtn = document.getElementById('closeBtn');

const btn = document.querySelector('#btn');
btn.addEventListener('click', () => {
  modal.style.display = 'block';
  // closeBtn.style.display = 'block';
});

const addToShelf = document.getElementById('addToShelf');

addToShelf.addEventListener('click', () => {
  let title = document.getElementById('title');
  let author = document.getElementById('author');
  let pages = document.getElementById('pages');
  let read = document.getElementById('read');
  let newBook = new Book(title.value, author.value, pages.value, read.checked);
  myLibrary.push(newBook);
  bookshelf.innerHTML = '';
  addBookToLibrary();
  modal.style.display = 'none';
  title.value = '';
  author.value = '';
  pages.value = '';
  read.checked = false;
});

addBookToLibrary();