/**
 * File Name: map.js
 *
 * Resource used in creation of this file: https://developer.here.com/documentation/examples/maps-js/services/geocode-a-location-from-address%22%3E
 *       Morgan Walker, 2020-04-18 : Created
 */
function showMap(address) {
    function geocode(platform) {
        var geocoder = platform.getGeocodingService(),
            geocodingParameters = {
                searchText: address,
                jsonattributes : 1
            };

        geocoder.geocode(
            geocodingParameters,
            onSuccess,
            onError
        );
    }

    function onSuccess(result) {
        var locations = result.response.view[0].result;

        addLocationsToMap(locations);
    }


    function onError(error) {
        alert('Can\'t reach the remote server');
    }


    var platform = new H.service.Platform({
        'apikey': 'Sv8ycZ8COTP49Sg5myf60-lyrALvjKX7fnUBFhwSEsg'
    });
    var defaultLayers = platform.createDefaultLayers();


    var map = new H.Map(document.getElementById('bidMap'),
        defaultLayers.vector.normal.map,{
            center: {lat:37.376, lng:-122.034},
            zoom: 11,
            pixelRatio: window.devicePixelRatio || 1
        });

    window.addEventListener('resize', () => map.getViewPort().resize());

    var locationsContainer = document.getElementById('panel');


    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));


    var ui = H.ui.UI.createDefault(map, defaultLayers);



    function addLocationsToMap(locations){
        var group = new  H.map.Group(),
            position,
            i;

        for (i = 0;  i < locations.length; i += 1) {
            position = {
                lat: locations[i].location.displayPosition.latitude,
                lng: locations[i].location.displayPosition.longitude
            };
            marker = new H.map.Circle(

                position,

                10000,
                {
                    style: {
                        strokeColor: 'rgba(55, 85, 170, 0.6)',
                        lineWidth: 2,
                        fillColor: 'rgba(0, 128, 0, 0.7)'
                    }
                }
            );
            marker.label = locations[i].location.address.label;
            group.addObject(marker);
        }


        map.addObject(group);
        map.setCenter(group.getBoundingBox().getCenter());
    }


    geocode(platform);
}



