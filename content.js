

// Function to send a message to the popup script with the rowcount value;


function sendRowCount() {
  const targetElement = document.querySelector('[aria-colcount="1"][aria-rowcount]');

  if (targetElement) {
    const rowcountValue = targetElement.getAttribute('aria-rowcount');
    chrome.runtime.sendMessage({ rowcount: rowcountValue});
  } else {
    chrome.runtime.sendMessage({ rowcount: null});
  }
}



// Initially load the first set of data
sendRowCount();

// Callback function to be executed when mutations are observed
function handleMutations(mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.addedNodes.length > 0) {
      // If nodes are added, send the row count
      sendRowCount();
    }
  });
}

// Create a MutationObserver to watch for changes in the DOM
const observer = new MutationObserver(handleMutations);

// Configuration of the observer:
const observerConfig = { childList: true, subtree: true };

// Start observing the target node for configured mutations
observer.observe(document.body, observerConfig);

// Execute the function immediately
sendRowCount();

