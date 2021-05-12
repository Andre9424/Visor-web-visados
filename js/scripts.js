// Mapa Leaflet
var mapa = L.map('mapid').setView([9.74, -84.23], 12);

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


// Capa vectorial de redvial en formato GeoJSON
$.getJSON("https://Andre9424.github.io/Tarea-2-Visor-Web/redvial/redvial.geojson", function(geodata) {
var capa_redv = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#ff0000", 'weight': 2.0, 'fillOpacity': 0.0}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Código de la vía</strong>: " + feature.properties.Código + "<br>" + "<strong>Longitud</strong>: " + feature.properties.LONGITUD;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_redv, 'Red Vial');
});

// Capa vectorial de presentaciones en formato GeoJSON
$.getJSON("https://Andre9424.github.io/Tarea-2-Visor-Web/presactivas/presactivas.geojson", function(geodata) {
var capa_activ = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#00F79E", 'weight': 1.5, 'fillOpacity': 0.5}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Fecha de ingreso</strong>: " + feature.properties.Fecha_pres + "<br>" + "<strong>Finca</strong>: " + feature.properties.Finca + "<br>" + "<strong>Número de presentación</strong>: " + feature.properties.N_pres + "<br>" + "<strong>Número de Trámite</strong>: " + feature.properties.N_TRAMITE;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_activ, 'Trámites de visado');
});

// Capa vectorial de nacientes en formato GeoJSON
$.getJSON("https://Andre9424.github.io/Tarea-2-Visor-Web/nacientes/nacientes.geojson", function(geodata) {
var capa_nac = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#00F79E", 'weight': 1.5, 'fillOpacity': 0.5}
    },
    onEachFeature: function(feature, layer) {
      var popupText = "<strong>Tipo de naciente</strong>: " + feature.properties.Decripcion;
      layer.bindPopup(popupText);
    }			
  }).addTo(mapa);

  control_capas.addOverlay(capa_nac, 'Nacientes');
});

// Capa vectorial de canton en formato GeoJSON
$.getJSON("https://Andre9424.github.io/Tarea-2-Visor-Web/canton/canton.geojson", function(geodata) {
  var capa_canton = L.geoJson(geodata, {
    style: function(feature) {
	  return {'color': "#F3FF33", 'weight': 2.0, 'fillOpacity': 0.0}
    }}).addTo(mapa);

  control_capas.addOverlay(capa_canton, 'Cantón');
});	

