# kjv-en-lg

```javascript
const bible = require("kjv-en-lg")();

const List = bible.books;
console.log(List);

const scripture = bible.book(5).chapter(5).verse(1);
console.log(scripture);

const results = bible.query({
  book: "genesis",
  number: "1",
  chapter: 1,
  verse: 1,
});

console.log(results);

const searchResults = bible.search("In the beginning God created");
console.log(searchResults);
```
