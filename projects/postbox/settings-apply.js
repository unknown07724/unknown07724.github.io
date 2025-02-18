fetch("admin-settings.json")
    .then(response => response.json())
    .then(settings => {
        if (settings.maintenance_mode) {
            window.location.href = "maintenance.html";
        }
    })
    .catch(error => console.error("Error loading admin settings:", error));
