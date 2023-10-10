// // "use strict";

// // /******************************************************************************
// //  * Handling navbar clicks and updating navbar
// //  */

// // const $favoritedStories = $("#favorited-stories");
// // /** Show main list of all stories when click site name */

// // function navAllStories(evt) {
// // 	console.debug("navAllStories", evt);
// // 	hidePageComponents();
// // 	putStoriesOnPage();
// // }

// // $body.on("click", "#nav-all", navAllStories);

// // /** Show login/signup on click on "login" */

// // function navLoginClick(evt) {
// // 	console.debug("navLoginClick", evt);
// // 	hidePageComponents();
// // 	$loginForm.show();
// // 	$signupForm.show();
// // }

// // $navLogin.on("click", navLoginClick);

// // /** When a user first logins in, update the navbar to reflect that. */

// // function updateNavOnLogin() {
// // 	console.debug("updateNavOnLogin");
// // 	$(".main-nav-links").show();
// // 	$navLogin.hide();
// // 	$navLogOut.show();
// // 	$navUserProfile.text(`${currentUser.username}`).show();
// // }

// // //Shows the user profile when they click on "profile" in the navbar
// // function navUserProfileClick(evt) {
// // 	console.debug("navUserProfileClick", evt);
// // 	hidePageComponents();
// // }

// // //Attach the click event handler to the navbar link
// // $navUserProfile.on("click", navUserProfileClick);

// // //Creates the "Submit" link
// // const $navSubmit = $("<a>", {
// // 	class: "nav-link",
// // 	href: "#",
// // 	id: "nav-submit:",
// // 	text: "| Submit",
// // });

// // const $navFavorites = $("<a>", {
// // 	class: "nav-link",
// // 	href: "#",
// // 	id: "nav-favorites",
// // 	text: "| Favorited",
// // });

// // //Attach a click event handler to the submit link
// // $navSubmit.on("click", function (evt) {
// // 	evt.preventDefault();
// // 	hidePageComponents();
// // 	$submitForm.show();
// // });

// // //Event listener for the "Favorited" link
// // $navFavorites.on("click", async function (evt) {
// // 	evt.preventDefault();
// // 	hidePageComponents();
// // 	await displayFavoritedStories();
// // });

// // //Create a function to display favorited stories
// // async function displayFavoritedStories() {
// // 	if (!currentUser) {
// // 		return; //This makes it so if the user is logged in, it does nothing
// // 	}
// // 	$favoritedStories.empty();

// // 	if (currentUser.favorites.length === 0) {
// // 		$favoritedStories.append("<p>No favorited stories yet!</p>");
// // 	} else {
// // 		//Loops through the user's favorited stories and display them
// // 		for (let story of currentUser.favorites) {
// // 			const $story = generateStoryMarkup(story);
// // 			let $favoriteButton = createFavoriteButton(story);
// // 			$favoriteButton.on("click", async function () {
// // 				if (isFavorite) {
// // 					await currentUser.unfavoriteStory(story);
// // 					$favoriteButton.removeClass("fas").addClass("far");
// // 				} else {
// // 					await currentUser.favoriteStory(story);
// // 					$favoriteButton.removeClass("far").addClass("fas");
// // 				}
// // 				isFavorite = !isFavorite;
// // 				updateFavoriteButton($favoriteButton, isFavorite);
// // 			});

// // 			$story.append($favoriteButton);
// // 			$favoritedStories.append($story);
// // 		}
// // 	}

// // 	$favoritedStories.show();
// // }

// // // function createFavoriteButton(story) {
// // // 	let isFavorite = story.isFavorite(currentUser);
// // // 	const starIconClass = isFavorite ? "fas fa-star" : "far fa-star";
// // // 	const $favoriteButton = $("<i>", {
// // // 		// class: `favorite-button`,
// // // 		class: `favorite-button ${starIconClass}`,
// // // 		"data-story-id": story.storyId,
// // // 	});

// // // 	$favoriteButton.on("click", async function () {
// // // 		if (isFavorite) {
// // // 			await currentUser.unfavoriteStory(story);
// // // 			$favoriteButton.removeClass("fas").addClass("far");
// // // 		} else {
// // // 			await currentUser.favoriteStory(story);
// // // 			$favoriteButton.removeClass("far").addClass("fas");
// // // 		}
// // // 		isFavorite = !isFavorite;
// // // 		updateFavoriteButton($favoriteButton, isFavorite);
// // // 	});
// // // 	return $favoriteButton;
// // // }

// // // function updateFavoriteButton($button, isFavorite) {
// // // 	const starIconClass = isFavorite ? "fas fa-star" : "far fa-star";
// // // 	$button.removeClass("fas fa-star far fa-star").addClass(starIconClass);
// // // }

// // function createFavoriteButton(story) {
// // 	let isFavorite = story.isFavorite(currentUser);
// // 	const starIconClass = isFavorite ? "fas fa-star" : "far fa-star";
// // 	const $favoriteButton = $("<i>", {
// // 		class: `favorite-button ${starIconClass}`,
// // 		"data-story-id": story.storyId,
// // 	});

// // 	return $favoriteButton;
// // }
// // //Append the submit link to the navbar
// // $(".navbar-brand").append($navSubmit, $navFavorites);

// // "use strict";

// // /******************************************************************************
// //  * Handling navbar clicks and updating navbar
// //  */

// // const $favoritedStories = $("#favorited-stories");

// // /** Show main list of all stories when clicking site name */
// // function navAllStories(evt) {
// // 	console.debug("navAllStories", evt);
// // 	hidePageComponents();
// // 	putStoriesOnPage();
// // }

// // $body.on("click", "#nav-all", navAllStories);

// // /** Show login/signup form when clicking "login" */
// // function navLoginClick(evt) {
// // 	console.debug("navLoginClick", evt);
// // 	hidePageComponents();
// // 	$loginForm.show();
// // 	$signupForm.show();
// // }

// // $navLogin.on("click", navLoginClick);

// // /** Update the navbar when a user first logs in */
// // function updateNavOnLogin() {
// // 	console.debug("updateNavOnLogin");
// // 	$(".main-nav-links").show();
// // 	$navLogin.hide();
// // 	$navLogOut.show();
// // 	$navUserProfile.text(`${currentUser.username}`).show();
// // }

// // // Show the user profile when clicking on "profile" in the navbar
// // function navUserProfileClick(evt) {
// // 	console.debug("navUserProfileClick", evt);
// // 	hidePageComponents();
// // 	$userProfile.show(); // Show the user profile page
// // }

// // // Attach the click event handler to the navbar link
// // $navUserProfile.on("click", navUserProfileClick);

// // // Create the "Submit" and "Favorites" links
// // const $navSubmit = $("<a>", {
// // 	class: "nav-link",
// // 	href: "#",
// // 	id: "nav-submit",
// // 	text: "| Submit",
// // });

// // const $navFavorites = $("<a>", {
// // 	class: "nav-link",
// // 	href: "#",
// // 	id: "nav-favorites",
// // 	text: "| Favorited",
// // });

// // // Attach a click event handler to the "Submit" link
// // $navSubmit.on("click", function (evt) {
// // 	evt.preventDefault();
// // 	hidePageComponents();
// // 	$submitForm.show();
// // });

// // // Event listener for the "Favorites" link
// // $navFavorites.on("click", async function (evt) {
// // 	evt.preventDefault();
// // 	hidePageComponents();
// // 	await displayFavoritedStories();
// // });

// // // Create a function to display favorited stories
// // async function displayFavoritedStories() {
// // 	if (!currentUser) {
// // 		return; // This makes it do nothing if the user is not logged in
// // 	}
// // 	$favoritedStories.empty();

// // 	if (currentUser.favorites.length === 0) {
// // 		$favoritedStories.append("<p>No favorited stories yet!</p>");
// // 	} else {
// // 		for (let story of currentUser.favorites) {
// // 			const $story = generateStoryMarkup(story);
// // 			const $starButton = createFavoriteButton(story);

// // 			// let isFavorite = story.isFavorite(currentUser);
// // 			// let $favoriteButton = createFavoriteButton(story); // Declare $favoriteButton here
// // 			$starButton.on("click", async function () {
// // 				if (story.isFavorite(currentUser)) {
// // 					await currentUser.unfavoriteStory(story);
// // 					$starButton.removeClass("fas").addClass("far");
// // 					$starButton.data("is-favorite", false);
// // 				} else {
// // 					await currentUser.favoriteStory(story);
// // 					$starButton.removeClass("far").addClass("fas");
// // 					$starButton.data("is-favorite", true);
// // 				}
// // 			});

// // 			if (story.isFavorite(currentUser)) {
// // 				$starButton.removeClass("far").addClass("fas");
// // 				$starButton.data("is-favorite", true);
// // 			} else {
// // 				$starButton.removeClass("fas").addClass("far");
// // 				$starButton.data("is-favorite", false);
// // 			}
// // 			// const $starIcon = $("<i>", {
// // 			// 	class: "favorite-button",
// // 			// 	"data-story-id": story.storyId,
// // 			// });

// // 			// $starButton.on("click", async function () {
// // 			// 	if (story.isFavorite(currentUser)) {
// // 			// 		await currentUser.unfavoriteStory(story);

// // 			// 		$starButton.removeClass("fas").addClass("far");
// // 			// 	} else {
// // 			// 		await currentUser.favoriteStory(story);

// // 			// 		$starButton.removeClass("far").addClass("fas");
// // 			// 	}
// // 			// });

// // 			// $favoriteButton.on("click", async function () {
// // 			// 	if (isFavorite) {
// // 			// 		await currentUser.unfavoriteStory(story);
// // 			// 		$favoriteButton.removeClass("fas").addClass("far");
// // 			// 	} else {
// // 			// 		await currentUser.favoriteStory(story);
// // 			// 		$favoriteButton.removeClass("far").addClass("fas");
// // 			// 	}
// // 			// 	isFavorite = !isFavorite;
// // 			// 	// updateFavoriteButton($favoriteButton, isFavorite);
// // 			// });

// // 			// createFavoriteButton(story, $starIcon);

// // 			$story.append($starButton);
// // 			$favoritedStories.append($story);
// // 		}
// // 	}

// // 	$favoritedStories.show();
// // }

// // // Create a function to create a favorite button for a story
// // function createFavoriteButton(story) {
// // 	// let isFavorite = story.isFavorite(currentUser);
// // 	// const starIconClass = isFavorite ? "fas" : "far";
// // 	// $starIcon.addClass(starIconClass);
// // 	const $favoriteButton = $("<i>", {
// // 		// class: `favorite-button ${starIconClass}`,
// // 		// "data-story-id": story.storyId,
// // 		class: "favorite-button far fa-star",
// // 		"data-story-id": story.storyId,
// // 	});
// // 	// $favoriteButton.on("click", async function () {
// // 	// 	if (isFavorite) {
// // 	// 		await currentUser.unfavoriteStory(story);
// // 	// 		$favoriteButton.removeClass("fas").addClass("far");
// // 	// 	} else {
// // 	// 		await currentUser.favoriteStory(story);
// // 	// 		$favoriteButton.removeClass("far").addClass("fas");
// // 	// 	}
// // 	// displayFavoritedStories(); // Refresh the favorites page after the change
// // 	return $favoriteButton;
// // }

// // // Append the "Submit" and "Favorites" links to the navbar
// // $(".navbar-brand").append($navSubmit, $navFavorites);

// "use strict";

// /******************************************************************************
//  * Handling navbar clicks and updating navbar
//  */

// const $favoritedStories = $("#favorited-stories");

// /** Show main list of all stories when clicking site name */
// function navAllStories(evt) {
// 	console.debug("navAllStories", evt);
// 	hidePageComponents();
// 	putStoriesOnPage();
// }

// $body.on("click", "#nav-all", navAllStories);

// /** Show login/signup form when clicking "login" */
// function navLoginClick(evt) {
// 	console.debug("navLoginClick", evt);
// 	hidePageComponents();
// 	$loginForm.show();
// 	$signupForm.show();
// }

// $navLogin.on("click", navLoginClick);

// /** Update the navbar when a user first logs in */
// function updateNavOnLogin() {
// 	console.debug("updateNavOnLogin");
// 	$(".main-nav-links").show();
// 	$navLogin.hide();
// 	$navLogOut.show();
// 	$navUserProfile.text(`${currentUser.username}`).show();
// }

// // Show the user profile when clicking on "profile" in the navbar
// function navUserProfileClick(evt) {
// 	console.debug("navUserProfileClick", evt);
// 	hidePageComponents();
// 	$userProfile.show(); // Show the user profile page
// }

// // Attach the click event handler to the navbar link
// $navUserProfile.on("click", navUserProfileClick);

// // Create the "Submit" and "Favorites" links
// const $navSubmit = $("<a>", {
// 	class: "nav-link",
// 	href: "#",
// 	id: "nav-submit",
// 	text: "| Submit",
// });

// const $navFavorites = $("<a>", {
// 	class: "nav-link",
// 	href: "#",
// 	id: "nav-favorites",
// 	text: "| Favorited",
// });

// // Attach a click event handler to the "Submit" link
// $navSubmit.on("click", function (evt) {
// 	evt.preventDefault();
// 	hidePageComponents();
// 	$submitForm.show();
// });

// // Event listener for the "Favorites" link
// $navFavorites.on("click", async function (evt) {
// 	evt.preventDefault();
// 	hidePageComponents();
// 	await displayFavoritedStories();
// });

// // Create a function to display favorited stories
// async function displayFavoritedStories() {
// 	if (!currentUser) {
// 		return; // This makes it do nothing if the user is not logged in
// 	}
// 	$favoritedStories.empty();

// 	if (currentUser.favorites.length === 0) {
// 		$favoritedStories.append("<p>No favorited stories yet!</p>");
// 	} else {
// 		for (let story of currentUser.favorites) {
// 			const $story = generateStoryMarkup(story);
// 			const $starButton = createFavoriteButton(story);

// 			// Set the initial state based on whether it's favorited or not
// 			if (story.isFavorite(currentUser)) {
// 				$starButton.removeClass("far").addClass("fas");
// 			} else {
// 				$starButton.removeClass("fas").addClass("far");
// 			}

// 			$story.append($starButton);
// 			$favoritedStories.append($story);
// 		}
// 	}

// 	$favoritedStories.show();
// }

// // Create a function to create a favorite button for a story
// function createFavoriteButton(story) {
// 	const $favoriteButton = $("<i>", {
// 		class: "favorite-button far fa-star",
// 		"data-story-id": story.storyId,
// 	});

// 	$favoriteButton.on("click", async function () {
// 		if (story.isFavorite(currentUser)) {
// 			await currentUser.unfavoriteStory(story);
// 			$favoriteButton.removeClass("fas").addClass("far");
// 		} else {
// 			await currentUser.favoriteStory(story);
// 			$favoriteButton.removeClass("far").addClass("fas");
// 		}

// 		// Toggle the class and data attribute
// 		const isFavorite = $favoriteButton.hasClass("fas");
// 		$favoriteButton.data("is-favorite", isFavorite);
// 	});
// 	return $favoriteButton;
// }

// // Append the "Submit" and "Favorites" links to the navbar
// $(".navbar-brand").append($navSubmit, $navFavorites);

"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */
//This function is called when the site name is clicked. Hides all the page components and then call 'putStoriesOnPage'
function navAllStories(evt) {
	console.debug("navAllStories", evt);
	hidePageComponents();
	putStoriesOnPage();
}

//This line uses jQuery to attach a click evetn handler to the element wit the ID "#nav-all". Triggers navAllStories.
$body.on("click", "#nav-all", navAllStories);

/** Show story submit form on clicking story "submit" */

//This function is called when the submit link in the navigation bar is clicked. It hides all page components, shows the list of stories and displays the story submisson form.
function navSubmitStoryClick(evt) {
	console.debug("navSubmitStoryClick", evt);
	hidePageComponents();
	$allStoriesList.show();
	$submitForm.show();
}

//Attaches a click event handler to the leent ID #navSubmitStoryClick.  Triggers the function.
$navSubmitStory.on("click", navSubmitStoryClick);

/** Show favorite stories on click on "favorites" */

//This function is called when the "favorites" link in the nav bar is clicked. Hides the page compnents and then calls putFavoritesListOnPage to display the favorites page.
function navFavoritesClick(evt) {
	console.debug("navFavoritesClick", evt);
	hidePageComponents();
	putFavoritesListOnPage();
}

//Attaches a click event handler to the element with the ID of #nav-favorites. Triggers navFavoritesClick function
$body.on("click", "#nav-favorites", navFavoritesClick);

/** Show My Stories on clicking "my stories" */

//This function is called when the my stories link in the nav bar is clicked. It hides all the page componenets, displays the user's own stories, and shows the my stories section.
function navMyStories(evt) {
	console.debug("navMyStories", evt);
	hidePageComponents();
	putUserStoriesOnPage();
	$ownStories.show();
}

//Event handler for navMyStories. When clicked triggers the navMyStories function
$body.on("click", "#nav-my-stories", navMyStories);

/** Show login/signup on click on "login" */

//This function is called when the login link iin the nav bar is clicked.  Hides page components, displays the log in and signup form, hides the stories.
function navLoginClick(evt) {
	console.debug("navLoginClick", evt);
	hidePageComponents();
	$loginForm.show();
	$signupForm.show();
	$storiesContainer.hide();
}

//Event handler for above function.  Triggered when login is clicked to trigger navLoginClick function.
$navLogin.on("click", navLoginClick);

/** Hide everything but profile on click on "profile" */

//This function is called when the profile link in the nav bar is clicked.  Hides page componnents and shows the user profile.
function navProfileClick(evt) {
	console.debug("navProfileClick", evt);
	hidePageComponents();
	$userProfile.show();
}

//Event handler for above function.  Triggers when user logs in.  Triggers nAvProfileClick.
$navUserProfile.on("click", navProfileClick);

/** When a user first logins in, update the navbar to reflect that. */

//Thus function is called wheb the user logs in. It updates the navigation bar to reflect that the user is logged in by showing appropriate link and hiding the login link.
function updateNavOnLogin() {
	console.debug("updateNavOnLogin");
	//Sets up the CSS display property of elements with the class .main-nav0links to flex to show the navigation links.
	$(".main-nav-links").css("display", "flex");
	//Hides the login link
	$navLogin.hide();
	// Shows the logout link and sets the text of the user profile to the current usewrs username
	$navLogOut.show();
	$navUserProfile.text(`${currentUser.username}`).show();
}
