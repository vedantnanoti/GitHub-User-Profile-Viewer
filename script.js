// script.js

const searchButton = document.getElementById("search-btn");
const usernameInput = document.getElementById("username");
const profileContainer = document.getElementById("profile-container");
const errorMessage = document.getElementById("error-message");

// Profile Fields
const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const bio = document.getElementById("bio");
const followers = document.getElementById("followers");
const following = document.getElementById("following");
const repos = document.getElementById("repos");
const profileLink = document.getElementById("profile-link");

// Fetch GitHub user data
async function fetchGitHubProfile(username) {
  const url = `https://api.github.com/users/${username}`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("User not found");
    }

    const data = await response.json();
    displayProfile(data);
  } catch (error) {
    displayError(error.message);
  }
}

// Display profile data
function displayProfile(data) {
  // Show the profile container and hide error message
  profileContainer.classList.remove("hidden");
  errorMessage.classList.add("hidden");

  // Populate fields with data
  avatar.src = data.avatar_url;
  name.innerText = data.name || "No name provided";
  bio.innerText = data.bio || "No bio available";
  followers.innerText = data.followers;
  following.innerText = data.following;
  repos.innerText = data.public_repos;
  profileLink.href = data.html_url;
}

// Display error message
function displayError(message) {
  errorMessage.innerText = message;
  errorMessage.classList.remove("hidden");
  profileContainer.classList.add("hidden");
}

// Handle search button click
searchButton.addEventListener("click", () => {
  const username = usernameInput.value.trim();
  if (username) {
    fetchGitHubProfile(username);
  }
});
