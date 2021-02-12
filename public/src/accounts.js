function findAccountById(accounts, id) {
  return accounts.find((account) => account.id == id); 
}

function sortAccountsByLastName(accounts) {
  // transform each account holder's last name into a lowercase version of the original 
  // sort the last names alphabetically (lower valued letters first => -1:1)
  return accounts.sort((account1, account2) => (account1.name.last.toLowerCase() < account2.name.last.toLowerCase()) ? -1:1);
}

function getTotalNumberOfBorrows(account, books) {
  // declare a variable to hold the array of borrows for each book 
  let borrows = []; 
  // loop through the data and use an accumulator to add each borrow log to the array we just created
  books.forEach((book) => { 
    // add every instance in which a particular book was borrowed 
    borrows = borrows.concat(book.borrows); 
  })
  // filter the array you just created for borrowers whose id matches that of the account param
  return borrows.filter((borrowed) => borrowed.id == account.id).length; 
}

function getBooksPossessedByAccount(account, books, authors) {
  // three params, returns one array of books and authors that represents all books currently checked out by the inputted account
  // create an object to house the books borrowed by and still in the possession of a particular account
  let borrows = {}
  // loop through the books data and accumulate based on the specifications detailed in the previous comment
  books.forEach((book) => {
    // only return the book's title
    // filter through the borrowed books for borrower's that match the account id given AND books in their possession that have NOT been returned
    borrows[book.title] = book.borrows.filter((borrowed) => (borrowed.id == account.id) && !borrowed.returned); 
  });
  let result = Object.entries(borrows).filter(bookArray => bookArray[1].length > 0).map((book) => book[0]); 
  // gather information regarding the author of each book 
  // restructure the collected information into an object that houses both the title and author
  return result.map(bookTitle => {
    let bookAuthor = authors.find((author) => author.id == (books.find((book) => bookTitle == book.title).authorId)); 
    return {
      "title": bookTitle, 
      "author": bookAuthor
    }
  });
}



module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
