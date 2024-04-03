// main.js

// script needs to have the following functionality:
//  - change all of the HTML in the body of the page to match up with the current page
//    - each page after the first page needs to have a "return" button that brings you back to the first page
//    - page 1: header with "I CAN READ YOUR MIND" and a "GO" button that starts the game and goes to page 2
//    - page 2: h1: "pick a number from 1-99", a "next" button that takes you to page 3, and "when you have your number, click next"
//    - page 3: h1: "add both digits together to get a new number", another "next" button to page 4, "ex: 14 is 1 + 4 = 5" and "click next to proceed"
//    - page 4: h1: "subtract your new number from your original number", another "next", another "ex: 14 - 5 = 9" and "click next to proceed"
//    - page 5: h1: "0 - & / 1 - @ / 2 - $ / 3 - B / ...", a "reveal" button, "find your new number", and "note the symbol besides the number"
//      - this should be 1 through 99 with the ability to scroll through them -- all the multiples of 9 should have the same symbol, cycle through 10 syms
//      - randomize the symbols each time to obfuscate the math trick
//    - page 6: h1: "&" and "Your symbol is: &"
//      - this symbol should be the symbol used for the multiples of 9
//  - the ability to cycle between pages via a button
//  - animate the transition between pages

// track the current screen
let current_screen = 1;

// grab our containers
const top_container = document.getElementById("top");
const mid_container = document.getElementById("middle");
const bot_container = document.getElementById("bottom");

const page_1 = {
  screen_num: 1,
  header: "I Can Read Your Mind",
  return_button: false, // displays a GO button
  next_button: "", // empty string means NO next button
};

const page_2 = {
  screen_num: 2,
  header: "Pick a number from 1-99",
  return_button: true, // displays the return button
  next_button: "NEXT", // displays the text on the button
};

const page_3 = {
  screen_num: 3,
};

const page_4 = {
  screen_num: 4,
};

const page_5 = {
  screen_num: 5,
};

const page_6 = {
  screen_num: 6,
};

function init() {
  load_page_data(page_1);
}

function load_page_data(obj) {
  // takes an object containing the page data and loads that into the page
}

init();