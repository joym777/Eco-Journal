//random quote generator script for vision page 
//selects elements from the vision page html script
const quoteElement = document.getElementById("quote-text");
const authorElement = document.getElementById("quote-author");

//creating an array to store all quotes and their authors
const ecoQuotes = [
  { text: "The Earth is what we all have in common.", author: "Wendell Berry" },
  { text: "It's the little things citizens do. That's what will make the difference.", author: "Wangari Maathai" },
  { text: "You are never too small to make a difference.", author: "Greta Thunberg" },
  { text: "The natural world is the most precious thing we have, and we need to defend it.", author: "David Attenborough" },
  { text: "We won’t have a society if we destroy the environment.", author: "Margaret Mead" },
  { text: "There is no such thing as ‘away’. When we throw anything away, it must go somewhere.", author: "Annie Leonard" }
];

//creating function to display the quote at random
function displayQuote() {

  const randomIndex = Math.floor(Math.random() * ecoQuotes.length); // picks random number between 0-1, multiples by 6 and rounds down dumber to an index (0-5)
  const randomQuote = ecoQuotes[randomIndex]; // pick that quote from the list with the specific index

  //updating the HTML content for quote to be displayed
  quoteElement.textContent = `"${randomQuote.text}"`;
  authorElement.textContent = `~ ${randomQuote.author}`;
}

//running the function only when the page loads
document.addEventListener("DOMContentLoaded", function() {
  displayQuote();
});