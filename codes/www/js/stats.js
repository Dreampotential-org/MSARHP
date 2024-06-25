var pointsapiCount = 0;
var isActive = false;
var POINTS = [];

function session_point(position)  {
    point = {
	'latitude':  position.coords.latitude,
        'longitude': position.coords.longitude,
        'created_at': new Date()
    }

    POINTS.push(point)

    if (POINTS.length == 1) {
        add_point("map_canvas", point, true)
	     //alert("DJDJDJ")
         
    }
    add_point("map_canvas", point, false)
    session_point_api(position)
}

var totaldistance = 0
function localstats(position)  {
	/*
	diff = 2
	var oldDateObj = new Date()
var newDateObj = new Date(oldDateObj.getTime() + diff*60000);

    console.log(calculateSpeed(new Date(),
	           37.3954791, -122.117815,
	    	   newDateObj, 37.3522517, -122.038765))
	return
	*/

    point = {
	'latitude':  position.coords.latitude,
        'longitude': position.coords.longitude,
        'created_at': new Date()
    }

    POINTS.push(point)

    if (POINTS.length == 1) {
        add_point("map_canvas", point, true)
	return
    }
    add_point("map_canvas", point, false)



    // update total distance
    // var results = getspdistance(POINTS);
    prevpoint = getopostamp(POINTS)

    //$("#distance").text(results['miles'])
    $("#marks").text(POINTS.length)
    $("#mph").text(calculateSpeed(
		prevpoint['created_at'],
		prevpoint['latitude'], 
		prevpoint['longitude'],

		POINTS[ POINTS.length - 1 ]['created_at'],
		POINTS[ POINTS.length - 1 ]['latitude'], 
		POINTS[ POINTS.length - 1 ]['longitude'],
	)
    )


    // every 10 seconds push the points to the api
    setInterval(function() {  
	if (!(isActive)) {
		console.log("Saving the points");
		savedots();
        } else { 
	   console.log("already active pushing points..");
	}
    }, 10000)

}

function getopostamp(points) { 
   // We want to get oldest matching 
	var index = 0
	var newDateObj = new Date() - 2000;
	for(var i = points.length -1; i >= 0; i-- ) {
	    var point = points[i]
		if (point['created_at'] < newDateObj) {
			$("#debug3").text(
			   "se: " + i + " w " + points.length)	
			return point
		}
		index++
	}

	return points[ points.length - 2]

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
        if (unit=="M") { dist = dist * 0.8684 }
        return dist;
    }
}


function get_local_stats() {
    var distance = 0;
    let speedFlow =   [
	  'none', 'normal','fast','tofast','slow','toslow'
    ]

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

function getspdistance(points) {
    if(!points){
        return {'miles': 0,
                'meters': 0,
                'interval_stats': []}
    }
    let interval_distance=0;
    let interval_stats = [];
    let session_distance = 0;
    let complete_one_mile = 0;
    let speed_per_mile_cover_last = 0;
    let start_session;
    let distance;
    for (var i = 0; i < points.length -1; i++) {
        if(start_session == null){
            start_session = points[i]

        }
        distance = get_distance(
            points[i].latitude, points[i].longitude,
            points[i + 1 ].latitude, points[i +1].longitude
        )
        if(complete_one_mile == 0){
            speed_cover_per_mile = points[i].created_at

        }
        session_distance += distance
        interval_distance += distance
        complete_one_mile += distance
        if (0.62137 * interval_distance >= .1){
             hours = float(
                (start_session.created_at - points[i].created_at).seconds/
                (60 * 60)
            )
             mph = (
                (0.62137 * interval_distance) / hours
            )

            start_session = points[i]
            interval_stats.append({
                'distance': interval_distance,
                'mph': mph,
                'hours': hours,
                'speedFlow': 'none'
            })

            interval_distance = 0

            
        }
               
    if (0.62137 * complete_one_mile >= 1){
         hours = float(
             (speed_cover_per_mile - points[i].created_at).seconds/
             (60 * 60)
         )
          mph = (
             (0.62137 * complete_one_mile) / hours
         )
         if(speed_per_mile_cover_last == 0){
             speed_type = speedFlow[0]
         }
             
         else if(speed_per_mile_cover_last > mph){
             speed_type = speedFlow[2];
         }
             
        else if(speed_per_mile_cover_last < mph){
                 speed_type = speedFlow[3]

             }
           

         speed_per_mile_cover_last = mph

         interval_stats.append({
             'distance': interval_distance,
             'mph': mph,
             'hours': hours,
             'speedFlow': speed_type
         })
         complete_one_mile = 0
        }
    }

    return {
	'miles': session_distance * 0.62137,
	'meters': session_distance * 1000,
	'interval_stats': interval_stats,
	"POINTS": POINTS.length,
    }   
}


function toRad(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

function CalcDistanceBetween(lat1, lon1, lat2, lon2) {
    //Radius of the earth in:  1.609344 miles,  6371 km  | var R = (6371 / 1.609344);
    var R = 3958.7558657440545; // Radius of earth in Miles
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}

function calculateSpeed(t1, lat1, lng1, t2, lat2, lng2) {

  var hours = (t2 - t1)  /(1000 * 60 * 60)
  distance = CalcDistanceBetween(lat1, lng1, lat2, lng2)
  // console.log("Distance is " + distance + " hours are " + hours)

  var mph =  distance / hours;
  //$("#debug").append(
//	 "Distance is " + distance + " hours are " + hours + " mph" + mph + " <br>")

  return mph
}
