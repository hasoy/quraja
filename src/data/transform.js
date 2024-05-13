const fs = require("fs");

// Read the text file
fs.readFile("quran.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the data into lines
  const lines = data.split("\n");
  const surahs = {};

  // Iterate through each line
  lines.forEach((line) => {
    // Split each line into surah number and ayah
    const parts = line.split("|");

    // Check if the line has the expected format
    if (parts.length !== 3) {
      console.error("Invalid line:", line);
      return;
    }

    const [surahNum, ayahNum, text] = parts;

    // If the surah doesn't exist in the surahs object, create it
    if (!surahs[surahNum]) {
      surahs[surahNum] = {
        sura: parseInt(surahNum),
        ayaat: [],
      };
    }

    // Add the text of the ayah to the corresponding surah
    surahs[surahNum].ayaat.push(text.trim());
  });

  // Convert the object to an array of surahs
  const surahArray = Object.values(surahs);

  // Convert the array to a JSON string
  const jsonString = JSON.stringify(surahArray);

  // Write the JSON string to a separate JavaScript file
  fs.writeFile(
    "quran.js",
    `const quran = ${jsonString};\n\nmodule.exports = quran;`,
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("Data has been written to quran.js");
    },
  );
});
