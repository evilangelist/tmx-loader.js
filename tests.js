
var theTable;

function checkEquals(name,a,b){

	var logMessage;

	if(a==b){
		logMessage = "Pass" ;
	}	else {
		logMessage = "Fail" ;
	}
	
	
	
	tr = document.createElement('tr');
	tr.className = logMessage;
    td = document.createElement('td');
    td.appendChild(document.createTextNode(name));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(b));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(a));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode(logMessage));
    tr.appendChild(td);
    theTable.appendChild(tr);	
}

function runTests(){


	theTable = document.getElementById('table');


	var testMap = tmxloader.load("./test.tmx");
	
	// Testing simple map properties
	try{
		checkEquals("Map Width", tmxloader.map.width,"100");
		checkEquals("Map Height", tmxloader.map.height,"32");
		checkEquals("Tile Width", tmxloader.map.tileWidth,"32");
		checkEquals("Tile Height", tmxloader.map.tileHeight,"32")
		checkEquals("map.properties['levelNumber']", tmxloader.map.properties['levelNumber'],2);
		checkEquals("map.properties['timeLimit']", tmxloader.map.properties['timeLimit'],400);
	}catch(err){
		checkEquals("MAP Error:","",err);
	}
	
	//Tilesets
	try{
		checkEquals("Tileset Start GID",tmxloader.map.tilesets[0].firstGid,1);
		checkEquals("Tileset Start GID",tmxloader.map.tilesets[0].name,"spritesheet");	
		checkEquals("Tileset Start GID",tmxloader.map.tilesets[0].tileWidth,32);	
		checkEquals("Tileset Start GID",tmxloader.map.tilesets[0].tileHeight,32);	
		
		checkEquals("Tileset Src",tmxloader.map.tilesets[0].src,"spritesheet.png");	
		checkEquals("Tileset Image Width",tmxloader.map.tilesets[0].width,1024);	
		checkEquals("Tileset Image Height",tmxloader.map.tilesets[0].height,1024);	
		
	}catch(err){
		checkEquals("Tileset Error:","",err);
	}
	
	//Checking Layers	
	try{
	checkEquals("Number of Layers", tmxloader.map.layers.length,2);
	
	checkEquals("Layer 1 Name", tmxloader.map.layers[0].name, "Visual");
	checkEquals("Layer1 properties['display']", tmxloader.map.layers[0].properties['display'], "true");
	
	checkEquals("Layer1 data [0][30]", tmxloader.map.layers[0].data[30][0], 1);
	
	checkEquals("Layer 2 Name", tmxloader.map.layers[1].name, "Collision");
	checkEquals("Layer 2 properties['display']", tmxloader.map.layers[1].properties['display'], "false");
	checkEquals("Layer2 data [6,10]", tmxloader.map.layers[1].data[10][6], 65);
	
	}catch(err){
		checkEquals("Layer Error:","",err);
	}
	//Check Objects
	try{	
		checkEquals("Number of Object Groups", tmxloader.map.objectgroup.length,1);
	
		checkEquals("Check Enemy Object Group", tmxloader.map.objectgroup['Enemies'].name,"Enemies");
		checkEquals("Check Number of Enemy Objects", tmxloader.map.objectgroup['Enemies'].objects.length,"12");
	
	
		checkEquals("Check Enemy Object #1 - Name", tmxloader.map.objectgroup['Enemies'].objects[0].name,"Blob");
		checkEquals("Check Enemy Object #1 - Type", tmxloader.map.objectgroup['Enemies'].objects[0].type,"Enemy");
		checkEquals("Check Enemy Object #1 - x", tmxloader.map.objectgroup['Enemies'].objects[0].x,268);
		checkEquals("Check Enemy Object #1 - y", tmxloader.map.objectgroup['Enemies'].objects[0].y,898);
		checkEquals("Check Enemy Object #1 - width", tmxloader.map.objectgroup['Enemies'].objects[0].width,"46");
		checkEquals("Check Enemy Object #1 - height", tmxloader.map.objectgroup['Enemies'].objects[0].height,"59");
		checkEquals("Check Enemy Object #1 - properties['state']", tmxloader.map.objectgroup['Enemies'].objects[0].properties['state'],"wandering");
	
		checkEquals("Check Enemy Object #2 - Name", tmxloader.map.objectgroup['Enemies'].objects[1].name,"Pterodactyl");
		checkEquals("Check Enemy Object #2 - Type", tmxloader.map.objectgroup['Enemies'].objects[1].type,"Enemy");
		checkEquals("Check Enemy Object #2 - x", tmxloader.map.objectgroup['Enemies'].objects[1].x,784);
		checkEquals("Check Enemy Object #2 - y", tmxloader.map.objectgroup['Enemies'].objects[1].y,425);
		checkEquals("Check Enemy Object #2 - width", tmxloader.map.objectgroup['Enemies'].objects[1].width,"85");
		checkEquals("Check Enemy Object #2 - height", tmxloader.map.objectgroup['Enemies'].objects[1].height,"51");
		checkEquals("Check Enemy Object #2 - properties['state']", tmxloader.map.objectgroup['Enemies'].objects[1].properties['state'],"flying");
		
	}catch(err){
		checkEquals("Object Error:","",err);
	}
}
