var POINTS = []
function localstats(position)  {
    point = {
	'latitude':  position.coords.latitude,
        'longitude': position.coords.longitude,
        'created_at': new Date()
    }

    POINTS.push(point)

    //if (POINTS.length == 1) {
    //    add_point("map_canvas", point, true)
	     //alert("DJDJDJ")
    //}
    $("#debug").append(point)
    add_point("map_canvas", point, false)
}

function get_distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    }
    else {
        var radlat1 = Math.PI * lat1/180;
        var radlat2 = Math.PI * lat2/180;
        var theta = lon1-lon2;
        var radtheta = Math.PI * theta/180;
        var dist = (Math.sin(radlat1) * Math.sin(radlat2) +
                    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta));
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180/Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit=="K") { dist = dist * 1.609344 }
        if (unit=="N") { dist = dist * 0.8684 }
        return dist;
    }
}


function get_local_stats() {
    var distance = 0;
    let speedFlow =   ['none', 'normal','fast','tofast','slow','toslow']

    let complete_one_mile = 0;
    let complete_one_mile_time = 0;
    let speed_per_mile_cover_last = 0 ;
    
    for (var i = 0; i < POINTS.length -1; i++) {
        distance += get_distance(
            POINTS[i].latitude, POINTS[i].longitude,
            POINTS[i + 1 ].latitude, POINTS[i +1].longitude
        )
        // Distance in miles
        let interval_distance = 0.62137 * distance
        if ( interval_distance >= -0.1){
            complete_one_mile += interval_distance;
            const hours =Math.abs((POINTS[i].created_at - POINTS[i + 1 ].created_at )/
                (60 * 60)   )
                complete_one_mile_time += complete_one_mile_time + hours
            }
        let speed_type ; 
        if (complete_one_mile >= 1) {
            const mph = ( complete_one_mile / complete_one_mile_time )

            if (speed_per_mile_cover_last == 0)
                speed_type = speedFlow[1]
            else if(speed_per_mile_cover_last > mph)
                speed_type = speedFlow[2]
            else if(speed_per_mile_cover_last < mph)
                speed_type = speedFlow[4]
            
            speed_per_mile_cover_last = mph
            text_to_speech(mph,'normal')
            complete_one_mile = 0
            complete_one_mile_time = 0
        }
        
    }
    console.log({distance});
    console.log({POINTS});
}
