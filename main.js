class Person {
    constructor(name){
        this.name = name;
    }
}

// author nasljedjuje klasu person jer imaju zajednicka svojstva
class Author extends Person{
    constructor(name, book, genre){
        super(name);
        this.book = book;
        this.genre = genre;
    }
}

class Book {
    constructor(title, genre, author){
        this.title = title;
        this.genre = genre;
        this.author = author;
    }
}

const Library = (function (){
    // provatna varijabla (niz) u koji pohranjujemo knjige
    const books = [];
    // provatna varijabla (niz) u koji pohranjujemo autore
    const authors = [];

    // funkcija za dodavanje nove knjige
    function addBook(...book){
        // mozda nije potrebno provjeravati, ali na ovaj nacin mozemo proslijediti parametre bez kreiranja instance klase book 
        const newBook = book.length > 1 ? new Book(book[0], book[1], book[2]) : book[0];
        books.push(newBook);
    }

    // funkcija za pretrazivanje/filtriranje knjiga po naslovu
    function searchBooks(title){
        const filter = books.filter(book => book.title.toLowerCase().includes(title.toLowerCase()));

        let newTable = `
            <table>
                <tr>
                    <th>Title</th>
                    <th>Genre</th>
                    <th>Author</th>
                </tr>
        `;

        // stvaranje novih redova za tablicu ovisno o filtriranim podacima
        filter.forEach(book => newTable += tableRow(book.title, book.genre, book.author));
        newTable += '</table>';

        bookTable.innerHTML = newTable;
    }

    // funkcija za dodavanje novog autora
    function addAuthor(...author){
        // mozda nije potrebno provjeravati, ali na ovaj nacin mozemo proslijediti parametre bez kreiranja instance klase author
        const newAuthor = author.length > 1 ? new Author(author[0], author[1], author[2]) : author[0];
        authors.push(newAuthor);
    }

    // funkcija za pretrazivanje/filtriranje autora po nazivu
    function searchAuthors(name){
        const filter = authors.filter(author => author.name.toLowerCase().includes(name.toLowerCase()));

        let newTable = `
            <table>
                <tr>
                    <th>Name</th>
                    <th>Genre</th>
                    <th>Books</th>
                </tr>
                
        `;

        // stvaranje novih redova za tablicu ovisno o filtriranim podacima
        filter.forEach(author =>newTable += tableRow(author.name, author.genre, author.book))
        newTable += '</table>';
        
        authorTable.innerHTML = newTable;
    }

    // svojstva koja ce se moci koristiti
    return {
        addBook: addBook,
        searchBooks: searchBooks,
        addAuthor: addAuthor,
        searchAuthors: searchAuthors
    }
})()

// funkcija za krairanje table row-a s podacima 
function tableRow(...data){
    let row = "<tr>";

    data.forEach(d=>{
        row += `
            <td>${d}</td>
        `
    });

    row += "</tr>";
    return row;
}

const library = Library;

// dohvat author forme i inputa
const authorForm = document.getElementById("author-form");
const authorTable = document.getElementById("author-table");
const addAuthorButton = authorForm.lastElementChild;

addAuthorButton.addEventListener("click", function(e){
    e.preventDefault();
    useInputData(authorForm);
}, false)

// funkcija za povlacenje podataka iz input polja za proslijedjenu formu
function useInputData(form){
    // dohvat podataka iz input polja
    const input1 = form.children[0].value;
    const input2 = form.children[1].value;
    const input3 = form.children[2].value;

    // ako je neko polje prazno blokira unos
    if(input1 === '' || input2 === '' || input3 === ''){
        console.log("Empty field/s");
        return 0;
    }

    // ako se radi o autoru dodajemo autora, ako o knjizi dodajemo kjigu
    if(form === authorForm) {
        library.addAuthor(new Author(input1, input2, input3));
        authorTable.innerHTML += tableRow(input1, input2, input3);
    } else if(form === bookForm){
        library.addBook(new Book(input1, input2, input3));
        bookTable.innerHTML += tableRow(input1, input2, input3);
    }

    // resetiranje inputa nakon dodavanja
    // form.children[0].value = '';
    // form.children[1].value = '';
    // form.children[2].value = '';
}

// dohvat book forme i inputa
const bookForm = document.getElementById("book-form");
const bookTable = document.getElementById("book-table");
const addBookButton = bookForm.lastElementChild;

addBookButton.addEventListener("click", function(e){
    e.preventDefault();
    useInputData(bookForm);
}, false)

//search inputi
const searchAuthor = document.getElementById("author-search");
const searchBook = document.getElementById("book-search");

searchAuthor.addEventListener("input", function(e){
    library.searchAuthors(searchAuthor.value);
}, false)

searchBook.addEventListener("input", function(e){
    library.searchBooks(searchBook.value);
}, false)
