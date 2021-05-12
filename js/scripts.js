// Mapa Leaflet
var mapa = L.map('mapid').setView([9.8, -84.25], 8);

// Definición de capas base
var capa_osm = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?', 
  {
    maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }
).addTo(mapa);	
var esri = L.tileLayer(
	  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', 
	  {
            attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
	  }
	).addTo(mapa);
// Conjunto de capas base
var capas_base = {
  "Open Street Maps": capa_osm,
  "Satelital": esri
};	    
	    
// Control de capas
control_capas = L.control.layers(capas_base).addTo(mapa);	

// Control de escala
L.control.scale({position: "topright"}).addTo(mapa);

// Capa vectorial de ASP en formato GeoJSON
$.getJSON("https://github.com/Andre9424/Tarea-2-Leaflet-Visor-Web/blob/7b2cb73b9af8d2d776f2cd3ffaaad71cd018059e/canton.geojson", function(geodata) {
  var capa_canton = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#013220", 'weight': 3, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Cantón</strong>: " + feature.properties.canton;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_canton, 'Cantón');
});	


// Capa vectorial de distritos en formato GeoJSON
$.getJSON("https://tpb729-desarrollosigweb-2021.github.io/datos/ign/distritos-wgs84.geojson", function(geodata) {
var capa_distritos = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#ff0000", 'weight': 3, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Distrito</strong>: " + feature.properties.distrito + "<br>" + "<strong>Cantón</strong>: " + feature.properties.canton + "<br>" + "<strong>Provincia</strong>: " + feature.properties.provincia;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_distritos, 'Distritos');
});