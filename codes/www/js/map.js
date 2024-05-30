var geocoder;
var map;
var lastCoordinates = [];
var polyline = new google.maps.Polyline({
   // set desired options for color width
   strokeColor:"#0000FF",  // blue (RRGGBB, R=red, G=green, B=blue)
   strokeOpacity: 0.4      // opacity of line
}); // create the polyline (global)
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
