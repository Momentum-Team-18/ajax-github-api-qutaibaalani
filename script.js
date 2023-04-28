// Getting Data Using APIs with JS and Fetch

// Select the DOM element with ID "mainContainer"
let mainContainer = document.querySelector("#mainContainer");
console.log(mainContainer);

// Define the URL to fetch user data from Github
let url = "https://api.github.com/users/qutaibaalani";

// Fetch the user data from Github using the fetch API
fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
})
    // Process the response from Github
    .then(response => {
        // Check if the response is successful
        switch (response.ok) {
            case true:
                // If successful, convert the response to JSON
                return response.json();
        }
    })
    // Process the JSON data returned from Github
    .then(data => {
        // Use the data returned from the API
        console.log(data);
        // Extract relevant user data from the JSON
        let location = data.location;
        let githubUrl = data.html_url;
        let avatarUrl = data.avatar_url;

        // Create a string containing HTML markup to display the user data
        let userInfo = `
    <img src="${avatarUrl}" alt="Profile picture of qutaibaalani">
    <h1 class="myName">Qutaiba Al Ani</h1>
    <p>Location: Raleigh, NC</p>
    <p>Github URL: <a href="${githubUrl}">qutaibaalani</a></p>
    <p>GitHub username: qutaibaalani</p>
    `;
        // Add the user data to the DOM element with ID "mainContainer"
        mainContainer.innerHTML = userInfo;

        // Define the URL to fetch the user's repositories from Github
        let reposUrl = "https://api.github.com/users/qutaibaalani/repos";
        // Fetch the user's repositories from Github using the fetch API
        return fetch(reposUrl, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
    })
    // Process the response from Github for the user's repositories
    .then(response => {
        // Check if the response is successful
        switch (response.ok) {
            case true:
                // If successful, convert the response to JSON
                return response.json();
        }
    })
    // Process the JSON data returned from Github for the user's repositories
    .then(repos => {
        // Use the repositories returned from the API
        console.log(repos);
        // Create a string containing HTML markup to display the user's repositories
        let reposList = "<h2>GitHub Repos:</h2><ul>";
        for (let i = 0, len = repos.length; i < len; i++) {
            let repo = repos[i]; //index "i" in an array called "repos"
            reposList += "<li><a href=\"" + repo.html_url + "\">" + repo.name + "</a></li>";
        }
        // Add the user's repositories to the DOM element with ID "mainContainer"
        mainContainer.innerHTML += reposList;
    });









