var POINTS = []
let total_miles=document.getElementById('total_miles')
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
    point = {
	'latitude':  position.coords.latitude,
        'longitude': position.coords.longitude,
        'created_at': new Date()
    }

    POINTS.push(point)

    if (POINTS.length == 1) {
	return
    }

    // update total distance
    console.log(getspdistance(POINTS));
    totaldistance += get_distance(  
	POINTS[ POINTS.length -2 ]['latitude'],
	POINTS[ POINTS.length -2 ]['longitude'],

	POINTS[ POINTS.length -1 ]['latitude'],
	POINTS[ POINTS.length -1 ]['longitude'],
	"M")

    $("#stats_miles").text(totaldistance)
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
function getspdistance(session_points){
    if(!session_points){
        return {'distance_miles': 0,
                'distance_meters': 0,
                'interval_stats': []}
    }
    let interval_distance=0;
    let interval_stats = [];
    let session_distance = 0;
    let complete_one_mile = 0;
    let speed_per_mile_cover_last = 0;
    let start_session;
    let distance;
    for (var i = 0; i < session_points.length -1; i++) {
        if(start_session == null){
            start_session = session_points[i]

        }
        distance = get_distance(
            session_points[i].latitude, session_points[i].longitude,
            session_points[i + 1 ].latitude, session_points[i +1].longitude
        )
        if(complete_one_mile == 0){
            speed_cover_per_mile = session_points[i].created_at

        }
        session_distance += distance
        interval_distance += distance
        complete_one_mile += distance
        if (0.62137 * interval_distance >= .1){
             hours = float(
                (start_session.created_at - session_points[i].created_at).seconds/
                (60 * 60)
            )
             mph = (
                (0.62137 * interval_distance) / hours
            )

            start_session = session_points[i]
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
             (speed_cover_per_mile - session_points[i].created_at).seconds/
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
    const data= {'distance_miles': session_distance * 0.62137,
    'distance_meters': session_distance * 1000,
    'interval_stats': interval_stats,
    "POINTS": POINTS.length,
    
}   
    return JSON.stringify(data);
    
    

   

    
}

