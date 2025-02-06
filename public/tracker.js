// Function to fetch the visitor's IP address
async function getIPAddress() {
    try {
        let response = await fetch('https://api64.ipify.org?format=json');
        let data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP address:", error);
        return "Unknown IP";
    }
}

// Function to append user_id to the browser's current URL
function appendUserIdToURL(user_id) {
    let currentUrl = new URL(window.location.href);

    // Append or update user_id in the URL
    currentUrl.searchParams.set("user_id", user_id);

    // Update the browser's history state without reloading the page
    window.history.pushState({}, "", currentUrl);
}

// Function to send tracking data
async function sendPixelData() {
    let user_pixel_id = localStorage.getItem("user_pixel_id") || crypto.randomUUID();
    localStorage.setItem("user_pixel_id", user_pixel_id); // Store user_id for future visits

    // Append user_id to the URL
    appendUserIdToURL(user_pixel_id);

    let ip = await getIPAddress();
    
    let payload = {
        link: window.location.href,  // Get the current page URL (after updating with user_id)
        ip: ip,
        user_id: user_pixel_id  // Use the stored user_id
    };

    try {
        let response = await fetch("https://backend-283763506150.us-central1.run.app/pixels/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        let result = await response.json();
        console.log("Pixel Data Sent Successfully:", result);
    } catch (error) {
        console.error("Error sending pixel data:", error);
    }

    // Load external tracking script after modifying the URL
    loadExternalTrackingScript();
}

// Function to dynamically load the external tracking script
function loadExternalTrackingScript(user_id) {
    let script = document.createElement("script");
    script.defer = true;
    script.src = `https://data.processwebsitedata.com/cscripts/1CHmmrgO6Y-60ac9048.js`;

    // Append the script to the document's <head>
    document.head.appendChild(script);
}

// Run the tracking function when the page loads
window.onload = sendPixelData;
