// Copyright (c) 2017 stydygolang. All rights reserved.
// Golang中国社区 版权所有

chrome.browserAction.onClicked.addListener(function(tab) {
  chrome.tabs.create({
    url: "https://studygolang.com/resources/new?url=" + "&title=" + encodeURIComponent(tab.title) + "&platform=chrome_extension"
  });

});