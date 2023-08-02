if(navigator.userAgent.indexOf("Windows NT 10") >= 0 || navigator.userAgent.indexOf("Windows Phone 10") >= 0 || navigator.userAgent.indexOf("Windows 10") >= 0 || navigator.userAgent.indexOf("Windows Mobile 10") >= 0){     
    if(navigator.userAgent.indexOf("TenDevelopsAppHub") >= 0){
        
    }
}
else {
    location.href = "unsupported.html";
}

var request = new XMLHttpRequest();
request.open("GET", "apps.json", true);
request.send(null);
request.onreadystatechange = function() {
    if (request.readyState === 4 && request.status === 200) {
        var JSONstr = JSON.parse(request.responseText);
        for (var i = 0; i < JSONstr.length; i++){
            console.log(JSONstr[i]);

            var appElement = document.createElement('div');
            appElement.setAttribute('class', "app");

            var appLinkElement = document.createElement('a');
            appLinkElement.setAttribute('class', "app-link");
            appLinkElement.setAttribute('href', 'app.html?id=' + JSONstr[i].id);

            var appIconElement = document.createElement('img');
            appIconElement.setAttribute('class', "app-icon");
            appIconElement.setAttribute('src', 'assets/' + JSONstr[i].id + '/logo.png');

            var appTextElement = document.createElement('div');
            appTextElement.setAttribute('class', "app-text");

            var appNameElement = document.createElement('b');
            appNameElement.setAttribute('class', "app-name");
            appNameElement.innerText = JSONstr[i].Name;

            var appDescriptionElement = document.createElement('p');
            appDescriptionElement.setAttribute('class', "app-description");
            appDescriptionElement.innerText = JSONstr[i].Description;

            appTextElement.appendChild(appNameElement);
            appTextElement.appendChild(appDescriptionElement);

            appLinkElement.appendChild(appIconElement);
            appLinkElement.appendChild(appTextElement);

            appElement.appendChild(appLinkElement);

            document.getElementById('items').appendChild(appElement);
        }
    }
}