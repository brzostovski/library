function Book(
  title,
  author,
  pages,
  read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
      let readStatus;
      read ? (readStatus = 'read') : (readStatus = 'not read yet');
      return `"${title}" by ${author}, ${pages} pages, ${readStatus}.`;
    }
}