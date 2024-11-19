const BASE_URL = "https://unknown07724.github.io/api"; 

/**
 * Fetches the main.json file from a specified subfolder.
 * @param {string} folder - The folder name within the API directory (e.g., "langs", "projects", "users").
 * @returns {Promise<Object>} - The JSON data from main.json in the specified folder.
 */
async function getMainJson(folder) {
    try {
        const url = `${BASE_URL}/${folder}/main.json`;
        const response = await fetch(url);
        if (!response.ok) throw new Error(`Error ${response.status}: ${response.statusText}`);
        return await response.json();
    } catch (error) {
        console.error(`GET request failed for ${folder}/main.json:`, error);
    }
}

/**
 * Fetches all projects and formats their details with creator instead of ID for uniqueness.
 * @returns {Promise<Array<Object>>} - An array of project objects, each with creator and author.
 */
async function getProjects() {
    const projectsData = await getMainJson("projects");
    if (projectsData) {
        return projectsData.map(project => ({
            creator: project.creator, // Use creator for the project to avoid name clashes
            author: project.author
        }));
    }
}

/**
 * Fetches all authors and formats their details based on selected properties.
 * @param {Array<string>} properties - The list of properties to include for each author (e.g., ["ID", "Username", "JoinedDate"]).
 * @returns {Promise<Array<Object>>} - An array of author objects with the selected properties.
 */
async function getAuthors(properties = ["ID", "Username", "JoinedDate"]) {
    const authorsData = await getMainJson("users");
    if (authorsData) {
        return authorsData.map(author => {
            const filteredAuthor = {};
            // Add only the requested properties to the author object
            properties.forEach(property => {
                if (author.hasOwnProperty(property)) {
                    filteredAuthor[property] = author[property];
                }
            });
            return filteredAuthor;
        });
    }
}

/**
 * Fetches all language data from the langs folder.
 * @returns {Promise<Object>} - The JSON data from langs/main.json.
 */
async function getLanguages() {
    return await getMainJson("langs");
}

/**
 * Fetches data from the base API directory's main.json file.
 * @returns {Promise<Object>} - The JSON data from api/main.json.
 */
async function getRootMainJson() {
    return await getMainJson(""); // Root directory
}

// Usage Examples

// Fetch and display all projects with creator instead of ID
getProjects().then(projects => {
    if (projects) {
        projects.forEach(project => {
            console.log(`Project Creator: ${project.creator}, Author: ${project.author}`);
        });
    } else {
        console.log("No projects found.");
    }
});

// Fetch and display authors with specific properties (e.g., ID, Username)
getAuthors(["ID", "Username"]).then(authors => {
    if (authors) {
        authors.forEach(author => {
            console.log(`Author ID: ${author.ID}, Username: ${author.Username}`);
        });
    } else {
        console.log("No authors found.");
    }
});

// Fetch and display authors with all properties (ID, Username, JoinedDate)
getAuthors(["ID", "Username", "JoinedDate"]).then(authors => {
    if (authors) {
        authors.forEach(author => {
            console.log(`Author ID: ${author.ID}, Username: ${author.Username}, Joined Date: ${author.JoinedDate}`);
        });
    } else {
        console.log("No authors found.");
    }
});

// Fetch and display language data
getLanguages().then(languages => {
    console.log("Languages data:", languages);
});

// Fetch and display root main.json data
getRootMainJson().then(rootData => {
    console.log("Root API data:", rootData);
});

