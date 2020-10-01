
function iterateRecords(results) {

    console.log(results);
    var myMap = L.map("map").setView([-37.5, 142], 10);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXFpZHJ1Z28iLCJhIjoiY2tlcDdmbDV2MDc2ZjJ4bnk5bTgwcmkwbSJ9.aiKl3J-I-lVcj0iTllZlpg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(myMap);

    $.each(results.result.records, function(recordID, recordValue) {

        var wktGrometry = recordValue["WKT_Geometry"];
        var geoJSON = Terraformer.WKT.parse(wktGrometry);
        var marker = L.geoJSON(geoJSON).addTo(myMap);
        if(recordValue["name"] !== "") {
            popupText = "<strong>" + recordValue["name"];

        } else {
            popupText = "<strong>" + "The name of this reserve is unknown";
        }
        marker.bindPopup(popupText).openPopup();
    });

}

$(document).ready(function() {

    var reserves = {
        resource_id: "a0b57c71-fcb8-479b-ba74-c0f74d8aec2d",
        limit: 50
    }


    $.ajax({
        url: "https://data.gov.au/data/api/3/action/datastore_search",
        data: reserves,
        dataType: "jsonp",
        cache: true,
        success: function(results) {
            iterateRecords(results);
        }
    });

});
