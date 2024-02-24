const fs = require("fs");

function parseDate(dateString) {
  const months = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];

  // Extract the day, month, and year from the dateString
  const day = parseInt(dateString.slice(0, 2));
  const monthIndex =
    months.findIndex((month) => dateString.includes(month)) + 1;
  const year = parseInt(dateString.slice(-2));

  // Convert the year to a full year (assuming the year is between 2000 and 2099)
  const fullYear = year < 50 ? 2000 + year : 1900 + year;

  // Create a Date object with the extracted day, month, and year
  return new Date(fullYear, monthIndex - 1, day);
}

const main = () => {
  const unsortedFileNames = fs.readdirSync("unsorted");

  const fileNames = unsortedFileNames.map((fileName) => `unsorted/${fileName}`);
  // Sort the fileNames by extract the last part of the string as a date
  fileNames.sort((a, b) => {
    const dateA = parseDate(a.split(" ").pop().split(".")[0]);
    const dateB = parseDate(b.split(" ").pop().split(".")[0]);
    return dateA - dateB;
  });

  // Rename the files so the first part is the element index of the array + 1
  fileNames.map((fileName, index) => {
    const parts = fileName.split(" ");
    const newFilename = `${index + 1} ${parts.slice(1).join(" ")}`;
    console.log(`${fileName}\n${newFilename}\n\n`);

    // Copy the file to sorted directory
    fs.copyFileSync(fileName, `sorted/${newFilename}`);
  });
};

main();
