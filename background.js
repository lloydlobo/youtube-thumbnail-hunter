const welcome = `
╱╱╱╱╱╱╭╮╱╱╭╮
╭┳┳━┳┳┫╰┳┳┫╰┳━╮
┃┃┃╋┃┃┃╭┫┃┃╋┃┻┫
┣╮┣━┻━┻━┻━┻━┻━╯
╰━╯
╭╮╭╮╱╱╱╱╱╭╮╱╱╱╱╱╱╭╮
┃╰┫╰┳┳┳━━┫╰┳━┳┳━╮┣╋╮
┃╭┫┃┃┃┃┃┃┃╋┃┃┃┃╋╰┫┃╰╮
╰━┻┻┻━┻┻┻┻━┻┻━┻━━┻┻━╯
╭╮╱╱╱╱╱╭╮
┃╰┳┳┳━┳┫╰┳━┳┳╮
┃┃┃┃┃┃┃┃╭┫┻┫╭╯
╰┻┻━┻┻━┻━┻━┻╯
Welcome to YoutTube Thumbnail Hunter!`; // https://fsymbols.com/text-art/
console.log(welcome);

// Commit message: Refactor extension icon click event handler and constant
// declarations
//
// Define constants for YouTube URLs and extension badge text
const YOUTUBE_URLS = [ "https://youtube.com", "https://www.youtube.com" ];
const OFF_STATE = "OFF";
const ON_STATE = "ON";

// Set the badge text to "OFF" when the extension is installed
chrome.runtime.onInstalled.addListener(
    () => { chrome.action.setBadgeText({text : OFF_STATE}); });

// Click event handler for extension icon
chrome.action.onClicked.addListener(async (tab) => {
  if (!YOUTUBE_URLS.some((url) => tab.url.startsWith(url))) {
    return;
  }

  const prevState = await chrome.action.getBadgeText({tabId : tab.id});
  const nextState = prevState === ON_STATE ? OFF_STATE : ON_STATE;

  await chrome.action.setBadgeText({tabId : tab.id, text : nextState});

  const cssFile = "hunter-mode.css";
  const target = {tabId : tab.id};
  const message = {toggle : nextState === ON_STATE};
  chrome.tabs.sendMessage(tab.id, message);

  if (nextState === ON_STATE) {
    await chrome.scripting.insertCSS({files : [ cssFile ], target});
    console.info("[INFO] YoutTube Thumbnail Hunter is", "hunting");
  } else if (nextState === OFF_STATE) {
    await chrome.scripting.removeCSS({files : [ cssFile ], target});
    console.info("[INFO] YoutTube Thumbnail Hunter is", "resting");
  } else {
    console.error("¯\\_(ツ)_/¯");
  }
});
