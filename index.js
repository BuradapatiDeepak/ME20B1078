const express = require("express");
const axios = require("axios");
const app = express();

app.get("/numbers", async (req, res) => {
  const urls = req.query.url || [];
  const timeout = 500;

  try {
    const requests = urls.map(async (url) => {
      try {
        const response = await axios.get(url, { timeout });

        return response.data.numbers || [];
      } catch (error) {
        console.error(`We got an Error fetching the ${url}:`, error.message);
        return [];
      }
    });

    const responses = await Promise.all(requests);
    const mergedNumbers = responses.reduce(
      (merged, numbers) => merged.concat(numbers),
      []
    );
    const uniqueNumbers = Array.from(new Set(mergedNumbers)).sort(
      (a, b) => a - b
    );

    res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error("Error processing requests:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(8008, () => {
  console.log(`Server is running on port 8008`);
});

app.get("/numbers", async (req, res) => {
  // All the URLs will be saved in an array in the name of urls
  const urls = req.query.url || [];
  const timeout = 500;

  try {
    // Here the Map function go through each and every url and perform the arrow function.
    const requests = urls.map(async (url) => {
      // Try - Catch Block is to restrict the app crash if fetching the url gets an error
      try {
        // if there is no error in fetching then the numbers which are collected from the urls data will be stored in an array
        const response = await axios.get(url, { timeout });
        // if number are not there then it will be stored in an empty array
        return response.data.numbers || [];
      } catch (error) {
        console.error(`Error fetching ${url}:`, error.message);
        return [];
      }
    });
    // it will wait untill all they async operations are completed and give the response, here it is saved in response constant
    const responses = await Promise.all(requests);
    // it will reduce/destructure the response and concat it into a array of mergedNumbers
    const mergedNumbers = [].concat(...responses);
    // From mergedNumbers we filter and sort out the numbers
    const uniqueNumbers = mergedNumbers.filter((number, index, array) => {
      return array.indexOf(number) === index;
    });
    uniqueNumbers.sort((a, b) => a - b);

    res.json({ numbers: uniqueNumbers });
  } catch (error) {
    console.error("Error processing requests:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
