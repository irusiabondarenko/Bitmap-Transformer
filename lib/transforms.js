var fs = require('fs');
// function for inverting colors transform
function invertColors(bitmap, start, end) {
  	for (var i = start; i < end; i++) {
		var pixelValue = 255 - bitmap.readUInt8(i);
		bitmap.writeUInt8(pixelValue, i);
	}
  fs.writeFile('opposite.bmp', bitmap);
}
// function for greenMask transform (R =0; B =0)
function greenMask (bitmap, start, end) {
	for (var i = start; i<end; i++) {
		var pixel = bitmap.readUInt8(i);
		var rgb = toRGB(pixel);
		var transform = transformGreen(rgb);
		var newPixel = transformedMask (transform);
		bitmap.writeUInt8(newPixel, i);
	}
	fs.writeFileSync('greenMask.bmp', bitmap);
}
// function for redMask transform (G =0; B =0)
function redMask (bitmap, start, end) {
	for (var i = start; i<end; i++) {
		var pixel = bitmap.readUInt8(i);
		var rgb = toRGB(pixel);
		var transform = transformRed(rgb);
        var newPixel = transformedMask (transform);
	    bitmap.writeUInt8(newPixel, i);
	};
	fs.writeFileSync('redMask.bmp', bitmap);
}
// Function for retrieving R, G, B, A values from pixels
function toRGB (pixel) {
	var blue = pixel>>6;
	var green = (pixel>>4) - (blue << 2);
	var red = (pixel>>2) - (blue << 4) - (green <<2);
	var alpha = pixel - (blue<<6) - (green<<4) - (red<<2);
	var rgb = {
		red: red,
		green: green,
		blue: blue,
		alpha: alpha
	}
	return rgb;
}
// function for greenMask transform , return new transformed RGB value
function transformGreen (rgb) {
	var newRGB = {
		red: 0,
		green: rgb.green,
		blue: 0,
		alpha: 0
	}
	return newRGB;
}
// function for redMask transform , return new transformed RGB value

function transformRed (rgb) {
	var newRGB = {
		red: rgb.red,
		green: 0,
		blue: 0,
		alpha: 0
	}
	return newRGB;
}
// function for creating new pixel based on new RGB value
function  transformedMask (rgb) {
	 var newPixel = (rgb.blue<<6) + (rgb.green<<4) + (rgb.red<<2) + (rgb.alpha);    
	 return newPixel;
}
// creating moduls for 3 functions : 
module.exports.redMask = redMask;
module.exports.greenMask = greenMask;
module.exports.invert = invertColors;
