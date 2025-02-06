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

// Run the script
(async function() {
    let ip = await getIPAddress();
    let uuid = crypto.randomUUID();  // Official way to generate a UUID (v4)
    console.log(`Visitor IP: ${ip}`);
    console.log(`Generated new UUID: ${uuid}`);
})();
