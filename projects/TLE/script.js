// Function to fetch events data from the JSON file
async function fetchEvents() {
  const response = await fetch('events.json');
  const data = await response.json();
  return data;
}

// Function to filter events based on selected filters
function filterEvents(events, filters) {
  return events.filter(event => {
    let matches = true;

    if (filters.nation && event.nation !== filters.nation) matches = false;
    if (filters.season && event.season !== filters.season) matches = false;
    if (filters.century && event.century !== filters.century) matches = false;
    if (filters.period && event.period !== filters.period) matches = false;

    return matches;
  });
}

// Function to display events
function displayEvents(filteredEvents) {
  const eventList = document.getElementById('event-list');
  eventList.innerHTML = ""; // Clear previous results
  
  filteredEvents.forEach(event => {
    const eventItem = document.createElement('div');
    eventItem.classList.add('event-item');
    
    eventItem.innerHTML = `
      <h3>${event.event_name}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Start Date:</strong> ${event.start_date}</p>
      <p><strong>End Date:</strong> ${event.end_date || "N/A"}</p>
      <p><strong>Period:</strong> ${event.period}</p>
      <p><strong>Description:</strong> ${event.description}</p>
    `;
    
    eventList.appendChild(eventItem);
  });
}

// Function to populate nation dropdown dynamically
function populateNationDropdown(events) {
  const nationSelect = document.getElementById('nation');
  const nations = [...new Set(events.map(event => event.nation))]; // Get unique nations

  nations.forEach(nation => {
    const option = document.createElement('option');
    option.value = nation;
    option.textContent = nation;
    nationSelect.appendChild(option);
  });
}

// Event listener for the filter form
document.getElementById('filter-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Fetch the events data when the form is submitted
  const events = await fetchEvents();

  const nation = document.getElementById('nation').value;
  const season = document.getElementById('season').value;
  const century = document.getElementById('century').value;
  const period = document.getElementById('period').value;
  
  const filters = {
    nation: nation || "",
    season: season || "",
    century: century || "",
    period: period || ""
  };

  const filteredEvents = filterEvents(events, filters);
  displayEvents(filteredEvents);
});

// Fetch and display events when the page loads
window.addEventListener('DOMContentLoaded', async () => {
  const events = await fetchEvents();
  
  // Populate nation dropdown dynamically
  populateNationDropdown(events);
  
  // Display all events initially
  displayEvents(events);
});
