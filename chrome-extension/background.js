// =============================
// GLOBAL VARIABLES (TOP)
// =============================
let bypassTabs = new Set();
let approvedUrls = {};


// =============================
// NAVIGATION LISTENER
// =============================
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
  if (details.frameId !== 0) return;

  const tabId = details.tabId;
  const url = details.url;

  // Ignore internal pages
  if (
    url.startsWith("chrome://") ||
    url.startsWith("about:blank") ||
    url.startsWith("chrome-extension://") ||
    url.startsWith("http://localhost:3000")
  ) {
    return;
  }

  if (approvedUrls[tabId] === url) {
    return;
  }

  if (bypassTabs.has(tabId)) {
    bypassTabs.delete(tabId);
    approvedUrls[tabId] = url;
    return;
  }

  chrome.storage.local.get(["redirectOn"], (result) => {
    if (!result.redirectOn) return;

    if (url.startsWith("http://") || url.startsWith("https://")) {
      chrome.tabs.update(tabId, {
        url: `http://localhost:3000?url=${encodeURIComponent(url)}`
      });
    }
  });
});


// =============================
// 👇 PUT IT HERE (AFTER LISTENER)
// =============================
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "bypassOnce") {

    const tabId = sender.tab.id;

    bypassTabs.add(tabId);

    chrome.tabs.update(tabId, {
      url: message.targetUrl
    });
  }
});


// Optional cleanup
chrome.tabs.onRemoved.addListener((tabId) => {
  delete approvedUrls[tabId];
  bypassTabs.delete(tabId);
});