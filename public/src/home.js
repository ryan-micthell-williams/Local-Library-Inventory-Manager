function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length; 
}

function getBooksBorrowedCount(books) {
  // since a book's borrowed status is registered as 'false' within the borrows array, the sum total of false values should equal the total outstanding borrows 
  // to find the total number of currently borrowed books, we must find the sum of false values 
  return books.reduce( (count, book) => { return (book.borrows[0].returned) ? count : (count+1) }, 0);
}

function getMostCommonGenres(books) {
  // create an object to hoise the book genres
  let bookGenresObject = {}; 
  // Surmise the total number of books in each genre 
  books.forEach(book => {
    if (bookGenresObject[book.genre]) { 
      bookGenresObject[book.genre]++; 
    } else {
      bookGenresObject[book.genre] = 1;
    }
  });
  // transform the genre object into an array with genre names acting as KEYS and the number of books within that genre acting as VALUES 
  // format the return per testing requirements, and only return the first 5 results 
  return Object.keys(bookGenresObject).sort((genre1, genre2) => bookGenresObject[genre2] - bookGenresObject[genre1]).slice(0,5).map((genre) => {
    return { 
      "name": genre, 
      "count": bookGenresObject[genre]
    }
  })
}

function getMostPopularBooks(books) {
  return books.sort((book1, book2) => book2.borrows.length - book1.borrows.length ).slice(0,5).map(book => {return {"name": book.title, "count": book.borrows.length}});
}

// helper function because the assignment requires at least one 
function helperFunction(books){
  return books.map(book => {
    return {
      "author": book.authorId,
      "rentals": book.borrows.length 
    }
  }).sort((auth1, auth2) => auth2.rentals - auth1.rentals).slice(0,5);
}

function getMostPopularAuthors(books, authors) {
  let authorCounts = helperFunction(books);

  return authorCounts.map(({author, rentals}) => {
    let writer = authors.find(authObject => authObject.id == author);
    let fullName = `${writer.name.first} ${writer.name.last}`;
    return {
      "name": fullName, 
      "count": rentals 
    };
  });
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
