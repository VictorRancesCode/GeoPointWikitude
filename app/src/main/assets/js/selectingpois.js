var World = {
	isRequestingData: false,
	initiallyLoadedData: false,
	markerDrawable_idle: null,
	markerDrawable_selected: null,
	markerDrawable_directionIndicator: null,
	markerList: [],
	currentMarker: null,
	loadPoisFromJsonData: function loadPoisFromJsonDataFn(poiData) {
		World.markerList = [];
		World.markerDrawable_idle = new AR.ImageResource("assets/marker_idle2.png");
		World.markerDrawable_selected = new AR.ImageResource("assets/marker_selected2.png");
		World.markerDrawable_directionIndicator = new AR.ImageResource("assets/indi.png");
		for (var currentPlaceNr = 0; currentPlaceNr < poiData.length; currentPlaceNr++) {
			var singlePoi = {
				"id": poiData[currentPlaceNr].id,
				"latitude": parseFloat(poiData[currentPlaceNr].latitude),
				"longitude": parseFloat(poiData[currentPlaceNr].longitude),
				"altitude": parseFloat(poiData[currentPlaceNr].altitude),
				"title": poiData[currentPlaceNr].name,
				"description": poiData[currentPlaceNr].description
			};
			World.markerList.push(new Marker(singlePoi));
		}
		World.updateStatusMessage(currentPlaceNr + ' places loaded');
	},
	updateStatusMessage: function updateStatusMessageFn(message, isWarning) {

		var themeToUse = isWarning ? "e" : "c";
		var iconToUse = isWarning ? "alert" : "info";

		$("#status-message").html(message);
		$("#popupInfoButton").buttonMarkup({
			theme: themeToUse
		});
		$("#popupInfoButton").buttonMarkup({
			icon: iconToUse
		});
	},

	locationChanged: function locationChangedFn(lat, lon, alt, acc) {

		if (!World.initiallyLoadedData) {
			World.requestDataFromLocal(lat, lon);
			World.initiallyLoadedData = true;
		}
	},
	onMarkerSelected: function onMarkerSelectedFn(marker) {
		if (World.currentMarker) {
			if (World.currentMarker.poiData.id == marker.poiData.id) {
				return;
			}
			World.currentMarker.setDeselected(World.currentMarker);
		}
		marker.setSelected(marker);
		World.currentMarker = marker;
	},
	onScreenClick: function onScreenClickFn() {
		if (World.currentMarker) {
			World.currentMarker.setDeselected(World.currentMarker);
		}
	},

	requestDataFromLocal: function requestDataFromLocalFn(centerPointLatitude, centerPointLongitude) {
		var poisToCreate = 20;
		var poiData = [];
		poiData.push({
                         "id": "1",
                         "longitude": (centerPointLongitude + (Math.random() / 5 - 0.1)),
                         "latitude": (centerPointLatitude + (Math.random() / 5 - 0.1)),
                         "description": "Cooperativa Progreso",
                         "altitude": AR.CONST.UNKNOWN_ALTITUDE,
                         "name": "El Progreso"
                       });
         poiData.push({
                          "id": "2",
                          "longitude":(centerPointLongitude + (Math.random() / 5 - 0.1)),
                          "latitude":(centerPointLatitude + (Math.random() / 5 - 0.1)),
                          "description": "Colegio Progreso",
                          "altitude": -32768,
                          "name": "Colegio Progreso"
                        });
        poiData.push({
                         "id": "3",
                         "longitude":(centerPointLongitude + (Math.random() / 5 - 0.1)),
                         "latitude":(centerPointLatitude + (Math.random() / 5 - 0.1)),
                         "description": "Hola =D",
                         "altitude": -32768,
                         "name": "Hola =D"
                       });
        poiData.push({
                         "id": "4",
                         "longitude":(centerPointLongitude + (Math.random() / 5 - 0.1)),
                         "latitude":(centerPointLatitude + (Math.random() / 5 - 0.1)),
                         "description": "Android Camp 2017",
                         "altitude": -32768,
                         "name": "Android Camp 2017"
                       });
		World.loadPoisFromJsonData(poiData);
	}
};
AR.context.onLocationChanged = World.locationChanged;
AR.context.onScreenClick = World.onScreenClick;