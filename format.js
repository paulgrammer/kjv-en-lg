const fs = require("fs");
// downloaded from https://learnluganda.com/static/qocs/embed/KJVBible.txt
const file = fs.readFileSync("./KJVBible.txt");
// downloaded from https://raw.githubusercontent.com/aruljohn/Bible-kjv/master/Books.json
const books = require("./books.json");
const lines = file.toString().split("\n");

const readLine = (line) => {
  let [originalText, translation] = line
    .split("%%%")
    .map((line) => line.trim());

  originalText = originalText.split(" ");

  let reference = originalText.shift();

  return {
    reference,
    scripture: originalText.join(" "),
    translation,
  };
};

function readLines(lines, callback) {
  let output = [];

  let iterate = () => {
    let line = lines.shift();

    if (!line) {
      return callback(output);
    }

    let result = readLine(line);

    if (result) {
      let [number, chapter, verse] = result?.reference?.match(/[0-9]+/g) || [];
      let _book = result?.reference?.match(/[A-Z]+/gi)[0];

      if (/S1A0/g.test(result?.reference)) _book = "1 Samuel";
      if (/S2A0/g.test(result?.reference)) _book = "2 Samuel";
      if (/K1I0/g.test(result?.reference)) _book = "1 Kings";
      if (/K2I0/g.test(result?.reference)) _book = "2 Kings";
      if (/C1H0/g.test(result?.reference)) _book = "1 Chronicles";
      if (/C2H0/g.test(result?.reference)) _book = "2 Chronicles";
      if (/SOS0/g.test(result?.reference)) _book = "Song of Solomon";
      if (/C1O/g.test(result?.reference)) _book = "1 Corinthians";
      if (/C2O/g.test(result?.reference)) _book = "2 Corinthians";
      if (/T1H0/g.test(result?.reference)) _book = "1 Thessalonians";
      if (/T2H0/g.test(result?.reference)) _book = "2 Thessalonians";
      if (/T1I0/g.test(result?.reference)) _book = "1 Timothy";
      if (/T2I0/g.test(result?.reference)) _book = "2 Timothy";
      if (/P1E0/g.test(result?.reference)) _book = "1 Peter";
      if (/P2E0/g.test(result?.reference)) _book = "2 Peter";
      if (/J1O/g.test(result?.reference)) _book = "1 John";
      if (/J2O/g.test(result?.reference)) _book = "2 John";
      if (/J3O/g.test(result?.reference)) _book = "3 John";
      if (/JDE0/g.test(result?.reference)) _book = "Jude";
      if (/JDG0/g.test(result?.reference)) _book = "Judges";
      if (/EPH0/g.test(result?.reference)) _book = "Ephesians";
      if (/PHP0/g.test(result?.reference)) _book = "Philippians";
      if (/PHM0/g.test(result?.reference)) _book = "Philemon";

      let reg = new RegExp(`${_book}`, "ig");
      let book = books.find((b) => reg.test(b));

      if (book) {
        let final = {
          ...result,
          book,
          number: Number(number),
          chapter: Number(chapter),
          verse: Number(verse),
        };

        output.push(final);
      }
    }

    setTimeout(iterate, 0);
  };

  iterate();
}

readLines(lines, function (output) {
  fs.writeFileSync("./bible.json", JSON.stringify(output), "utf8");
});
