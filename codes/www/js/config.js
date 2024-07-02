var SERVER = '';
var HOST = '';
var WEBSOCKET_HOST = '';

function set_server() {

    if (window.location.origin.includes("compass")) {
        SERVER = 'https://vm2967.tmdcloud.com/';
        WEBSOCKET_HOST = 'wss://vm2967.tmdcloud.com';
    }
    else if (window.location.origin.includes("https://meylordrive.today")) {
        SERVER = 'https://1.dreampotential.org/';
        WEBSOCKET_HOST = 'wss://1.dreampotential.org';
    }
    else if (window.location.origin.includes("localhost:8087")) {
        SERVER = 'http://localhost:8000/';
        WEBSOCKET_HOST = 'wss://localhost:8000';
    }
    else {
        SERVER = 'http://localhost:8000/';
        WEBSOCKET_HOST = 'wss://1.dreampotential.org';
    }
    SERVER = 'https://1.dreampotential.org/';
};
set_server()
