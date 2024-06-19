var GLOBAL_SESSION_ID = null;
var gdata = -1;
function init() {
    //    cordova.plugins.backgroundMode.enable();

    init_motions()
    init_subscription()
    init_music_events()
    console.log("STart HERe")
    startsessionapi(function (session) {
        console.log("Start Session")
        start_gps();
    })
    setInterval(function () {
        console.log("interval")
        // get_session_stats()
        //display_user_stats()
    }, 3000)


    // Dummy Data For Speed test
    // setInterval(function () {
    //     console.log("interval")
    //     // display_user_stats()
    //     gdata += 1
    //     display_dummy_stats()
    // }, 3000)
    configure_events()
    configure_events_new()
    list_medias(function (medias) {
        // for (var media of medias) {
            setup_media(medias)
        // }

    })
}

var GLOB = null
function display_user_stats() {

    get_local_stats();
    // get_user_stats(function (results) {
    //     GLOB = results;
    //     let val;
    //     var count = results.interval_stats.length
    //     if (count == 0) return

    //     $("#stats_miles").text(results['miles'].toFixed(2))
    //     $("#stats_mph").text(results['interval_stats'][count - 1]['mph'].toFixed(2))

    //     // display some weight

    //     // display previous 10 segments
    //     var sorted_stats = results['interval_stats'].reverse()
    //     for (var i = 1; i < 10; i++) {
    //         if (i >= sorted_stats.length) {
    //             // val = sorted_stats[i - 1]['mph'].toFixed(2)
    //             val = sorted_stats[i - 1]['hours'] * 60 * 60;
    //             break
    //         }
    //         $("#interval_mph").text(sorted_stats[i]['mph'].toFixed(2))
    //     }
    //     // const seconds = sorted_stats[-1]['hours']*60*60;
    //     // console.log("seconds:", seconds)
    //     text_to_speech(val, speedFlow = 'normal')
    // });
}

function display_dummy_stats() {

    let results ={
        "interval_stats": [
            {
                "distance": 778.6088326071907,
                "mph": 29028.250219027803,
                "hours": 1,
                "speedFlow" : "tofast"
            },
            {
                "distance": 778.6088326071907,
                "mph": 2521.95671219809,
                "hours": 0.35,
                "speedFlow" : "fast"
            },
            {
                "distance": 222.4596664591972,
                "mph": 3550044.796186564636,
                "hours": 0.30,
                "speedFlow" : "normal"
            },
            {
                "distance": 222.4596664591972,
                "mph": 45.83151017317,
                "hours": 0.2,
                "speedFlow" : "toslow"
            }
        ],
        "miles": 1244.067866529763,
        "meters": 2002136.998132776,
        "session_id": 133,
        "points_count": 14,
        "session_time": "2023-01-11T13:35:56.496"
    }

    var sorted_stats = results['interval_stats'].reverse()

    $("#stats_miles").text(results['miles'].toFixed(2))
    $("#stats_mph").text(results['interval_stats'][sorted_stats.length - 1]['mph'].toFixed(2))

    if (gdata < sorted_stats.length) {
        console.log(gdata);
        val = sorted_stats[gdata]['hours'] * 60 * 60;
        speedFlow = sorted_stats[gdata]['speedFlow']
        $("#interval_mph").text(sorted_stats[gdata]['mph'].toFixed(2))

        text_to_speech(val, speedFlow = speedFlow)
    }
}

function time_taken(seconds) {

    var h = Math.floor(seconds / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay + sDisplay;
}

function text_to_speech(seconds, speedFlow) {

    let time = time_taken(seconds);

    var msg = new SpeechSynthesisUtterance();
    if (speedFlow === 'normal') {
        document.getElementById("interval_mph").style.color = "#000000";
        msg.text = "You are going at normal speed " + time;
    }
    if (speedFlow === 'slow') {
        document.getElementById("interval_mph").style.color = "#FDCA4B";
        msg.text = "You are " + time + "slower";
    }
    if (speedFlow === 'toslow') {
        document.getElementById("interval_mph").style.color = "#FFE400";
        msg.text = "You are " + time + " slower";
    }
    if (speedFlow === 'fast') {
        document.getElementById("interval_mph").style.color = "#FF4D00";
        msg.text = "You are " + time + " fast";
    }
    if (speedFlow === 'tofast') {
        document.getElementById("interval_mph").style.color = "#FF0000";
        msg.text = "You are " + time + " faster";
    }
    window.speechSynthesis.speak(msg);
}

function configure_events() {


    $("#map_btn").on("click", function(ev) {
        $("#map_canvas").show()
        $("#interval_mph").hide()
        $("#intent_mph_view").hide()
        $("#player0").hide()

        $("#map_btn").css("backgroundColor", "blue");
        $("#interval_btn").css("backgroundColor", "white");
        $("#music_btn").css("backgroundColor", "white");
    })

    $("#interval_btn").on("click", function(ev) {
        $("#map_canvas").hide()
        $("#interval_mph").show()
        $("#intent_mph_view").show()
        $("#player0").hide()


        $("#map_btn").css("backgroundColor", "white");
        $("#interval_btn").css("backgroundColor", "blue");
        $("#music_btn").css("backgroundColor", "white");
    })

    $("#music_btn").on("click", function(ev) {
        $("#map_canvas").hide()
        $("#interval_mph").show()
        $("#intent_mph_view").hide()
        $("#player0").show()

        $("#map_btn").css("backgroundColor", "white");
        $("#interval_btn").css("backgroundColor", "white");
        $("#music_btn").css("backgroundColor", "blue");
    })




    $("#new_account_create").on("click", function(ev) {
        ev.preventDefault();
        signup_api({
            name: $('#account_name').val(),
            email: $("#new_account_email").val(),
            password: $("#new_account_password").val(),
        });
    })
}

function configure_events_new() {


    $("#profile_btn").on("click", function(ev) {
        $("#map_canvas").show()
        $("#graph-container").show()
        $("#interval_mph").hide()
        $("#intent_mph_view").hide()
        $("#player0").hide()
        
         $("#profile_btn").hide()
        $("#interval_btn").hide()
        $("#music_btn").hide()
        $("#map_btn").hide()
        $("#subscription_btn").hide()
        $("#total_miles").hide()
        $("#mph").hide()
        $("#stats").hide()
        $("#app").hide()
      

        
         $("#map_canvas").css("height", "50%")
        // $("#profile_btn").css("backgroundColor", "blue");
        // $("#interval_btn").css("backgroundColor", "white");
        // $("#music_btn").css("backgroundColor", "white");
    })

    $("#interval_btn").on("click", function(ev) {
        $("#map_canvas").hide()
        $("#interval_mph").show()
        $("#intent_mph_view").show()
        $("#player0").hide()


        $("#profile_btn").css("backgroundColor", "white");
        $("#interval_btn").css("backgroundColor", "blue");
        $("#music_btn").css("backgroundColor", "white");
    })

    $("#music_btn").on("click", function(ev) {
        $("#map_canvas").hide()
        $("#interval_mph").show()
        $("#intent_mph_view").hide()
        $("#player0").show()

        $("#profile_btn").css("backgroundColor", "white");
        $("#interval_btn").css("backgroundColor", "white");
        $("#music_btn").css("backgroundColor", "blue");
    })




    $("#new_account_create").on("click", function(ev) {
        ev.preventDefault();
        signup_api({
            name: $('#account_name').val(),
            email: $("#new_account_email").val(),
            password: $("#new_account_password").val(),
        });
    })
}




function screenlock() {
    /*
    if ('wakeLock' in navigator) {
      isSupported = true;
      alert('Screen Wake Lock API supported!')
        try {
          navigator.wakeLock.request('screen');
          alert('Wake Lock is active!');
        } catch (err) {
          // The Wake Lock request has failed - usually system related, such as battery.
        }
    } else {
      wakeButton.disabled = true;
      alert('Wake lock is not supported by this browser.')
    }
    */
}

window.addEventListener('DOMContentLoaded', init, false);


