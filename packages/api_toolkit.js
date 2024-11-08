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
 * Fetches all projects and formats their names and authors.
 * @returns {Promise<Array<Object>>} - An array of project objects, each with a name and author.
 */
async function getProjects() {
    const projectsData = await getMainJson("projects");
    if (projectsData) {
        return projectsData.map(project => ({
            name: project.name,
            author: project.author
        }));
    }
}

/**
 * Fetches all authors and formats their details.
 * @returns {Promise<Array<Object>>} - An array of author objects, each with Name, Bio, and ID.
 */
async function getAuthors() {
    const authorsData = await getMainJson("users");
    if (authorsData) {
        return authorsData.map(author => ({
            name: author.Name,
            bio: author.Bio,
            id: author.ID
        }));
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

// Fetch and display all projects
getProjects().then(projects => {
    if (projects) {
        projects.forEach(project => {
            console.log(`Project Name: ${project.name}, Author: ${project.author}`);
        });
    } else {
        console.log("No projects found.");
    }
});

// Fetch and display all authors
getAuthors().then(authors => {
    if (authors) {
        authors.forEach(author => {
            console.log(`Author: ${author.name}, Bio: ${author.bio}, ID: ${author.id}`);
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
