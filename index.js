var fs = require('fs');
//function for reading bmp file. Returns buffer. Will be used for 3 transforms
var bitmap = function () {
	return fs.readFileSync('./image.bmp');
};
//invoking file with modules
var transform = require('./lib/transforms');

//Checking if the image has bmp format
var header = bitmap().toString('utf-8', 0, 2 );
if (header!='BM') {
	throw new Error('Its not a valid BMP file');
}

// Usinf methods for receiving pixels start and pixels end values of image
var pixelsStart = bitmap().readUInt32LE(10);
var pixelsEnd = bitmap().length;

//Call functions(inverting colors, greenMask, redMask)
transform.invert(bitmap(), pixelsStart, pixelsEnd);
transform.redMask(bitmap(), pixelsStart, pixelsEnd);
transform.greenMask(bitmap(), pixelsStart, pixelsEnd);
