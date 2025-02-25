// Sample event data
const events = [
  {
    "event_name": "Fall of the Roman Empire",
    "description": "The collapse of the Western Roman Empire in 476 AD.",
    "date": "476 AD",
    "start_date": "27 BC",
    "end_date": "476 AD",
    "nation": "Roman Empire",
    "season": "Fall",
    "century": "5th century",
    "period": "Classical Era",
    "prehistory": false
  },
  {
    "event_name": "Discovery of Fire",
    "description": "The discovery of fire by prehistoric humans.",
    "date": "1 million BC",
    "start_date": "2 million BC",
    "end_date": "N/A",
    "nation": "Prehistoric Humans",
    "season": "N/A",
    "century": "N/A",
    "period": "Prehistoric Era",
    "prehistory": true
  },
  {
    "event_name": "Pyramids of Giza Construction",
    "description": "The construction of the Great Pyramids of Giza in Egypt.",
    "date": "2580 BC",
    "start_date": "2580 BC",
    "end_date": "2560 BC",
    "nation": "Ancient Egypt",
    "season": "Summer",
    "century": "3rd millennium BC",
    "period": "Ancient Egypt",
    "prehistory": false
  }
];

// Function to filter events based on selected filters
function filterEvents(filters) {
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
function populateNationDropdown() {
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
document.getElementById('filter-form').addEventListener('submit', function(event) {
  event.preventDefault();
  
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
  
  const filteredEvents = filterEvents(filters);
  displayEvents(filteredEvents);
});

// Populate the nation dropdown when the page loads
populateNationDropdown();

// Display all events initially
displayEvents(events);
