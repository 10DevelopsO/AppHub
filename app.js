var URLparam = JSON.parse('{"' + location.search.substring(1).replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) });
var slidePos = 0;

window.onload = function(){
    if(navigator.userAgent.indexOf("Windows NT 10") >= 0 || navigator.userAgent.indexOf("Windows Phone 10") >= 0 || navigator.userAgent.indexOf("Windows 10") >= 0 || navigator.userAgent.indexOf("Windows Mobile 10") >= 0){     
        if(navigator.userAgent.indexOf("TenDevelopsAppHub") >= 0){
            InitAppHub();
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
            var item = JSONstr[URLparam['id']];
            document.title = item.Name + " - AppHub";
    
            document.getElementById('appicon').setAttribute('src', 'assets/' + URLparam['id'] + '/logo.png');
            document.getElementById('appname').innerText = item.Name;
            document.getElementById('appdescription').innerText = item.Description;
            document.getElementById('appversion').innerText = item.Version;
            document.getElementById('appdeveloper').innerText = item.Developer;

            for(var i = 0; i < item.Screenshot.length; i++){
                var screenshotThumb = document.querySelectorAll('.screenshot');
                var screenshotAsset = 'assets/' + URLparam['id'] + '/' + item.Screenshot[i];
                screenshotThumb[i].src = screenshotAsset;
                screenshotThumb[i].setAttribute("onClick", "ShowGallery(" + i + ")");

                document.querySelectorAll('.screenshot-full')[i].src = screenshotAsset;
            }


            var appwebsite = document.getElementById('website');
            if(item.Website != ""){
                appwebsite.style.visibility = 'visible';
                appwebsite.href = item.Website;
            }

            var appsourcecode = document.getElementById('source-code');
            if(item.Sourcecode != ""){
                appsourcecode.style.visibility = 'visible';
                appsourcecode.href = item.Sourcecode;
            }

            var appchangelog = document.getElementById('changelog');
            if(item.Changelog != ""){
                appchangelog.style.visibility = 'visible';
                appchangelog.href = item.Changelog;
            }

            SetupView();
        }
    }
}

window.onresize = function(){
    SetupView();
}

function InitAppHub(){
    document.getElementById('action-button').setAttribute('mode', 'install');
    document.getElementById('action-button').textContent = "Install";
}

function SetupView(){
    var piclist = document.querySelectorAll('.screenshot');

    slidePos = 0;
    Array.from(piclist).forEach(elem => {
        if(elem.hasAttribute('src')){
            elem.style.display = 'block'
        }
    });

    if(window.innerWidth < 550){
        piclist[1].style.display = 'none';
        document.getElementById('previous-screenshot').style.display = 'none'; 
        document.getElementById('next-screenshot').style.display = 'block'; 
    }
    else{
        document.getElementById('previous-screenshot').style.display = 'none'; 
        document.getElementById('next-screenshot').style.display = 'none'; 
    }
}

function PreviousPicture(e){
    ToggleScreenshots('previous');
}

function NextPicture(e){
    ToggleScreenshots('next');
}

function ToggleScreenshots(func){
    var piclist = document.getElementsByClassName('screenshot');
    piclist[slidePos].style.display = "none";
    if(func == 'next') slidePos++;
    else if(func == 'previous') slidePos--;
    piclist[slidePos].style.display = "block";
    
    UpdateScreenshotButtons();
}

function UpdateScreenshotButtons(){
    var previousButton = document.getElementById('previous-screenshot'), nextButton = document.getElementById('next-screenshot');

    if(slidePos > 0) previousButton.style.display = 'block';
    else previousButton.style.display = 'none';

    if(slidePos < document.getElementsByClassName('screenshot').length - 1) nextButton.style.display = 'block'; 
    else nextButton.style.display = 'none'; 
}

function DoAction(e){
    if(e.getAttribute('mode') == 'openapphub'){
        location.assign('tendev-apphub:?id=' + URLparam['id'] + '&confirmation=yes');
    }
    else if(e.getAttribute('mode') == 'install'){
        location.assign('assets/' + URLparam['id'] + '/downloads/any/package.appxbundle');
    }
}

function CloseGallery(){
    document.querySelector(".overlay").style.display = null;
}

var currentPic = 0;
function ShowGallery(num){
    document.querySelector(".overlay").style.display = 'block';

    var allIMGcontainers = document.querySelectorAll('.gallery-container');
    Array.from(allIMGcontainers).forEach(elem => {
        elem.style.display = null;
    });

    allIMGcontainers[num].style.display = 'flex';

    currentPic = num;

    UpdateGalleryButtons();
}

function PreviousGalleryPicture(){
    ToggleGalleryPicture('previous');
}

function NextGalleryPicture(){
    ToggleGalleryPicture('next');
}

function ToggleGalleryPicture(func){
    var allIMGcontainers = document.querySelectorAll('.gallery-container');

    allIMGcontainers[currentPic].style.display = null;
    if(func == 'next') currentPic++;
    else if(func == 'previous') currentPic --;
    allIMGcontainers[currentPic].style.display = "flex";

    UpdateGalleryButtons();
}

function UpdateGalleryButtons(){
    var previousButton = document.getElementById('gallery-previous'), nextButton = document.getElementById('gallery-next');

    if(currentPic > 0) previousButton.style.display = 'block';
    else previousButton.style.display = 'none';

    if(currentPic < document.querySelectorAll('.gallery-container').length - 1) nextButton.style.display = 'block';
    else nextButton.style.display = 'none';
}