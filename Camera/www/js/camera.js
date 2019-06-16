const app = {
  init: function() {
    this.initFastClick();
    this.initButtons();
  },

  initFastClick: function() {
    FastClick.attach(document.body);
  },

  initButtons: function() {
    const buttonAction = document.querySelector('#button-action');
    buttonAction.addEventListener('click', function() {
      app.loadPhoto(Camera.PictureSourceType.CAMERA);
    });

    const filterButtons = document.querySelectorAll('.button-filter');
    filterButtons[0].addEventListener('click', function() {
      app.applyFilter('gray');
    });
    filterButtons[1].addEventListener('click', function() {
      app.applyFilter('negative');
    });
    filterButtons[2].addEventListener('click', function() {
      app.applyFilter('sepia');
    });

    const buttonGallery = document.querySelector('#button-gallery');
    buttonGallery.addEventListener('click', function() {
      app.loadPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
    });
  },

  loadPhoto: function(pictureSourceType) {
    const options = {
      quality: 50,
      sourceType: pictureSourceType,
      destinationType: Camera.DestinationType.FILE_URI,
      targetWidth: 300,
      targetHeight: 300,
      correctOrientation: true
    };
    navigator.camera.getPicture(app.loadedPhoto, app.errorLoadingPhoto, options);
  },

  loadedPhoto: function(imageURI) {
    const img = document.createElement('img');
    img.onload = function() {
      app.paintPhoto(img);
    };
    img.src = imageURI;
  },

  paintPhoto: function(img) {
    const canvas = document.querySelector('#photo');
    const context = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0, img.width, img.height);
  },

  errorLoadingPhoto: function(message) {
    console.log('Error loading photo: ' + message);
  },

  applyFilter: function(filterName) {
    const canvas = document.querySelector('#photo');
    const context = canvas.getContext('2d');
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    effects[filterName](imageData.data);
    context.putImageData(imageData, 0, 0);
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
