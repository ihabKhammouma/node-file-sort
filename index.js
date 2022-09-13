var fs = require("fs");
const fsPromises = require("fs/promises");
console.log("Sort file input to output!");

const inputFileName = "input.txt";
const outputFileName = "output.txt";
const separateSort = (arr = []) => {
  const sorter = (a, b) => {
    if (
      a.charCodeAt(0) == b.charCodeAt(0) &&
      a.charAt(a.length - 1) == b.charAt(b.length - 1)
    ) {
      return a.match(/\d/g).join("").localeCompare(b.match(/\d/g).join(""));
    }
    if (a.charCodeAt(0) == b.charCodeAt(0)) {
      return a.charAt(a.length - 1).localeCompare(b.charAt(b.length - 1));
    }
    return a.localeCompare(b);
  };
  const res = arr.sort(sorter);
  return res;
};
const whriteFile = (arr = []) => {
  try {
    const file = fs.createWriteStream(outputFileName);

    file.on("error", (err) => {
      /* error handling */
      console.error(err);
    });

    arr.forEach((value) => file.write(`${value}\n`));
    // the finish event is emitted when all data has been flushed from the stream
    file.on("finish", () => {
      console.log(`wrote all the array data to file ${outputFileName}`);
    });
    file.end();
  } catch (err) {
    console.error(err);
  }
};
const readFileAsync = async () => {
  try {
    const contents = await fsPromises.readFile(inputFileName, "utf-8");
    const arr = contents.split(/\r?\n/);
    console.log(arr);

    const res = separateSort(arr);

    console.log(res);

    whriteFile(arr);
    
  } catch (err) {
    console.error(err);
  }
};

readFileAsync();
