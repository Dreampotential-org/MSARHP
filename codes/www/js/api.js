function get_finger_print() {
    const t0 = performance.now();
    const fingerprint = getBrowserFingerprint()
    const t1 = performance.now();
    console.log(fingerprint)
    return fingerprint;
}






function download(callback) {

    var form = new FormData();

    $.ajax({
        url: SERVER + "storage/getfiles/",
        async: true,
        crossDomain: true,
        method: "GET",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
            console.log("start session response: ", response);
            callback(JSON.parse(response)['results'])
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}

function getfiles(callback) {

    var form = new FormData();

    $.ajax({
        url: SERVER + "storage/getfiles/",
        async: true,
        crossDomain: true,
        method: "GET",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
            console.log("start session response: ", response);
            callback(JSON.parse(response)['results'])
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}


function getsessions(callback) {

    var form = new FormData();
    form.append("source", window.location.host);
    form.append("deviceid", get_finger_print())

    $.ajax({
        url: SERVER + "ashe/sessions?deviceid=" + get_finger_print(),
        async: true,
        crossDomain: true,
        method: "GET",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
		console.log("start sessions response: ", response);
		callback(JSON.parse(response))

	},
	    error: function (err) {
		    console.log("start error", err)
	    },
    });
}

function get_session_stats(callback) {

    var form = new FormData();
    form.append("source", window.location.host);
    form.append("deviceid", get_finger_print())

    $.ajax({
        url: SERVER + "ashe/stats",
        async: true,
        crossDomain: true,
        method: "GET",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,
        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
		console.log("start session response: ", response);
		// GLOBAL_SESSION_ID = JSON.parse(response)['session_id']
		// callback(JSON.parse(response)['session_id'])
		$("#stats_miles").text(JSON.parse(response)['miles'])

	},
	    error: function (err) {
		    console.log("start error", err)
	    },
    });
}

function startsessionapi(callback) {

    var form = new FormData();
    form.append("deviceid", get_finger_print())
    form.append("source", window.location.host);

    $.ajax({
        url: SERVER + "ashe/start",
        async: true,
        crossDomain: true,
        method: "POST",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        success: function (response) {
            console.log("start session response: ", response);
            GLOBAL_SESSION_ID = JSON.parse(response)['session_id']
            localStorage.setItem('token', GLOBAL_SESSION_ID)
            callback(JSON.parse(response)['session_id'])

        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}


function savedots(callback) {

    if (!(POINTS.slice(
          POINTS,
	    pointsapiCount, POINTS.length))) {

	console.log("waiting for points xxx....");
	return
    }
	
    var form = new FormData();
    form.append("deviceid", get_finger_print())
    form.append("source", window.location.host);
    form.append("session_id", GLOBAL_SESSION_ID);
    form.append("dots", JSON.stringify(POINTS.slice(
	    	pointsapiCount, POINTS.length)));
    pointsapiCount = POINTS.length
    isActive = true

    $.ajax({
        url: SERVER + "ashe/dotsbu",
        async: true,
        crossDomain: true,
        method: "POST",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        success: function (response) {
            console.log("start session response: " + response + " " + pointsapiCount);
    	    isActive = false
	    if (callback) {
            	callback(JSON.parse(response))
	    }
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}

// XXX we need to make this api bulk syncing
function session_point_api(position) {

    // $("#debug").text(POINTS)
    var form = new FormData();
    form.append("deviceid", get_finger_print())
    form.append("source", window.location.host);
    form.append("latitude", position.coords.latitude);
    form.append("longitude", position.coords.longitude);
    form.append("session_id", GLOBAL_SESSION_ID);
    $.ajax({
        url: SERVER + "ashe/session_point",
        async: true,
        crossDomain: true,
        method: "POST",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
            console.log("start response: ", response);
            // alert("Started")

            // get updated distances...
            // get_distances()


        },
        error: function (err) {
            console.log("start error", err)
            // alert("Start error")
        },
    });
}



function createdot(lat, lng) {

    // $("#debug").text(POINTS)
    var form = new FormData();
    form.append("deviceid", get_finger_print())
    form.append("source", window.location.host);
    form.append("latitude", lat);
    form.append("longitude", lng);
    form.append("session_id", GLOBAL_SESSION_ID);
    $.ajax({
        url: SERVER + "ashe/dot",
        async: true,
        crossDomain: true,
        method: "POST",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (response) {
            console.log("start response: ", response);

        },
        error: function (err) {
            console.log("start error", err)
            // alert("Start error")
        },
    });
}





function get_user_stats(callback) {
    console.log(SERVER)
    var form = new FormData();
    $.ajax({
        url: SERVER + "ashe/stats?deviceid=" + get_finger_print(),
        async: true,
        crossDomain: true,
        method: "GET",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (resp) {
            console.log("user_stats: ", resp);
            callback(JSON.parse(resp))
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}



function list_medias(callback) {
    var form = new FormData();
    $.ajax({
        url: SERVER + "configs/list_media",
        async: true,
        crossDomain: true,
        method: "GET",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (resp) {
            console.log("list_medias: ", resp);
            callback(JSON.parse(resp))
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}


function get_distances() {
    var form = new FormData();
    $.ajax({
        url: SERVER + "ashe/get_distances",
        async: true,
        crossDomain: true,
        method: "POST",
        processData: false,
        contentType: false,
        mimeType: "multipart/form-data",
        data: form,

        headers: {
            Authorization: localStorage.getItem('token'),
        },
        success: function (resp) {
            console.log("start get_distances(): ", resp);
        },
        error: function (err) {
            console.log("start error", err)
        },
    });
}


function start_polling() {

    interval = setInterval(function() {
        var interval_time = new Date();
        var diffInMilliSeconds = Math.round(
            Math.abs(interval_time - start_session_time) / 1000);
        const diff = timeConvCalc(diffInMilliSeconds);
        a = diff.split(": ");
        const total_time = ((parseInt(a[0]))*60*60) + (
            (parseInt(a[1]))*60) + parseInt(a[2]);

        dist_array.push(data['latitude']);
        dist_array.push(data['longitude']);
        var lat1 = dist_array[0];
        var lon1 = dist_array[1];
        var lat2 = data['latitude'];
        var lon2 = data['longitude'];
        const dista = getDistanceFromLatLonInKm(
            lat1, lon1, lat2, lon2);

        avg_speed = (dista *1000) / total_time;

    }, 1000);
}

SERVER_URL = 'https://api.dreampotential.org/';
API_URL = SERVER_URL + 'api/';
AI_API_URL = SERVER_URL + 'ai/';
REST_AUTH_URL = SERVER_URL + 'rest-auth/';
CHECKOUT_URL = SERVER_URL + 'checkout/';

function get_settings_checkout(url, method, data = null) {
    return {
        'async': true,
        'crossDomain': true,
        'headers': {
            'Authorization': 'Token ' + localStorage.getItem('session_id'),
        },
        'url': CHECKOUT_URL + url,
        'method': method,
        'processData': false,
        'data': data,
        'contentType': 'application/json',
        'mimeType': 'multipart/form-data',
    }
}

