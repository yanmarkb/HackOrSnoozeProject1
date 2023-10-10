"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

//This function is called when the site first loads to fetch and siaplay stories.
async function getAndShowStoriesOnStart() {
	//Assigsn the results of 'Story.getStories() to storyList
	storyList = await StoryList.getStories();
	//Removes loading message from the page.
	$storiesLoadingMsg.remove();
	//Calls putStoriesOnPage to display the stories on the page.
	putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 * - showDeleteBtn: show delete button?
 *
 * Returns the markup for the story.
 */

//This function generates the HTML markup for an individual story. It takes a 'story' object and an optional 'showDeleteBtn' parameter. Defaults to false.
function generateStoryMarkup(story, showDeleteBtn = false) {
	// console.debug("generateStoryMarkup", story);

	const hostName = story.getHostName();

	// if a user is logged in, show favorite/not-favorite star
	const showStar = Boolean(currentUser);

	return $(`
      <li id="${story.storyId}">
        <div>
        ${showDeleteBtn ? getDeleteBtnHTML() : ""}
        ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <div class="story-author">by ${story.author}</div>
        <div class="story-user">posted by ${story.username}</div>
        </div>
      </li>
    `);
}

/** Make delete button HTML for story */

//This function generates the HTML for the delete button (trash can)
function getDeleteBtnHTML() {
	return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

/** Make favorite/not-favorite star for story */

//This function generates the HTML for a star icon for favoriting/unfavoriting a story. Checks if the story is already favorited to determine the star's appearance.
function getStarHTML(story, user) {
	const isFavorite = user.isFavorite(story);
	const starType = isFavorite ? "fas" : "far";
	return `
      <span class="star">
        <i class="${starType} fa-star"></i>
      </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

//This function populates the page with a list of stories.
function putStoriesOnPage() {
	console.debug("putStoriesOnPage");
	//Empties the list of stories
	$allStoriesList.empty();

	// loop through all of our stories and generate HTML for them
	for (let story of storyList.stories) {
		//Generates HTML for each story
		const $story = generateStoryMarkup(story);
		//Appends the generated HTL to the list of stories on the page.
		$allStoriesList.append($story);
	}

	$allStoriesList.show();
}

/** Handle deleting a story. */

//This function handles the deletion of a story when a user clicks the delete button.
async function deleteStory(evt) {
	console.debug("deleteStory");

	//It identifies the clicked story's ID and removes it from both the storyList and the user's list of own stories.
	const $closestLi = $(evt.target).closest("li");
	const storyId = $closestLi.attr("id");
	await storyList.removeStory(currentUser, storyId);

	// re-generate story list
	//Refreshes the user's list of stories on the page
	await putUserStoriesOnPage();
}

//This line attaches a click event handler to the trahs can icon. Triggers deleteStory function
$ownStories.on("click", ".trash-can", deleteStory);

/** Handle submitting new story form. */

//This function handles the submission of a new story.
async function submitNewStory(evt) {
	console.debug("submitNewStory");
	//Prevents default form submission behavior.
	evt.preventDefault();

	// grab all info from form
	const title = $("#create-title").val();
	const url = $("#create-url").val();
	const author = $("#create-author").val();
	const username = currentUser.username;
	const storyData = { title, url, author, username };
	//Add the story, generates HTML for the story, and prepends it to the list of stories on the page.
	const story = await storyList.addStory(currentUser, storyData);
	const $story = generateStoryMarkup(story);
	$allStoriesList.prepend($story);

	// hide the form and reset it
	$submitForm.slideUp("slow");
	$submitForm.trigger("reset");
}

$submitForm.on("submit", submitNewStory);

/******************************************************************************
 * Functionality for list of user's own stories
 */
//This function displays a user's own stories on the page.
function putUserStoriesOnPage() {
	console.debug("putUserStoriesOnPage");
	//Empties the list of user's stories.
	$ownStories.empty();
	//If there is no stories it displays a message.
	if (currentUser.ownStories.length === 0) {
		$ownStories.append("<h5>No stories added by user yet!</h5>");
	} else {
		// loop through all of users stories and generate HTML for them
		for (let story of currentUser.ownStories) {
			let $story = generateStoryMarkup(story, true);
			$ownStories.append($story);
		}
	}

	$ownStories.show();
}

/******************************************************************************
 * Functionality for favorites list and starr/un-starr a story
 */

/** Put favorites list on page. */

//Displays a list of user's favorite stories on the page.
function putFavoritesListOnPage() {
	console.debug("putFavoritesListOnPage");
	//Empties the list of favorites
	$favoritedStories.empty();
	//If user has no favorites, it displays a message
	if (currentUser.favorites.length === 0) {
		$favoritedStories.append("<h5>No favorites added!</h5>");
	} else {
		// loop through all of users favorites and generate HTML for them
		for (let story of currentUser.favorites) {
			//Generates HTML for each favorite story and appends it to the favorites list.
			const $story = generateStoryMarkup(story);
			$favoritedStories.append($story);
		}
	}

	$favoritedStories.show();
}

/** Handle favorite/un-favorite a story */

//This function handles toggling the favorite status of a story when the star icon is clicked.
async function toggleStoryFavorite(evt) {
	console.debug("toggleStoryFavorite");

	const $tgt = $(evt.target);
	const $closestLi = $tgt.closest("li");
	const storyId = $closestLi.attr("id");
	const story = storyList.stories.find((s) => s.storyId === storyId);

	// see if the item is already favorited (checking by presence of star)
	if ($tgt.hasClass("fas")) {
		// currently a favorite: remove from user's fav list and change star
		await currentUser.removeFavorite(story);
		$tgt.closest("i").toggleClass("fas far");
	} else {
		// currently not a favorite: do the opposite
		await currentUser.addFavorite(story);
		$tgt.closest("i").toggleClass("fas far");
	}
}

//This line attaches a click event handler to the elements with the class 'star' within the '.stories-list' seciton. When a star is clicked, it triggers the 'toggleStoryFavorite' function
$storiesLists.on("click", ".star", toggleStoryFavorite);
