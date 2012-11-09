[tmx-loader.js](http://jamielewisuk.github.com/tmx-loader.js)
=============

A javascript library to load TMX files (used in the [Tiled Map Editor](http://mapeditor.org))

Features
========

  - Loading of TMX Files
    - Tile Layers, Object Layers
    - Objects
    - Data (CSV Format Only so far)

How to use
==========

Make sure you have include jquery, and tmx-loader.js

```html
   <script type="text/javascript" src="assets/jquery-1.8.2.min.js"></script>
   <script type="text/javascript" src="tmx-loader.js"></script>
```
  
Simply call 


``` javascript 
  tmxloader.load('tmxfile'); 
```
To load your TMX File. The following is a quick review of the common functions:



``` javascript 
  tmxloader.load('tmxfile'); 

  //Common Map Properties
  tmxloader.map.width; 
  tmxloader.map.height; 
  tmxloader.map.tileWidth; 
  tmxloader.map.tileHeight; 

  //Accessing Layer Data
  tmxloader.map.layers[0].name
  tmxloader.map.layers[0].data[y][x] //Get the value of the 1st tile map layer at co-ordinates (x,y);

  //Accessing Object Groups
  tmxloader.map.objectgroup['Enemies'].objects.length // Get the number of objects in the Object Group 'Enemies'
  tmxloader.map.objectgroup['Enemies'].objects[0].name //Get the name of an object

  //Common Object Properties
  tmxloader.map.objectgroup['Enemies'].objects[0].x 
  tmxloader.map.objectgroup['Enemies'].objects[0].y
  tmxloader.map.objectgroup['Enemies'].objects[0].width
  tmxloader.map.objectgroup['Enemies'].objects[0].height

  //Custom Object Properties (User Specified)
  tmxloader.map.objectgroup['Enemies'].objects[0].propeties['state']
  
```

Running the Tests
=================

By downloading and hosting the files and accessing testRunner.html you can run some tests which exercise the various properties discussed above

[View the Latest Test Run](http://jamielewisuk.github.com/tmx-loader.js/testRunner.html)

**Note:** When running locally, Chrome errors with the warning: 
``` javascript 
XMLHttpRequest cannot load file:<tmxfile> Origin null is not allowed by Access-Control-Allow-Origin.
```
To fix this either run Chrome with the ```--allow-file-access-from-files``` option. Or serve the files from a server.