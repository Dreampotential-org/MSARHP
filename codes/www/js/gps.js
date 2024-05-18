
var POINTS = []


function init_gps_stuff() {
    init_gps_event();
}

var CURRENT_POSITION = null;
var CURRENT_POSITION_LOW = null;
var GPS_FAILED = false

function init_gps_event() {
    // api_gps_checkin();
}

function api_gps_checkin() {
    var body = {}
    if (CURRENT_POSITION != null) {
        body["lat"] = CURRENT_POSITION.coords.latitude;
        body["lng"] = CURRENT_POSITION.coords.longitude;
    } else {
        body["lat"] = CURRENT_POSITION_LOW.coords.latitude;
        body["lng"] = CURRENT_POSITION_LOW.coords.longitude;
    }
    start(body);
}



function isApp() {
    return (typeof(cordova) !== 'undefined' ||
            typeof(phonegap) !== 'undefined');
}

function start_gps() {
    console.log("Started gps");
    GPS_FAILED = false;

    var geo_options_low = {
        enableHighAccuracy: false,
        maximumAge: 1000,
        timeout: 5000,
    };

    navigator.geolocation.watchPosition(
        geo_success_low, geo_error, geo_options_low
    );

    geo_options = {
        enableHighAccuracy: true,
        maximumAge: 1000,
        timeout: 5000
    };

    // Start gps prob with high accuracy
    navigator.geolocation.watchPosition(
        geo_success, geo_error, geo_options
    );

}

function geo_success_low(position) {
    CURRENT_POSITION_LOW = position
    console.log(position.coords.latitude +
        " " + position.coords.longitude);
    // session_point(position)
    localstats(position)

}

function geo_success(position) {
    CURRENT_POSITION = position
    console.log(position.coords.latitude +
        " " + position.coords.longitude);
    // session_point(position)
    localstats(position)
}


function geo_error(err) {
    console.log("Geo error" + err.code);

    if (err.code == 1 || err.code == err.PERMISSION_DENIED ||
        err.code == err.UNKNOWN_ERROR) {
        swal({
            title: "GPS Issue.",
            text: "Please allow gps permission",
            icon: "error",
        });
        navigator.geolocation.clearWatch();
        GPS_FAILED = true
        return
    }
    start_gps()
    console.log("errror no gps")
    console.warn('ERROR(' + err.code + '): ' + err.message);
}

window.addEventListener(
	'DOMContentLoaded', init_gps_stuff, false
);
