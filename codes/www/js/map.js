var geocoder;
var map;
var lastCoordinates = [];
var polyline = null;
var path = []; // global variable to hold all the past locations

var map = null;

function add_point(selector, point, first) {

    if (first) {
        map = new google.maps.Map(
        document.getElementById(selector), {
            center: new google.maps.LatLng(point.latitude,
                                           point.longitude),
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
    }

    lastCoordinates = new google.maps.Marker({
        position: new google.maps.LatLng(parseFloat(point.latitude),
                                         parseFloat(point.longitude)),
        map: map,
        title: 'YAY'
    });
    map.panTo(lastCoordinates.getPosition());
    path.push(lastCoordinates.getPosition());
    if (path.length >= 2) {
        // display the polyline once it has more than one point
        polyline.setMap(map);
        polyline.setPath(path);
    }
}
