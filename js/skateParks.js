
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

        var lat = recordValue["lat"];
		var long = recordValue["lon"];
		var marker = L.marker([lat, long]).addTo(myMap);
		var name = recordValue["name"];
        var url = recordValue["url"];

		if(name == "") {
			name = "The name of this skate park is unknown."
		}
		if(url == "") {
			url = "The url of this skate park is unknown.";
		}
		popupText = "<strong>" + name + "</strong>" + "<br>" + "<U>" + url + "</U>";
		marker.bindPopup(popupText).openPopup();
	});

}

$(document).ready(function() {

    var skateParks = {
        resource_id: "ebd224e1-d029-4733-a93d-b28de885d23c",
        limit: 50
    }


    $.ajax({
        url: "https://data.gov.au/data/api/3/action/datastore_search",
        data: skateParks,
        dataType: "jsonp",
        cache: true,
        success: function(results) {
            iterateRecords(results);
        }
    });

});