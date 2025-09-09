// Function to create and display the cookie consent banner
function showConsentBanner(learnMoreUrl) {
    return new Promise((resolve) => {
        let banner = document.createElement("div");
        banner.id = "cookieBanner";
        banner.innerHTML = `
            <div style="position: fixed; bottom: 0; left: 0; width: 100%; 
                background: white; padding: 15px; text-align: center; 
                box-shadow: 0px -2px 5px rgba(0,0,0,0.1); z-index: 1000;">
                
                <p>
                    We use cookies to improve your experience. Do you accept? 
                    <a id="learnMoreLink" href="${learnMoreUrl}" target="_blank" style="color: blue; text-decoration: underline; margin-left: 5px;">
                        Learn More
                    </a>
                </p>

                <button id="acceptCookies" style="background: green; color: white; padding: 8px 16px; margin-right: 10px;">
                    Accept
                </button>

                <button id="rejectCookies" style="background: red; color: white; padding: 8px 16px;">
                    Reject
                </button>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById("acceptCookies").addEventListener("click", function () {
            banner.remove();
            hideCookiePolicyButton(); // Call function to accept external cookies
            resolve(true);
        });

        document.getElementById("rejectCookies").addEventListener("click", function () {
            banner.remove();
            resolve(false);
        });
    });
}




// Function to get or create a stored user ID
function getUserID() {
    let userID = localStorage.getItem("user_pixel_id");
    if (!userID) {
        userID = crypto.randomUUID();
        localStorage.setItem("user_pixel_id", userID);
    }
    return userID;
}

// Function to check if consent is expired
function isConsentExpired() {
    let consentTimestamp = localStorage.getItem("cookie_consent_timestamp");
    if (!consentTimestamp) return true; // If no timestamp, ask for consent

    let now = new Date().getTime();
    let expiryTime = 1 * 60 * 1000; // 30 days in milliseconds
    return now - parseInt(consentTimestamp) > expiryTime;
}

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

// Function to store cookie consent and timestamp in localStorage
function storeConsent(consentGiven) {
    let userID = getUserID();
    localStorage.setItem("cookie_consent", consentGiven);
    localStorage.setItem("cookie_consent_timestamp", new Date().getTime());
    localStorage.setItem("user_pixel_id", userID);
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
let tenant_id = 'd26331ec-e390-4c61-afb9-56795bb856cf';
async function sendPixelData() {
    let user_pixel_id = getUserID();

    let ip = await getIPAddress();
    appendUserIdToURL(user_pixel_id);

    let payload = {
        link: window.location.href,
        ip: ip,
        user_id: user_pixel_id,
        tenant_id: tenant_id,
    };

    try {
        let response = await fetch("https://backend-283763506150.us-central1.run.app/pixels/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });

        let result = await response.json();
        console.log("Pixel Data Sent Successfully:", result);
    } catch (error) {
        console.error("Error sending pixel data:", error);
    }

    loadExternalTrackingScript();
}

// Function to dynamically load the external tracking script
function loadExternalTrackingScript() {
    let script = document.createElement("script");
    script.defer = true;
    script.src = `https://data.processwebsitedata.com/cscripts/1CHmmrgO6Y-60ac9048.js`;
    document.head.appendChild(script);
}

// Function to hide the "Cookie Policy" button when it appears
function hideCookiePolicyButton() {
    let xpath = "//div[contains(@class, 'cc-revoke')]";
    let cookiePolicyBtn = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

    if (cookiePolicyBtn) {
        cookiePolicyBtn.style.display = "none";
        console.log("✅ Cookie Policy button found and hidden!");
    } else {
        console.log("❌ Cookie Policy button not found yet!");
    }
}

// Observer to detect when the button is added to the DOM
const observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
            hideCookiePolicyButton();
        }
    }
});

// Start observing the entire body for changes
observer.observe(document.body, { childList: true, subtree: true });

console.log("🔍 Watching for Cookie Policy button...");


let learnMoreLink = `https://portal.sdrcloud.ai/privacy-policy/${tenant_id}`
// Main function that runs on script load
async function initTracking() {
    let consentStored = localStorage.getItem("cookie_consent");

    if (consentStored && !isConsentExpired()) {
        console.log("Cookie consent already given. Skipping prompt.");
        sendPixelData();
    } else {
        const consentGiven = await showConsentBanner(learnMoreLink);
        storeConsent(consentGiven);
        if (consentGiven) {
            sendPixelData();
        } else {
            console.log("User rejected cookies. Tracking script will not run.");
        }
    }
}

// Run the script when the page loads
window.onload = initTracking;
