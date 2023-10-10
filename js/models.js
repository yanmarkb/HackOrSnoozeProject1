"use strict";

//This line defines BASE_URL for the API that the application will iteract with.
const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

/******************************************************************************
 * Story: a single story in the system
 */

//Defines story class.  Represetns a single story in the system and has several methods and properties for handling story data.
class Story {
	/** Make instance of Story from data object about story:
	 *   - {storyId, title, author, url, username, createdAt}
	 */
	constructor({ storyId, title, author, url, username, createdAt }) {
		this.storyId = storyId;
		this.title = title;
		this.author = author;
		this.url = url;
		this.username = username;
		this.createdAt = createdAt;
	}

	/** Parses hostname out of URL and returns it. */
	//this method extracts the hostname from the stories URL and returns it.
	getHostName() {
		return new URL(this.url).host;
	}
}

/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

//Defines the storylist class.  Represents a list of story instances and provides methods for interacting with this list.
class StoryList {
	//Takes an array of "stories" as its parameter and initializes the 'stories' property with it.
	constructor(stories) {
		this.stories = stories;
	}

	/** Generate a new StoryList. It:
	 *
	 *  - calls the API
	 *  - builds an array of Story instances
	 *  - makes a single StoryList instance out of that
	 *  - returns the StoryList instance.
	 */
	//Fetches a list of stories from the API and return a "Storylist" instance containing those stories
	static async getStories() {
		// Note presence of `static` keyword: this indicates that getStories is
		//  **not** an instance method. Rather, it is a method that is called on the
		//  class directly. Why doesn't it make sense for getStories to be an
		//  instance method?

		// query the /stories endpoint (no auth required)
		try {
			const response = await axios({
				url: `${BASE_URL}/stories`,
				method: "GET",
			});

			// turn plain old story objects from API into instances of Story class
			const stories = response.data.stories.map((story) => new Story(story));

			// build an instance of our own class using the new array of stories
			return new StoryList(stories);
		} catch (error) {
			console.error("Error fetching stories:", error);
			throw error;
		}
	}

	/** Adds story data to API, makes a Story instance, adds it to story list.
	 * - user - the current instance of User who will post the story
	 * - obj of {title, author, url}
	 *
	 * Returns the new Story instance
	 */
	//This method allows users to add a new storyto the list. It sends a request to the API to create a new story and then adds it to the stories array.
	async addStory(user, { title, author, url }) {
		try {
			const token = user.loginToken;
			const response = await axios({
				method: "POST",
				url: `${BASE_URL}/stories`,
				data: { token, story: { title, author, url } },
			});

			const story = new Story(response.data.story);
			this.stories.unshift(story);
			user.ownStories.unshift(story);

			return story;
		} catch (error) {
			console.error("Error adding story:", error);
		}
	}

	/** Delete story from API and remove from the story lists.
	 *
	 * - user: the current User instance
	 * - storyId: the ID of the story you want to remove
	 */
	//This method allows a user to delete a story from the stories list. It sends a request to the API to delete the story and removes it from the 'stories' array.
	async removeStory(user, storyId) {
		try {
			const token = user.loginToken;
			await axios({
				url: `${BASE_URL}/stories/${storyId}`,
				method: "DELETE",
				data: { token: user.loginToken },
			});

			// filter out the story whose ID we are removing
			this.stories = this.stories.filter((story) => story.storyId !== storyId);

			// do the same thing for the user's list of stories & their favorites
			user.ownStories = user.ownStories.filter((s) => s.storyId !== storyId);
			user.favorites = user.favorites.filter((s) => s.storyId !== storyId);
		} catch (error) {
			console.error("Error removing story:", error);
			throw error;
		}
	}
}

/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

//Represents a user in the system and includes methods for user-related actions.
class User {
	/** Make user instance from obj of user data and a token:
	 *   - {username, name, createdAt, favorites[], ownStories[]}
	 *   - token
	 */

	//This constructor takes an object with user data and a'token' parameter to create a user instance. It initializes properties like 'useername', 'name', 'createdAt', 'favorites', 'ownStories', and 'loginToken'

	constructor(
		{ username, name, createdAt, favorites = [], ownStories = [] },
		token
	) {
		this.username = username;
		this.name = name;
		this.createdAt = createdAt;

		// instantiate Story instances for the user's favorites and ownStories
		this.favorites = favorites.map((s) => new Story(s));
		this.ownStories = ownStories.map((s) => new Story(s));

		// store the login token on the user so it's easy to find for API calls.
		this.loginToken = token;
	}

	/** Register new user in API, make User instance & return it.
	 *
	 * - username: a new username
	 * - password: a new password
	 * - name: the user's full name
	 */

	//Both signup and login methods allow users to register and login. They send requests to the API and create user instances if successful.
	static async signup(username, password, name) {
		try {
			const response = await axios({
				url: `${BASE_URL}/signup`,
				method: "POST",
				data: { user: { username, password, name } },
			});

			let { user } = response.data;

			return new User(
				{
					username: user.username,
					name: user.name,
					createdAt: user.createdAt,
					favorites: user.favorites,
					ownStories: user.stories,
				},
				response.data.token
			);
		} catch (error) {
			if (error.response && error.response.status === 409) {
				console.error(
					"Username is already taken. Please choose a different username."
				);
			} else {
				console.error("Error signing up:", error);
			}
			throw error;
		}
	}

	/** Login in user with API, make User instance & return it.

   * - username: an existing user's username
   * - password: an existing user's password
   */

	//Both signup and login methods allow users to register and login. They send requests to the API and create user instances if successful.
	static async login(username, password) {
		try {
			const response = await axios({
				url: `${BASE_URL}/login`,
				method: "POST",
				data: { user: { username, password } },
			});

			let { user } = response.data;

			return new User(
				{
					username: user.username,
					name: user.name,
					createdAt: user.createdAt,
					favorites: user.favorites,
					ownStories: user.stories,
				},
				response.data.token
			);
		} catch (error) {
			console.error("Error logging in:", error);
			throw error;
		}
	}
	/** When we already have credentials (token & username) for a user,
	 *   we can log them in automatically. This function does that.
	 */

	//This method allows a user to add or remove stories from their list of favorites.

	static async loginViaStoredCredentials(token, username) {
		try {
			const response = await axios({
				url: `${BASE_URL}/users/${username}`,
				method: "GET",
				params: { token },
			});

			let { user } = response.data;

			return new User(
				{
					username: user.username,
					name: user.name,
					createdAt: user.createdAt,
					favorites: user.favorites,
					ownStories: user.stories,
				},
				token
			);
		} catch (err) {
			console.error("loginViaStoredCredentials failed", err);
			return null;
		}
	}

	/** Add a story to the list of user favorites and update the API
	 * - story: a Story instance to add to favorites
	 */

	//This method allows a user to add stories to their favorite list.
	async addFavorite(story) {
		try {
			this.favorites.push(story);
			await this._addOrRemoveFavorite("add", story);
		} catch (error) {
			console.error("Error adding favorite:", error);
			throw error;
		}
	}

	/** Remove a story to the list of user favorites and update the API
	 * - story: the Story instance to remove from favorites
	 */

	//This method allows users to remove stories from their favorite list
	async removeFavorite(story) {
		try {
			this.favorites = this.favorites.filter(
				(s) => s.storyId !== story.storyId
			);
			await this._addOrRemoveFavorite("remove", story);
		} catch (error) {
			console.error("Error removing favorite:", error);
			throw error;
		}
	}

	/** Update API with favorite/not-favorite.
	 *   - newState: "add" or "remove"
	 *   - story: Story instance to make favorite / not favorite
	 * */
	//Updates API about stories list
	async _addOrRemoveFavorite(newState, story) {
		try {
			const method = newState === "add" ? "POST" : "DELETE";
			const token = this.loginToken;
			await axios({
				url: `${BASE_URL}/users/${this.username}/favorites/${story.storyId}`,
				method: method,
				data: { token },
			});
		} catch (error) {
			console.error("Error updating favorite:", error);
			throw error;
		}
	}

	/** Return true/false if given Story instance is a favorite of this user. */

	//This method checks if a specific story is marked as a favorite by the user.
	isFavorite(story) {
		return this.favorites.some((s) => s.storyId === story.storyId);
	}
}
