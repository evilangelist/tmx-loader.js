/**
 * tmx-loader.js  - A Javascript loader for the TMX File Format.
 *
 * 	Currenty Supports: 
 *						- Map
 *						- Layers
 *						- Tile Data (CSV only)
 *
 * 	Depends on: Jquery for file loading and XML parsing
 *
 */
 
var tmxloader = {}

tmxloader.trim  = function(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

tmxloader.Map = function(width,height,tileWidth,tileHeight,layers){
	this.width = width;
	this.height = height;
	this.tileWidth = tileWidth;
	this.tileHeight = tileHeight;
	this.layers = new Array(layers);
}

tmxloader.Layer = function(layerName,width,height){
	this.name = layerName;
	this.width = width;
	this.height = height;
	this.data  = new Array(height);
	
	for(var d = 0;d < height;++d){
		this.data[d] = new Array(width);
	}
	
	this.loadCSV = function(data){
		var layerData = tmxloader.trim(data).split('\n');		
		for(var x = 0; x <layerData.length; ++x){
			var line = tmxloader.trim(layerData[x]);
			var entries = line.split(',');
			for(var e = 0;e <width;++e){
				this.data[x][e] = entries[e];
			}
		}
	}	
}


tmxloader.load = function(url){

		var result;
		 $.ajax({
		    url: url,
		    type: 'get',
		    dataType: 'html',
		    async: false,
		    success: function(data) {
		        result = data;
		    } 
		 });

		 var xmlDoc = jQuery.parseXML( result );
		 $xml = $(xmlDoc);
		 $version = $xml.find("map").attr("version");
		 console.log('Parsing...' + $version);
		 $width = $xml.find("map").attr("width");
		 $height = $xml.find("map").attr("height");
		 
		 $tilewidth = $xml.find("map").attr("tilewidth");
		 $tileheight = $xml.find("map").attr("tileheight");
		 
		 tmxloader.map = new tmxloader.Map($width,$height,$tilewidth,$tileheight, $xml.find('layer').length);
		 
		 console.log('Creating Map...' +  tmxloader.map.width + " x " + tmxloader.map.height + " Tiles: " +  tmxloader.map.tileWidth + " x " +  tmxloader.map.tileHeight);
		 
		 console.log("Found " + $xml.find('layer').length + " Layers");
		 var layerCount = 0;
		 $xml.find('layer').each(function(){			
			console.log("Processing Layer: " + $(this).attr("name"));
			$data = $(this).find("data");
			
			$lwidth = $(this).attr("width");
		 	$lheight = $(this).attr("height");
		 	
		 	tmxloader.map.layers[layerCount] = new tmxloader.Layer($(this).attr("name"),$lwidth,$lheight);
		
			if($data.attr("encoding") =="csv"){
				console.log("Processing CSV");
				var eData = $data.text();
				tmxloader.map.layers[layerCount].loadCSV(eData);
				
			} else {
				console.log("Unsupported Encoding Scheme");
			}
			
			++layerCount;
		
		 });
}	
