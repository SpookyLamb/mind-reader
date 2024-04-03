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
  hint_text: "", // empty string means NO hint text
};

const page_2 = {
  screen_num: 2,
  header: "Pick a number from 1-99!",
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
  header: "SPECIAL_SYMBOLS", // tells the script to display the symbol list with randomized symbols
  return_button: true,
  next_button: "REVEAL",
  hint_text: "Find your new number. Note the symbol besides the number!",
};

const page_6 = {
  screen_num: 6,
  header: "NINTH_SYMBOL", // tells the script to display whatever symbol that it has selected for multiples of 9
  return_button: true,
  next_button: "",
  hint_text: "Your symbol is: NINTH_SYMBOL",
};

const pages = [page_1, page_2, page_3, page_4, page_5, page_6]

function init() {
  load_page_data(page_1);
}

function load_page_data(obj) {
  // takes an object containing the page data and loads that into the page

  // update page tracker
  current_screen = obj.screen_num;

  // display the header in the TOP container
  change_top(obj.header);

  // display the "NEXT" button and any additional text
  change_middle(obj.next_button, obj.hint_text);

  // change the bottom container and its button
  change_bottom(obj.return_button);
}

// changes the header based on header_text
function change_top(header_text) {
  // clear any existing elements in the top container
  clear_child_elements(top_container);

  // add a new header element with header_text
  const node = document.createElement("h1");
  node.textContent = header_text;
  top_container.appendChild(node);
}

// changes the middle container, including its next button
function change_middle(next_button, hint_text) {
  // both next_button and hint_text should be strings
  clear_child_elements(mid_container);
  
  if (next_button) { // empty string is FALSE and ignored
    const node = instance_button();
    node.textContent = next_button;
    node.addEventListener("click", next_page);
    mid_container.appendChild(node);
  }

  if (hint_text) {
    const node = document.createElement("p");
    node.textContent = hint_text;
    mid_container.appendChild(node);
  }
}

// changes the bottom container
function change_bottom(return_button) {
  // return_button is true/false

  clear_child_elements(bot_container);

  if (return_button) {
    // create the return button that sends the page back to the first page
    const node = instance_button();
    //node.style.backgroundImage = "img/icons/arrow-counterclockwise.svg";
    node.textContent = "RESTART";
    node.addEventListener("click", reset);
    bot_container.appendChild(node);
  } else {
    // create the GO button that takes the player to the next page
    const node = instance_button();
    //node.style.backgroundImage = "img/icons/arrow-right.svg";
    node.textContent = "GO";
    node.addEventListener("click", next_page);
    bot_container.appendChild(node);
  }

}

function instance_button() {
  const node = document.createElement("button");
  node.classList.add("btn")
  node.classList.add("btn-outline-primary")
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

init();