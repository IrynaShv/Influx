var map;	// Google map object

// Initialize and display a google map
function Init()
{
    // HTML5/W3C Geolocation
    if ( navigator.geolocation )
        navigator.geolocation.getCurrentPosition( UserLocation );
    // Default to Washington, DC
    else
        ShowLocation( 38.8951, -77.0367, "Washington, DC" );
}

// Callback function for asynchronous call to HTML5 geolocation
function UserLocation( position )
{
    ShowLocation( position.coords.latitude, position.coords.longitude, "This is your Location" );
}

// Display a map centered at the specified coordinate with a marker and InfoWindow.
function ShowLocation( lat, lng, title )
{
    // Create a Google coordinate object for where to center the map
    var latlng = new google.maps.LatLng( lat, lng );

    // Map options for how to display the Google map
    var mapOptions = { zoom: 12, center: latlng  };

    // Show the Google map in the div with the attribute id 'map-canvas'.
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Place a Google Marker at the same location as the map center
    // When you hover over the marker, it will display the title
    var marker = new google.maps.Marker( {
        position: latlng,
        map: map,
        title: title
    });

    // Create an InfoWindow for the marker
    var contentString = "<b>" + title + "</b>";	// HTML text to display in the InfoWindow
    var infowindow = new google.maps.InfoWindow( { content: contentString } );

    // Set event to display the InfoWindow anchored to the marker when the marker is clicked.
    google.maps.event.addListener( marker, 'click', function() { infowindow.open( map, marker ); });
}

// Call the method 'Init()' to display the google map when the web page is displayed ( load event )
google.maps.event.addDomListener( window, 'load', Init );