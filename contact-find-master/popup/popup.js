document.addEventListener("DOMContentLoaded", ready);

function  ready(){
    document.getElementById("rst_btn").onclick = reset_list;
    var list_data = localStorage.getItem("list_url");
    if (list_data){
        list_data = JSON.parse(list_data);
        var list = document.querySelector("textarea#list_urls");
        list.value = list_data.join('\n').replace( /\?auto_find=true/g, "" );
    }else{
        chrome.browserAction.setBadgeText({text: "0"});
    }
}

function reset_list() {
    localStorage.setItem("list_url", []);
    chrome.browserAction.setBadgeText({text: "0"});
    document.querySelector("textarea#list_urls").value = "";
}