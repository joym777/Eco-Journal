//quote generator for vision page after every page reload
const ecoQuote = [ //creating an array to store all quotes and authors
  {
    text: "If children do not grow up knowing about nature & appreciating it, they will not undrstand it. And if they do not understand it, they won't protect it."
    author: "-David Attenborough"
  },
   {
    text: "We are the first generation to feel the impact of climate change, and the last generation that can do something about it."
    author: "-Barack Obama"
  },
   {
    text: "The earth is what we all have in common"
    author: "-Wendell Berry"
  },
   {
    text: "If you really think the environment is less important than the economy, try holding your breath while counding your money."
    author: "-Guy McPherson"
  },
   {
    text: "The future will be gree, or not at all."
    author: "Jonathon Porritt"
  },
   {
    text: "When we heal the earth, we heal ourselves."
    author: "-David Orr"
  },
];
//function to randomly select a quote from the array above
function getRandomQuote () { 
  //selects a random decimal number between 0 and 1, then multiplies by 6 (number of qoutes available)
  //Math.floor rounds down the digit result to match the index of a specific quote (0-5)
  const randomIndex = Math.floor(Math.random() * ecoQuote.length); 
  return ecoQuotes[randomIndex]; //returns the quote with the specific index calculated 

}