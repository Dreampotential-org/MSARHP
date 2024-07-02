function start() {

    getsessions(function(sessions) {
        for(var session of sessions)  {
            $("#activity").append(
                "<div>" + session.id + "</div>" +
                "<div id='map" + session.id + "'>" + session.id + "</div>")
        }
    })


}
window.addEventListener('DOMContentLoaded', start, false)


//document.addEventListener('deviceready', function() { 
//alert("Try to start background mode")
//	cordova.plugins.backgroundMode.enable();
//	start();
//	}, false)
