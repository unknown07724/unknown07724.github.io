async function enforceBlacklist() {
  // Load the blacklist from your JSON file
  const response = await fetch('/lists/blacklist1.json');
  const data = await response.json();
  const blockedDomains = data.blockedDomains;

  // Get the referrer
  const referrer = document.referrer;

  // Check if the referrer matches any blocked domain
  if (referrer) {
    const referrerDomain = new URL(referrer).hostname;
    if (blockedDomains.includes(referrerDomain)) {
      console.warn('Blocked access from:', referrerDomain);

      // Redirect or block functionality
      document.body.innerHTML = `<h1>Access Blocked</h1>`;
    }
  }
}

// Call the function on page load
enforceBlacklist();
