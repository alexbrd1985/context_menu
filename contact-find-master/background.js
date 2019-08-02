// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called when the user clicks on the browser action.
// chrome.browserAction.onClicked.addListener(function(tab) {
//  document.querySelectorAll('a[href*="contact"')[0].click();
// });

// Called when the user clicks on the browser action.

updateCount();

chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
    });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "addUrl"){
        var list = localStorage.getItem("list_url");
        if (!list)
            {list = [request.key]}
        else{
            list = JSON.parse(list).concat(request.key);
        }
        // list = list.concat(request.key);
        localStorage.setItem("list_url", JSON.stringify(list));

        console.log(list);
        sendResponse({data: list});
        updateCount();
    }
    else
        sendResponse({data:{}}); // snub them.
});

function updateCount() {
    let count = localStorage.getItem("list_url");
    if (count){
        count = JSON.parse(count).length;
        chrome.browserAction.setBadgeText({text: count.toString()});
    }
}