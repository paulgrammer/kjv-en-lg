const bible = require("./bible.json");
const books = require("./books.json");

module.exports = () => {
  return {
    books,
    book(book = 1) {
      let scriptures = bible.filter(
        (i) =>
          `${
            i[`${typeof book === "number" ? "number" : "book"}`]
          }`.toLowerCase() === `${book}`.toLowerCase()
      );

      return {
        chapter(chapter = 1) {
          let chapters = scriptures.filter(
            (s) => `${s.chapter}` === `${chapter}`
          );

          return {
            verse(verse = 1) {
              let verses = chapters.find((v) => `${v.verse}` === `${verse}`);
              return verses;
            },
          };
        },
      };
    },

    query(query) {
      query = Object.assign({}, query);
      let keys = Object.keys(query);
      let values = Object.values(query);

      return bible.filter(
        eval(
          `(scripture) => { 
              return ${keys
                .map((key, index) => {
                  return `String(scripture.${key}).toLowerCase() === String("${values[index]}").toLowerCase()`;
                })
                .join(" && ")} 
            }`
        )
      );
    },

    search(text) {
      return bible.filter(({ translation, scripture }) => {
        let searchReg = new RegExp(`${text}`, "ig");
        return searchReg.test(scripture) || searchReg.test(translation);
      });
    },
  };
};
