
// JS to cook up the settings modal box

var openSettings = document.createElement('button');
openSettings.classList.add('openSettings');
openSettings.innerHTML = '<i class="fas fa-fw fa-cog"></i>';

var settingsOverlay = document.createElement('div');
settingsOverlay.classList.add('settingsOverlay');

var settingsBox = document.createElement('div');
settingsBox.classList.add('settingsBox');
settingsOverlay.appendChild(settingsBox);

var settingsBoxHeader = document.createElement('h1');
settingsBoxHeader.classList.add('settingsBoxHeader');
settingsBoxHeader.innerText = 'APP SETTINGS:';
settingsBox.appendChild(settingsBoxHeader);

var settingsInnerWrapper = document.createElement('div');
settingsInnerWrapper.classList.add('settingsInnerWrapper');
settingsBox.appendChild(settingsInnerWrapper);

var closeSettings = document.createElement('button');
closeSettings.classList.add('closeSettings');
closeSettings.innerHTML = '&times;';
settingsBox.appendChild(closeSettings);

document.body.appendChild(settingsOverlay);
document.body.appendChild(openSettings);

// Now, vars cook the forms (this is the diffcult shi- EV gonna be mad if she sees this T_T I did not use the s word :/)

var settingsForm = document.createElement('form');
settingsInnerWrapper.appendChild(settingsForm);
settingsForm.innerHTML += '<p class = "settingsCategory">Stelf Mode:</p>';

var settingsSubmit = document.createElement('button');
settingsSubmit.innerText = "Save";
settingsSubmit.classList.add('settingsSubmit');
settingsSubmit.setAttribute('id', 'settingsSubmit');
settingsForm.appendChild(settingsSubmit);

settingsSubmit.addEventListener('click', (event) => {
    event.preventDefault();
//    var theme = settingsForm["theme"].value;
//    localStorage.setItem("theme", theme);
    settingsOverlay.style.display = 'none';
});

function restoreOptions() {
//    let theme = localStorage.getItem("theme");
//    if (theme) {
//        document.getElementById(theme + 'Theme').setAttribute('checked', true);
//    } else {
//        document.getElementById('defaultTheme').setAttribute('checked', true);
//        localStorage.setItem("theme", "default");
//    }
}

restoreOptions();

openSettings.addEventListener("click", () => {
    settingsOverlay.style.display = 'block';
});

closeSettings.addEventListener("click", () => {
    settingsOverlay.style.display = 'none';
});
