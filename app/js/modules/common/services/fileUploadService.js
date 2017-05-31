angular.module('webapp.common').service({
    FileUploadService: ['$q', fileUploadService]
});


function fileUploadService($q) {

    return {
        fileToBase64: fileToBase64,
        HTMLencode: HTMLencode,
        resizeImage: resizeImage
    };

    function isUnvalidFile(file) {
        return _.isUndefined(file);
    }

    function HTMLencode (string) {
        return angular.element('<div>').text(string).html();
    }

    function fileToBase64(file) {
        if (isUnvalidFile(file)) {
            return;
        }

        var deferred = $q.defer();
        var reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = function() {
            deferred.resolve(reader.result);
        };

        reader.onerror = function() {
            console.warn('Add Picture: processing file to based64 failed');
        };

        return deferred.promise;
    }

    // specify resizeImageOption = {
    //     max_width: 1050,
    //     max_height: 600
    // };
    // as default
    function canvasResize (img, options) {
        options = _.defaults(options, {
            max_width: 1050,
            max_height: 600
        });
        var max_width = options.max_width;
        var max_height = options.max_height;
        var canvas = document.createElement('canvas');
        var width = img.width;
        var height = img.height;

        // calculate the width and height, constraining the proportions
        if (width > height) {
            if (width > max_width) {
              //height *= max_width / width;
              height = Math.round(height *= max_width / width);
              width = max_width;
            }
        } else {
            if (height > max_height) {
              //width *= max_height / height;
              width = Math.round(width *= max_height / height);
              height = max_height;
            }
        }
        // resize the canvas and draw the image data into it
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // get the data from canvas as 30% JPG (can be also PNG, etc.)
        return canvas.toDataURL('image/jpeg', 0.3);
    }

    function resizeImage (file, options) {
        if (isUnvalidFile(file)) {
            return;
        }

        var deferred = $q.defer();

        window.URL = window.URL || window.webkitURL;
        var imgURL = window.URL.createObjectURL(file);
        var image = new Image();

        image.onload = function() {
            var compressString = canvasResize(image, options);
            deferred.resolve(compressString);
        };
        image.src = imgURL;

        return deferred.promise;
    }
}
