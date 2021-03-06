define([
        '../ThirdParty/when',
        './Check',
        './loadImage',
        './Resource'
    ], function(
        when,
        Check,
        loadImage,
        Resource) {
    'use strict';

    /**
     * @private
     */
    function loadImageFromTypedArray(uint8Array, format, request) {
        //>>includeStart('debug', pragmas.debug);
        Check.typeOf.object('uint8Array', uint8Array);
        Check.typeOf.string('format', format);
        //>>includeEnd('debug');

        var blob = new Blob([uint8Array], {
            type : format
        });

        var blobUrl = window.URL.createObjectURL(blob);
        return loadImage(new Resource({
            url: blobUrl,
            request: request
        })).then(function(image) {
            window.URL.revokeObjectURL(blobUrl);
            return image;
        }, function(error) {
            window.URL.revokeObjectURL(blobUrl);
            return when.reject(error);
        });
    }

    return loadImageFromTypedArray;
});
