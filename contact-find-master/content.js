$.get(chrome.extension.getURL('/content.html'), function (data) {
    $(data).appendTo('body');
});

document.addEventListener("keyup", e => {
    if (e.which === 44) {
        var newDiv = document.createElement("div");
        newDiv.classList.add('moved_element', 'pullDown');

        newDiv.innerHTML = window.location.href;

        // добавляем только что созданый элемент в дерево DOM
        var my_div = document.getElementsByClassName("menu_custom_context")[0];
        document.body.insertBefore(newDiv, my_div);

        chrome.runtime.sendMessage({method: "addUrl", key: window.location.href}, function (response) {});
    }
});