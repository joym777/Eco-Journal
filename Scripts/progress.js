//
//eco-journal progress and buttons script
//this js script handles user sign-in, adding eco actions and displays a progress bar for each action added :)
//creating a user constructor
function User(name) {
  //stores the user's name
  this.name = name; //stires the user's name
  //stores all eco-friendly actions that the user records
  this.actions = [];
}

//function to let user record a new action
User.prototype.addAction = function (actionText, category) {
  //ensures every new action added includes the name category and date 
  this.actions.push({
    text: actionText,
    category: category,
    date: new Date().toLocaleDateString() // fetches today's date
  });
};

// Manager Function for the entire webpage
function EcoManager() {
  //works to hold the currently signed-in user object
  this.currentUser = null;
}

// creating and saving a profile once user signs in
EcoManager.prototype.signIn = function (username) {
  this.currentUser = new User(username); //creates new user object
  this.saveUser(); //stores their information in local storage
  this.showWelcomeMessage(username); //displays welcome message for the user 
};

//saving user data to local storage so its remembered
EcoManager.prototype.saveUser = function () {
  localStorage.setItem("ecoUser", JSON.stringify(this.currentUser)); //converts objects to text using Json.stringify
};

//for loading saved user data from local storage. checks for any saved info to add it back to the page
EcoManager.prototype.loadUser = function () {
  const saved = localStorage.getItem("ecoUser");
  if (saved) {
    this.currentUser = JSON.parse(saved); //turns the stored text back inot an object
    this.showWelcomeMessage(this.currentUser.name); //greeting tailored to user
    this.updateProgress(); //restores progress bar
    this.displayActions(); //restores action history
  }
};

//to show the welcome message after user signs-in or returns
EcoManager.prototype.showWelcomeMessage = function (name) {
  const welcomeMsg = document.getElementById("welcome-message");
  welcomeMsg.textContent = `Welcome back, ${name}.`;
  welcomeMsg.classList.remove("hidden");
};

//adds a new eco action to the user's record and automatically updates everything else
EcoManager.prototype.addEcoAction = function (text, category) {
  if (!this.currentUser) { //conditional statement to ask the user to log in (if not already) before they add an action
    alert("Please sign in first.");
    return;
  }

  //for adding the new action to the user's list
  this.currentUser.actions.push({
    text: text,
    category: category,
    date: new Date().toLocaleDateString()
  });

  //saves the updated data and refreshes content on the screen
  this.saveUser();
  this.displayActions();
  this.updateProgress();
};

//displays all of recorded eco actions on the web page, specifically under the 'add your eco-action' section
EcoManager.prototype.displayActions = function () {
  const list = document.getElementById("action-list");
  list.innerHTML = ""; //clears old list

  if (!this.currentUser) return;

  this.currentUser.actions.forEach((action) => {
    const li = document.createElement("li");
    li.textContent = `${action.text} (${action.category}) — ${action.date}`;
    list.appendChild(li); //adds each action recorded as a list item 
  });
};

//update the progress bar width based on the number of actions the user has completed. it may take a while to show this, but the more actions, the more visible it is
EcoManager.prototype.updateProgress = function () {
  const bar = document.getElementById("progress-bar");
  const actions = this.currentUser ? this.currentUser.actions.length : 0;

  //each action increases progress up to 100%
  const percent = Math.min(actions, 100); //visually increases the bar
  bar.style.width = percent + "%";
  bar.textContent = `${percent}%`;//shows the percentage of how much you've filled
};

//buttons and interractivity
document.addEventListener("DOMContentLoaded", function () { //runs code sfter page fully loads
  const manager = new EcoManager();
  manager.loadUser(); //checks for any saved users to restore to page

  //sign-in button event listener
  const signInForm = document.getElementById("sign-in-form");
  signInForm.addEventListener("submit", function (e) {
    e.preventDefault(); //stops page refresh after filling form
    const username = document.getElementById("username").value.trim();
    if (username === "") return alert("Please enter your name.");
    manager.signIn(username); //logs the user in
    signInForm.reset(); //clears input box so no text remains
  });

  //add action button interactivity
  const addBtn = document.getElementById("add-action-btn");
  addBtn.addEventListener("click", function () {
    const text = document.getElementById("action-input").value.trim();
    const category = document.getElementById("action-category").value;
    //statement to ensure the field is filled before pressing the button
    if (text === "" || category === "select") {
      alert("Please fill in both fields.");
      return;
    }

    manager.addEcoAction(text, category); //saves and displays the new action added 
    //clears the from after pressing the button
    document.getElementById("action-input").value = "";
    document.getElementById("action-category").value = "select";
  });
});