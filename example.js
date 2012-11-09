
var ctx;
var viewport;
var x =  0;
var y = 0;

/**
 * Utility function to clear the screen
 */
function clear(){
     ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}


/**
 * Storage Object for Viewport
 */
function Viewport(x,y,width,height){
	this.x = x;
	this.y = y;
	this.width = width;	
	this.height = height;	
	this.halfWidth = Math.floor(width/2);
	this.halfHeight = Math.floor(height/2);	
}


/**
 * Set Everything Up
 */
function run(){
        var canvas = document.getElementById("canvas");
  		ctx = canvas.getContext("2d");  
  		  		
  		tmxloader.load("test.tmx");
  		
  				
		viewport = new Viewport(0,0,ctx.canvas.width ,ctx.canvas.height);
  		
		spriteSheet = new Image();
		spriteSheet.src = tmxloader.map.tilesets[0].src;
       	
       	window.addEventListener('keydown',onKeyDown,true);		
        return setInterval(draw,10);
}


/**
 * Main drawing function
 */
function draw(){

 		clear(); 
		viewport.x =  x //- viewport.halfWidth;
		viewport.y =  y //- viewport.halfHeight;
							
		if(viewport.x < 0) viewport.x = 0;
		if(viewport.y < 0) viewport.y = 0;
		if(viewport.x > tmxloader.map.width*tmxloader.map.tileWidth - viewport.width) viewport.x = tmxloader.map.width*tmxloader.map.tileWidth - viewport.width;
		if(viewport.y > tmxloader.map.height*tmxloader.map.tileHeight - viewport.height) viewport.y = tmxloader.map.height*tmxloader.map.tileHeight - viewport.height;

	
        for(var xp = 0; xp < (viewport.width/tmxloader.map.tileWidth+1); ++xp){
            for(var yp = 0; yp < viewport.height/tmxloader.map.tileHeight ; ++yp){
        		var tileNumberX = Math.floor(viewport.x/tmxloader.map.tileWidth)+xp;
        		var tileNumberY = Math.floor(viewport.y/tmxloader.map.tileHeight)+yp;
 
        		if(tileNumberX >=0 && (tileNumberX < tmxloader.map.width) && tileNumberY >= 0 && (tileNumberY < tmxloader.map.height)){
        		     if(tmxloader.map.layers[0].data[tileNumberY][tileNumberX] != 0){ 
        		     
	        		    var gid = tmxloader.map.layers[0].data[tileNumberY][tileNumberX]; 
	        		    
	        		    //Calculate the spritesheet co-ordinates from the gid;
	        		    var spriteX = ((gid%tmxloader.map.tileWidth)-1)*tmxloader.map.tileWidth;
	        		   	var spiteY = Math.floor(gid/tmxloader.map.tileHeight)*tmxloader.map.tileHeight;  
	        		   	   		   	  		     	        		
        				ctx.drawImage(spriteSheet,spriteX,spiteY,tmxloader.map.tileWidth,tmxloader.map.tileHeight,(xp*tmxloader.map.tileWidth)-(viewport.x%tmxloader.map.tileWidth),(yp*tmxloader.map.tileHeight)-(viewport.y%tmxloader.map.tileHeight),tmxloader.map.tileWidth,tmxloader.map.tileHeight);
        			}
        		}
        		
        	}	
        }
        
        //Inefficiently draw all the objects even though they may not be in the viewport.....you probably shoudn't do this....
       	var objectGroup = tmxloader.map.objectgroup['Enemies'].objects;
        for(var obj = 0; obj < objectGroup.length; ++obj){
         	ctx.save();
         	
         	var text = objectGroup[obj].name;  	
      	 	ctx.textAlign = "right";
			ctx.textBaseline = "bottom";
			ctx.fillText(text,objectGroup[obj].x-viewport.x,objectGroup[obj].y-viewport.y-10);
         	
   		 	ctx.fillStyle = "white";
    		ctx.fillRect(objectGroup[obj].x-viewport.x,objectGroup[obj].y-viewport.y,objectGroup[obj].width,objectGroup[obj].height);
    		ctx.strokeStyle = "red";
   			ctx.strokeRect(objectGroup[obj].x-viewport.x,objectGroup[obj].y-viewport.y,objectGroup[obj].width,objectGroup[obj].height);        
    		ctx.restore();
        }
        
         	
       	var text = "viewport: " + viewport.x + ", " + viewport.y + " " + " X: " + x + " Y: " + y;
       	
       	ctx.textAlign = "right";
		ctx.textBaseline = "bottom";
		ctx.fillText(text,200,10);


}


/**
 * Input Events
 */
 
function onKeyDown(evt) {
	    //Escape
	  	if (evt.keyCode == 27){
			x = 0;
			y = 0;
	  	}
	  	  	 
	  	//Left
	  	if (evt.keyCode == 37){	  		
	  		x -=32;
	  	} else if (evt.keyCode == 38){ //UP
	  		y-=32;
	  	} else if (evt.keyCode == 39){ // Right
			x+=32
	  	} else if (evt.keyCode == 40){ //Down
	  		y+=32;
  		}
  		
  		if(x<0) x=0;
  		if(y<0) y=0;
  		if(x>tmxloader.map.width*tmxloader.map.tileWidth-viewport.width) x=tmxloader.map.width*tmxloader.map.tileWidth-viewport.width;
  		if(y>tmxloader.map.height*tmxloader.map.tileHeight-viewport.height) y=tmxloader.map.height*tmxloader.map.tileHeight-viewport.height;
  		
}
