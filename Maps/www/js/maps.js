const app = {
  init: function() {
    this.initFastClick();
  },

  initFastClick: function() {
    FastClick.attach(document.body);
  },

  deviceReady: function() {
    navigator.geolocation.getCurrentPosition(app.paintCoords, app.errorGeolocation);
  },

  paintCoords: function(position) {
    const myMap = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);

    L.tileLayer(
      'https://api.mapbox.com/styles/v1/mapbox/outdoors-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoieWlzdXMiLCJhIjoiZ1pVdHJLZyJ9.g10jTLUVyoVC83DEENOxbw',
      {
        attribution:
          'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18
      }
    ).addTo(myMap);

    app.paintMarker([position.coords.latitude, position.coords.longitude], 'You are here!', myMap);

    myMap.on('click', function(evento) {
      const text =
        'Marker at latitude (' +
        evento.latlng.lat.toFixed(2) +
        ') and longitude (' +
        evento.latlng.lng.toFixed(2) +
        ')';
      app.paintMarker(evento.latlng, text, myMap);
    });
  },

  paintMarker: function(latlng, text, map) {
    const marker = L.marker(latlng).addTo(map);
    marker.bindPopup(text).openPopup();
  },

  errorGeolocation: function(error) {
    console.log(error.code + ': ' + error.message);
  }
};

if ('addEventListener' in document) {
  document.addEventListener(
    'DOMContentLoaded',
    function() {
      app.init();
    },
    false
  );
  document.addEventListener(
    'deviceready',
    function() {
      app.deviceReady();
    },
    false
  );
}
