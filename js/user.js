"use strict";

// global to hold the User instance of the currently-logged-in user
let currentUser;

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */

//This function defines an asynchronous function called login that is triggered when a user submits a login form.
async function login(evt) {
	console.debug("login", evt);
	//First is prevents default form submission behavior.
	evt.preventDefault();

	// Retrieves the username and password from the login form.
	const username = $("#login-username").val();
	const password = $("#login-password").val();

	// User.login retrieves user info from API and returns User instance
	// which we'll make the globally-available, logged-in user.

	//Calls the user.login function with the username and password as arguments to retrieve user information from the API.
	currentUser = await User.login(username, password);

	//Once the user information is retrieved, it sets the currentUSer variable to the retrieves user instance and triggers a resrt on the login form.
	$loginForm.trigger("reset");

	//Finally, it saves the user's credentials in local storage and updates the UI on user login.
	saveUserCredentialsInLocalStorage();
	updateUIOnUserLogin();
}

$loginForm.on("submit", login);

/** Handle signup form submission. */

//This function defines a asynchronous function called signup that is triggered when a user submits a form to sign up for an account.
async function signup(evt) {
	console.debug("signup", evt);
	//Prevents default form submission behavior.
	evt.preventDefault();

	//Retrieves values for name, username, and password
	const name = $("#signup-name").val();
	const username = $("#signup-username").val();
	const password = $("#signup-password").val();

	// User.signup retrieves user info from API and returns User instance
	// which we'll make the globally-available, logged-in user.

	//Calls the User.signup function with these values. Retries user information from the API and truens a user instance, which is then assigned to the currentUser variable.
	currentUser = await User.signup(username, password, name);

	//Saves the user's credentals in local storage, updates the UI to reflect the user's login status and resets the form.
	saveUserCredentialsInLocalStorage();
	updateUIOnUserLogin();

	$signupForm.trigger("reset");
}
//Event handler for signup.  Triggers when form is submitted.
$signupForm.on("submit", signup);

/** Handle click of logout button
 *
 * Remove their credentials from localStorage and refresh page
 */

//This function defines logout that takes an event object as a parameter.
function logout(evt) {
	//When it is called it logs this message.
	console.debug("logout", evt);
	//Clears local storage
	localStorage.clear();
	//Reloads the page.
	location.reload();
}

//Event handler for when log out is clicked.
$navLogOut.on("click", logout);

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */

//Defines a asynchronous functin for checkForRememberedUser that checks if there are any stored crednetials in the brows's local storage.
async function checkForRememberedUser() {
	console.debug("checkForRememberedUser");
	const token = localStorage.getItem("token");
	const username = localStorage.getItem("username");
	if (!token || !username) return false;

	// try to log in with these credentials (will be null if login failed)
	currentUser = await User.loginViaStoredCredentials(token, username);
}

/** Sync current user information to localStorage.
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */

function saveUserCredentialsInLocalStorage() {
	console.debug("saveUserCredentialsInLocalStorage");
	if (currentUser) {
		localStorage.setItem("token", currentUser.loginToken);
		localStorage.setItem("username", currentUser.username);
	}
}

/******************************************************************************
 * General UI stuff about users & profiles
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

async function updateUIOnUserLogin() {
	console.debug("updateUIOnUserLogin");

	hidePageComponents();

	// re-display stories (so that "favorite" stars can appear)
	putStoriesOnPage();
	$allStoriesList.show();

	updateNavOnLogin();
	generateUserProfile();
	$storiesContainer.show();
}

/** Show a "user profile" part of page built from the current user's info. */

function generateUserProfile() {
	console.debug("generateUserProfile");

	$("#profile-name").text(currentUser.name);
	$("#profile-username").text(currentUser.username);
	$("#profile-account-date").text(currentUser.createdAt.slice(0, 10));
}
