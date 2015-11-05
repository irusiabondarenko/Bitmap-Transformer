'use strict';

var fs = require('fs');
var expect = require('chai').expect;
var bitmap = fs.readFileSync('../image.bmp');
var pixelsStart = bitmap.readUInt32LE(10);
var pixelsEnd = bitmap.length;
var invertedImage = fs.readFileSync('../img_transforms/opposite.bmp');

describe ('Bitmap-transformer for non-palette image' , function(){
	it("should correctly invert an image", function() {
		for (var i = pixelsStart; i < pixelsEnd; i++)
		 expect(invertedImage.readUInt8(i)).to.eql(255 - bitmap.readUInt8(i));
	});
	
	it("should have size of 11078", function() {
			expect(pixelsEnd).to.eql(11078);
	});
});

describe('readfile function', function(){
  it('should create a buffer', function() {
	if (bitmap) 
		bitmap = true;	
   expect(bitmap).to.eql(true);
  });
  it('should not be null', function() {
    expect(bitmap).not.to.be.null;
 })
});

describe('checks for created file opposite.bmp', function(){
  it('checks if a converted file exists', function(){
    expect(fs.existsSync('../opposite.bmp')).to.eql(true);
  });
});