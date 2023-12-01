// popup.js

// Function to inject content script into the current active tab
function injectScript(tabId, scriptFile) {
    chrome.tabs.executeScript(tabId, { file: scriptFile });
}

// Function to handle the response from the content script
function handleResponse(response) {
    const rowcountValue = response && response.rowcount;
  
    
    document.getElementById('rowcount').textContent = rowcountValue || 'Not found';
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const activeTab = tabs[0];
    
        // Listen for tab updates (page load events)
        chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
            if (changeInfo.status === 'complete' && tabId === activeTab.id) {
                // Inject the content script after the page has fully loaded
                injectScript(tabId, 'content.js');
            }
        });
    });
// Set up a listener for messages from the content script
chrome.runtime.onMessage.addListener(handleResponse);
  