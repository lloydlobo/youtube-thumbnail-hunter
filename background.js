// Commit message: Refactor extension icon click event handler and constant declarations
//
// Define constants for YouTube URLs and extension badge text
const YOUTUBE_URLS = ["https://youtube.com", "https://www.youtube.com"];
const OFF_STATE = "OFF";
const ON_STATE = "ON";

// Set the badge text to "OFF" when the extension is installed
chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({ text: OFF_STATE });
});

// Click event handler for extension icon
chrome.action.onClicked.addListener(async (tab) => {
  // console.log(tab.url, "clicked", tab);

  if (!YOUTUBE_URLS.some((url) => tab.url.startsWith(url))) {
    // console.log("no action");
    return;
  }

  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  const nextState = prevState === ON_STATE ? OFF_STATE : ON_STATE;

  await chrome.action.setBadgeText({ tabId: tab.id, text: nextState });

  const cssFile = "hunter-mode.css";
  const target = { tabId: tab.id };

  if (nextState === ON_STATE) {
    await chrome.scripting.insertCSS({ files: [cssFile], target });
    console.info("[INFO] YoutTube Thumbnail Hunter is", "hunting");
  } else if (nextState === OFF_STATE) {
    await chrome.scripting.removeCSS({ files: [cssFile], target });
    console.info("[INFO] YoutTube Thumbnail Hunter is", "resting");
  }
});
