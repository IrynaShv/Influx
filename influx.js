function onChangeHandler(key) {
    if(key.keyCode == 13) {
        calculateAndDisplayRoute();
    }
};

function initMap() {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude = position.coords.latitude;                    //users current
            var longitude = position.coords.longitude;                 //location
            var coords = new google.maps.LatLng(latitude, longitude); //Creates variable for map coordinates
             directionsService = new google.maps.DirectionsService();
             directionsDisplay = new google.maps.DirectionsRenderer();
            var mapOptions = {
                zoom: 15,  //Sets zoom level (0-21)
                center: coords, //zoom in on users location
            };
            map = new google.maps.Map(document.getElementById("map"), mapOptions /*Creates a new map using the passed optional parameters in the mapOptions parameter.*/);
            directionsDisplay.setMap(map);
        });
    } else /*TODOOOOO*/{}
}

function calculateTime(start, end, mode){

    var totalDuration = 0;

    var request = {
        origin: start,
        destination: end,
        travelMode: mode
    };

    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {

            var legs = response.routes[0].legs;
            for(var i=0; i<legs.length; ++i) {
                totalDuration += legs[i].distance.value;
            }
            directionsDisplay.setDirections(response);
            console.log(totalDuration);
        }
    });

    return totalDuration;
}

function calculateAndDisplayRoute() {
    if (navigator.geolocation) { //Checks if browser supports geolocation
        navigator.geolocation.getCurrentPosition(function (position) {                                                              //This gets the
            var latitude = position.coords.latitude;                    //users current
            var longitude = position.coords.longitude;                 //location
            var coords = new google.maps.LatLng(latitude, longitude); //Creates variable for map coordinates
            var mapOptions = {
                zoom: 15,  //Sets zoom level (0-21)
                center: coords, //zoom in on users location
                mapTypeControl: true, //allows you to select map type eg. map or satellite
                navigationControlOptions: {
                    style: google.maps.NavigationControlStyle.SMALL //sets map controls size eg. zoom
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP //sets type of map Options:ROADMAP, SATELLITE, HYBRID, TERRIAN
            };
            map = new google.maps.Map( /*creates Map variable*/ document.getElementById("map"), mapOptions /*Creates a new map using the passed optional parameters in the mapOptions parameter.*/);
            directionsDisplay.setMap(map);
            var time = calculateTime(coords,document.getElementById('end').value,google.maps.DirectionsTravelMode.DRIVING).done(console.log(time));
            console.log(time);
            //var request = {
            //    origin: coords,
            //    destination: document.getElementById('end').value,
            //    travelMode: google.maps.DirectionsTravelMode.DRIVING
            //};
            //
            //directionsService.route(request, function (response, status) {
            //    if (status == google.maps.DirectionsStatus.OK) {
            //        directionsDisplay.setDirections(response);
            //    }
            //});response
        });
    }
}
function toggleVisibility(classString) {

    var elements = document.getElementsByClassName("toggle-" + classString);
    console.log(elements);
    for (i = 0; i < elements.length; i++) {
        if (elements[i].style.display == 'none') {
            elements[i].style.display = 'block';
        } else {
            elements[i].style.display = 'none';
        }
    }
}