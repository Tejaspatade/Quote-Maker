const quoteContainer = document.getElementById("container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const btnTweetQuote = document.getElementById("btn-tweet");
const btnNextQuote = document.getElementById("btn-next");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Loading Animations
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
  btnNextQuote.hidden = true;
}

function doneLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
  btnNextQuote.hidden = false;
}

// Dislpay new Quote
function newQuote() {
  loading();

  // Picking the Quote Randomly
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  // Setting HTML Dynamically
  quoteText.textContent = quote.text;
  //   Checking whether Author name exists
  if (!quote.author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = quote.author;
  }

  // Checking for quote length for determining font style
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  }
  doneLoading();
}

// Get Quotes from an API
async function getQuotes() {
  loading();

  const apiURL = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    // console.log(apiQuotes[69]);
    newQuote();
  } catch (error) {
    console.log("Error Occured!");
  }
}

// Tweet This Quote! implementation
function tweetQuote() {
  const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterURL, "_blank");
}

//Event Handling
btnTweetQuote.addEventListener("click", tweetQuote);
btnNextQuote.addEventListener("click", newQuote);

// getQuotes();
loading();
