function findAuthorById(authors, id) {
  return authors.find((author) => author.id == id); 
}

function findBookById(books, id) {
  return books.find((book) => book.id == id); 
}

function partitionBooksByBorrowedStatus(books) {
  // create two arrays, one to house borrowed books, and one to house returned books
  // fill up each array with books based on the return status of the book in question 
  let returnedFalse = [],  returnedTrue = []; 
  books.forEach((book) => (book.borrows[0].returned) ? returnedTrue.push(book) : returnedFalse.push(book)); 
  // combine the two arrays you just created into one all-encompassing array 
  return [returnedFalse, returnedTrue]; 
}

function getBorrowersForBook(book, accounts) {
  return book.borrows.map((borrowed) => {
    let account = accounts.find((user) => user.id == borrowed.id); 
    // find() the user ID associated with the inputted book
    // return the userIDs and relevant book data as an object per the expectations of the test 
    return { "name": account.name, "email": account.email, "returned": borrowed.returned } 
    // limit the item count to 10 
  }).slice(0,10); 
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
