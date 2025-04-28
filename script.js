// Initialize map centered on Muong La, Son La
var map = L.map('map').setView([21.331, 104.015], 11);

// Add OpenStreetMap base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add title
var title = L.control({ position: 'topright' });
title.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'leaflet-control title');
  div.innerHTML = "WebGIS Q2 midterm of Luu Hoang Minh - 2106060037<br>Study area: Muong La, Son La";
  return div;
};
title.addTo(map);

// Add legend
var legend = L.control({ position: 'topright' });
legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'leaflet-control legend');
  div.innerHTML += '<b>Legend</b><br>';
  div.innerHTML += '<i style="background: #3388ff; width: 12px; height: 12px; display: inline-block;"></i> Commune<br>';
  return div;
};
legend.addTo(map);

// Load and display commune GeoJSON
fetch('communes.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      onEachFeature: function (feature, layer) {
        if (feature.properties && feature.properties.name) {
          layer.bindPopup(feature.properties.name);
        }
        // Add label directly to map
        if (layer.getBounds) {
          var center = layer.getBounds().getCenter();
          L.marker(center, {
            icon: L.divIcon({
              className: 'commune-label',
              html: feature.properties.name,
              iconSize: [100, 20]
            })
          }).addTo(map);
        }
      },
      style: {
        color: "#3388ff",
        weight: 2,
        fillOpacity: 0.3
      }
    }).addTo(map);
  });
