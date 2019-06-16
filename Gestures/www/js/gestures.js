const app = {
  init: function() {
    this.initButtons();
    this.initFastClick();
    this.initHammer();
  },

  initFastClick: function() {
    FastClick.attach(document.body);
  },

  initButtons: function() {
    const lightButton = document.querySelector('#light');
    const darkButton = document.querySelector('#dark');

    lightButton.addEventListener('click', this.lighten, false);
    darkButton.addEventListener('click', app.darken, false);
  },

  initHammer: function() {
    const zone = document.getElementById('gestures-zone');
    const hammertime = new Hammer(zone);

    hammertime.get('pinch').set({ enable: true });
    hammertime.get('rotate').set({ enable: true });

    zone.addEventListener('webkitAnimationEnd', function(event) {
      zone.className = '';
      document.querySelector('#info').innerHTML = '';
    });

    hammertime.on('doubletap', function(event) {
      zone.className = 'doubletap';
      document.querySelector('#info').innerHTML = event.type;
    });

    hammertime.on('press', function(event) {
      zone.className = 'press';
      document.querySelector('#info').innerHTML = event.type;
    });

    hammertime.on('swipe', function(event) {
      let className = undefined;
      direction = event.direction;

      if (direction === 4) {
        className = 'swipe-right';
      }
      if (direction === 2) {
        className = 'swipe-left';
      }

      zone.className = className;
      document.querySelector('#info').innerHTML = event.type;
    });

    hammertime.on('rotate', function(event) {
      const threshold = 25;
      if (event.distance > threshold) {
        zone.className = 'rotate';
      }
      document.querySelector('#info').innerHTML = event.type;
    });
  },

  lighten: function() {
    document.body.className = 'light';
  },

  darken: function() {
    document.body.className = 'dark';
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
}
