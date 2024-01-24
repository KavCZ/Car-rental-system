if (document.getElementById('dominika')) {
    setTimeout(function () {
        document.getElementById('martin').style.visibility = 'hidden';
        document.getElementById('dominika').style.visibility = '';
        document.getElementById('dominika').style.animation = 'bounce-in-top 0.75s ease-in-out';
    }, 0);
    setTimeout(function () {
        document.getElementById('martin').style.visibility = '';
        document.getElementById('martin').style.animation = 'bounce-in-top 0.75s ease-in-out';
    }, 700);

} else {
    document.getElementById('detail_card').style.visibility = '';
    document.getElementById('detail_card').style.animation = 'bounce-in-top 0.75s ease-in-out';
};


function readWebName(webUrl) {

    document.getElementById('martin').style.animation = '';
    document.getElementById('dominika').style.animation = '';

    setTimeout(function () {
        document.getElementById('martin').style.animation = 'bounce-in-top 0.75s ease-in-out reverse';
    }, 0);
        
    setTimeout(function () {
        document.getElementById('martin').style.visibility = 'hidden';
        document.getElementById('dominika').style.animation = 'bounce-in-top 0.75s ease-in-out reverse';
    }, 700);

    setTimeout(function () {
        document.getElementById('dominika').style.visibility = 'hidden';
        window.location.href = `html/${webUrl}`;
    }, 1400);
};


function goBack() {
    setTimeout(function () {
        document.getElementById('detail_card').style.animation = 'bounce-in-top 0.75s ease-in-out reverse';
    }, 50);

    setTimeout(function () {
        window.location.href = `/index.html`;
    }, 700);
};

function goToFb(url) {
    window.open(`https://${url}`, '_blank');
};

function goToLinkIn(url) {
    window.open(`https://${url}`, '_blank');
};

function goToGitHub(url) {
    window.open(`https://${url}`, '_blank');
};
