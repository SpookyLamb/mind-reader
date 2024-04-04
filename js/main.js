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
let ninth_symbol = "&"; // default
const symbol_array = ["@", "#", "$", "%", "&", "*", "A", "B", "C", "D"]; // contains 10 symbols total

// grab our containers
const main_container = document.getElementById("main");
const top_container = document.getElementById("top");
const mid_container = document.getElementById("middle");
const bot_container = document.getElementById("bottom");

const page_1 = {
  screen_num: 1,
  header: "I Can Read Your Mind",
  return_button: false, // displays a GO button
  next_button: "", // empty string means NO next button
  hint_text: "", // empty string means NO hint text
};

const page_2 = {
  screen_num: 2,
  header: "Pick a number from 10-99!",
  return_button: true, // displays the return button
  next_button: "NEXT", // displays the text on the button
  hint_text: "When you have your number, click NEXT!",
};

const page_3 = {
  screen_num: 3,
  header: "Add both digits together to get a new number.",
  return_button: true,
  next_button: "NEXT",
  hint_text: "EX: 14 is 1 + 4 = 5. Click NEXT to proceed!",
};

const page_4 = {
  screen_num: 4,
  header: "Subtract your new number from your original number.",
  return_button: true,
  next_button: "NEXT",
  hint_text: "EX: 14 - 5 = 9. Click NEXT to proceed!",
};

const page_5 = {
  screen_num: 5,
  header: "SPECIAL_SYMBOLS",
  return_button: true,
  next_button: "REVEAL",
  hint_text: "Find your new number. Note the symbol next to it!",
};

const page_6 = {
  screen_num: 6,
  header: "NINTH_SYMBOL", // tells the script to display whatever symbol that it has selected for multiples of 9
  return_button: true,
  next_button: "",
  hint_text: "Your symbol is:<br><br>NINTH_SYMBOL",
};

const pages = [page_1, page_2, page_3, page_4, page_5, page_6]

function init() {
  load_page_data(page_1);
}

function load_page_data(obj) {
  // takes an object containing the page data and loads that into the page

  // update page tracker
  current_screen = obj.screen_num;

  // update the page
  change_page(obj.header, obj.next_button, obj.hint_text, obj.return_button);
}

// changes the page
function change_page(header_text, next_button, hint_text, return_button) {
  //clear_child_elements(main_container);
  clear_child_elements(top_container)
  clear_child_elements(bot_container)

  // top elements
  let node = document.createElement("h1");
  node.classList.add("align-self-top", "my-2")
  node.textContent = header_text;

  if (current_screen == 5) { // special override for the fifth screen to show the symbols and enable scrolling
    //node.classList.add("my-scroll-box")
    fill_symbol_list(node);
  } else if (current_screen == 6) { // special override
    node.textContent = ninth_symbol; // randomized on the previous screen
  }

  top_container.appendChild(node);

  // end elements
  if (next_button) { // empty string is FALSE and ignored
    node = instance_button();
    node.textContent = next_button;
    node.addEventListener("click", next_page);
    node.classList.add("p-3", "btn-primary", "next-button", "align-self-center")
    bot_container.appendChild(node);
  }

  if (hint_text) {
    node = document.createElement("p");
    node.classList.add("my-1")

    if (current_screen == 6) {
      hint_text = hint_text.replace("NINTH_SYMBOL", ninth_symbol);
    }

    node.innerHTML = hint_text;
    bot_container.appendChild(node);
  }

  if (return_button) {
    // create the return button that sends the page back to the first page
    node = instance_button();
    //node.style.backgroundImage = "img/icons/arrow-counterclockwise.svg";
    node.textContent = "";
    node.addEventListener("click", reset);
    node.classList.add("align-self-end", "rounded-circle", "btn-outline-primary", "btn-lg", "p-4")
    bot_container.appendChild(node);
    let button_node = node; //store it

    // add our image to the button
    node = document.createElement("img");
    node.src = "img/icons/arrow-counterclockwise.svg";
    node.classList.add("my-icon");
    button_node.appendChild(node);

  } else {
    // create the GO button that takes the player to the next page
    node = instance_button();
    //node.style.backgroundImage = "img/icons/arrow-right.svg";
    node.textContent = "GO";
    node.addEventListener("click", next_page);
    node.classList.add("align-self-end", "rounded-circle", "btn-outline-primary", "btn-lg", "p-4", "go-button")
    bot_container.appendChild(node);
  }
}

function instance_button() {
  const node = document.createElement("button");
  node.classList.add("btn", "my-3")
  return node
}

function next_page() {
  // identifies the next page and proceeds to it

  current_screen += 1;
  let next_screen;

  for (let i = 0; i < pages.length; i++) {
    let new_page = pages[i];
    if (new_page.screen_num == current_screen) {
      next_screen = new_page;
      break;
    }
  }

  load_page_data(next_screen);
}

function reset() {
  // resets to the first page
  current_screen = 1;
  load_page_data(page_1);
}

function clear_child_elements(parent_element) {
  // clears the child elements of a given element

  const node_list = Array.from(parent_element.childNodes); //grab a copy of the array to iterate across
  node_list.forEach((element) => element.remove());
}

function random_integer(min, max) { // returns a random integer between min and max, max excluded
  return Math.floor(Math.random() * (max - min) ) + min;
}

function fill_symbol_list(node) {
  // randomly assign symbols to each number between 10 and 99, repeating only once every symbol has been used
  // one symbol is selected to be the special symbol for integers divisible by 9 (18, 27, etc)
  // these integers are only ever to receive that symbol, never another

  node.textContent = ""; // clear existing text

  let symbol_array_copy = Array.from(symbol_array); // grab a copy to work on
  let random_number = random_integer(0, 10); // returns a random integer between 0 and 9
  
  ninth_symbol = symbol_array_copy[random_number]; // grab and set that symbol as our special 9th symbol
  symbol_array_copy.splice(random_number, 1); // then remove that element from the copied array

  const symbol_array_pool = Array.from(symbol_array_copy); // now save a semi-permanent copy of that new array, missing the special symbol

  // now fill out our node's text content with the symbols, including <br> as a line break between each one
  for (let i = 10; i <= 99; i++) { // now we iterate, dishing out special symbols to each number between 10 and 99, inclusive, EXCEPT multiples of 9
    if (i % 9 == 0) { // divisible by 9
      node.textContent += String(i) + " - " + ninth_symbol + "<br />";
      continue; // skip the rest for this loop
    } // else, 

    if (symbol_array_copy.length == 0) { // array empty, refill it from our pool
      symbol_array_copy = Array.from(symbol_array_pool);
    }

    random_number = random_integer(0, symbol_array_copy.length); // exclusive max
    let result_symbol = symbol_array_copy[random_number]; // grab the random symbol...
    symbol_array_copy.splice(random_number, 1); // ...and remove it from our copy!

    // finally, add it to our textContent
    node.textContent += String(i) + " - " + result_symbol + "<br />";
    
    // continue,
  }

  // after we get done with the above, we need to convert our "<br>" strings into actual html
  let old_text = node.textContent;
  node.textContent = '';
  node.innerHTML = old_text;
}

init();