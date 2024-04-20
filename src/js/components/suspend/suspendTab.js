import * as time from "../time.js";

export const suspend_url = chrome.runtime.getURL("suspended.html");
export const generateQuery = (options) =>
  Object.keys(options)
    .reduce(
      (prev, curr) => [...prev, `${curr}=${encodeURIComponent(options[curr])}`],
      []
    )
    .join("&");
export default function suspendTab(tab) {
  if (!tab.url || tab.url.startsWith("chrome://")) {
    console.log("Cannot suspend! Tab is not a website or file");
  } else if (tab.url.startsWith(suspend_url)) {
    console.log("Cannot suspend! Tab already suspended");
  } else {
    const query = generateQuery({
      url: tab.url,
      favicon: tab.favIconUrl,
      title: tab.title,
      time: time.now(),
    });
    chrome.tabs.update(tab.id, { url: `${suspend_url}?${query}` });
  }
}
