function SigninHBT() {
    chrome.tabs.getSelected(null, function (tab) {
        chrome.tabs.executeScript({
            file: "scripts/content_script.js"
          });

    });
}

document.getElementById("signinHBT").onclick = function() {
    SigninHBT();
}
