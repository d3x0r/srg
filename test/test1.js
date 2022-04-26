
import {SaltyRNG} from "../salty_random_generator.mjs"
import {SFC32,MUL32,XOR32,JSF32} from "../prng_short.mjs"

const sfc = SFC32( "seed" );
const mul = MUL32( "seed" );
const xor = XOR32( "seed" );
const jsf = JSF32( "seed" );
//const sfc = MUL32( "seed" );

const size = 256;
const bits = 8;

var frames = 0;
var firstTick = Date.now();
var frameCounter;

frameCounter = document.getElementById( "frameRate" );
if( !frameCounter ) {
	frameCounter = document.createElement( "div" );
	document.body.appendChild( frameCounter );
}
frameCounter.textContent = "?? FPS";

const enables = { enable:true, enable2:true, enable3:true, enable4:true }

var canvas = document.getElementById( "graphout" );
var ctx= canvas.getContext( "2d" );
canvas.width = size;
canvas.height = size;
var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
var myEnable = document.getElementById( "enablegraphout" );
myEnable.addEventListener( "click", ()=>{
	enables.enable = !enables.enable;
	firstTick = Date.now();
	frames = 0;
} );

function initCanvas( n ) {
let created = false;
const canvas = document.getElementById( "graphout"+n )||((created=true),(document.createElement("canvas")));
if( created ) {
	const enable_cell = document.createElement( "td" );
	//cell.appendChild( canvas );
//	const 

	const cell = document.createElement( "td" );
	cell.appendChild( canvas );
	document.body.appendChild( cell );
	document.body.appendChild( canvas );
}
var ctx= canvas.getContext( "2d" );
canvas.width = size;
canvas.height = size;
var myImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
if( !created ) {
	var myEnable2 = document.getElementById( "enablegraphout"+n );
	myEnable2.addEventListener( "click", ()=>{
		enables["enable"+n] = !enables["enable"+n];
		firstTick = Date.now();
		frames = 0;
	} );
}

	
const values = [];
const values_acc = [];
for( let n = 0; n < size; n++ )  {
	var newCol;
	var newCol_acc;
	values.push( newCol=[] );
	values_acc.push( newCol_acc=[] );
	for( var m = 0; m < size; m++ )  {
		newCol.push( 0 );
		newCol_acc.push( 0 );
    }        
}

	return { canvas, ctx, myImageData, values, values_acc }

}

const test2 = initCanvas( 2 );
const test3 = initCanvas( 3 );
const test4 = initCanvas( 4 );


var values = [];
var values_acc = [];
for( var n = 0; n < size; n++ )  {
	var newCol;
	var newCol_acc;
	values.push( newCol=[] );
	values_acc.push( newCol_acc=[] );
	for( var m = 0; m < size; m++ )  {
		newCol.push( 0 );
		newCol_acc.push( 0 );
    }        
}


var RNG = SaltyRNG( 
			//null 
			(salt)=>{salt.push( Date.now().toString() )}
		, { mode:0 } );

var RNG2 = SaltyRNG( 
			//null 
			(salt)=>{salt.push( Date.now().toString() )}
		, { mode:1 } );


var tick, newtick;

tick = Date.now();


var rp1 = runPass.bind( {}, myImageData,ctx,values,values_acc, false, RNG, "enable")
var rp2 = runPass.bind( {}, test2.myImageData,test2.ctx,test2.values,test2.values_acc,false, RNG2, "enable2")
var rp3 = runPass.bind( {}, test3.myImageData,test3.ctx,test3.values,test3.values_acc, true, null, "enable3")
var rp4 = runPass.bind( {}, test4.myImageData,test4.ctx,test4.values,test4.values_acc, true, null, "enable4", true)
//var rp5 = runPass.bind( {}, test5.myImageData,ctx4,values4,values4_acc, true, null, "enable5", true)

	var max = 0;
	
function runPass( myImageData,ctx,  values, values_acc, math, RNG, enable, shortRNG ) {
	if( enables[enable] ) {
	var min = 10000;
	tick = Date.now();
	//while( ( newtick = Date.now() ) - tick < 300 ) {
	if( shortRNG ) {
		for( var n = 0; n < size*size; n++ ) {
			var x = (xor() * size)|0;
			var y = (xor() * size)|0;
			values[x][y] += 1.0;
		}
	} else if( math ) {
		for( var n = 0; n < size*size; n++ ) {
			var x = (Math.random() * size)|0;
			var y = (Math.random() * size)|0;
			values[x][y] += 1.0;
		}
	} else {
		for( var n = 0; n < size*size; n++ ) {
			var x = RNG.getBits( bits );
			var y = RNG.getBits( bits );
			values[x][y] += 1.0;
		}
	}
	var data = myImageData.data;
	tick = newtick;

	max = 0;
	min = 8000;
	for( var m = 0; m < size; m++ ) {
		var valrow = values[m];
		for( var n = 0; n < size; n++ ) {
			var v = valrow[n];
			if( v > max ) max = v;
			if( v < min ) min = v;
		}
	}

	var min_acc = 1000;
	var max_acc = 0;
	for( var m = 0; m < size; m++ ) {
		var valrow = values[m];
		var valaccrow = values_acc[m];
		for( var n = 0; n < size; n++ ) {
			var c = valrow[n] - min;
			valrow[n] = valrow[n] * 0.90;
			c = c / ( max-min);
			//if( c > 0.75 ) console.log( "at",valrow[n], c, n, m );
			//c = 2*( c - 0.5 );
			if( c < 0 ) {
				valaccrow[n] *= 0.1;
				if(0) {
					c = c * c;
		        		data[(n*size+m)*4 + 0] = 5 *( c );
        				data[(n*size+m)*4 + 1] = 0;
        				data[(n*size+m)*4 + 2] = 0;
        				data[(n*size+m)*4 + 3] = 255;
				}
			}else {
				//c = c * c;
				valaccrow[n] = valaccrow[n] * 0.90 +
						c;
				if(0) {
		        		data[(n*size+m)*4 + 0] = 0;
        				data[(n*size+m)*4 + 1] = 255*( c);
	        			data[(n*size+m)*4 + 2] = 0;
	        			data[(n*size+m)*4 + 3] = 255;
				}
			}
			/*
			if( c < 0.33 ) {
        		data[(n*size+m)*4 + 0] = 255 *( c*3 );
        		data[(n*size+m)*4 + 1] = 0;
        		data[(n*size+m)*4 + 2] = 0;
        		data[(n*size+m)*4 + 3] = 255;
			} else if( c > 0.66 ) {
        		data[(n*size+m)*4 + 0] = 0;
        		data[(n*size+m)*4 + 1] = 255*( (c-0.33)*3 );
        		data[(n*size+m)*4 + 2] = 0;
        		data[(n*size+m)*4 + 3] = 255;
			} else {
        		data[(n*size+m)*4 + 0] = 0;
        		data[(n*size+m)*4 + 1] = 0;
        		data[(n*size+m)*4 + 2] = 255*( (c-0.66)*3 );
        		data[(n*size+m)*4 + 3] = 255;
            }
			*/
        }
	}

	for( var m = 0; m < size; m++ ) {
		var row = values_acc[m];
		for( var n = 0; n < size; n++ ) {
			var v = row[n];
			if( v > max_acc ) max_acc = v;
			if( v < min_acc ) min_acc = v;
		}
	}

	for( var m = 0; m < size; m++ ) {
		var row = values_acc[m];
		for( var n = 0; n < size; n++ ) {
			var c = row[n] - min_acc;
			c = c / ( max_acc-min_acc);
			//if( c > 0.75 ) console.log( "at",valrow[n], c, n, m );
			//c = 2*( c - 0.5 );
			/*
			if( c < 0 ) {
				c = c * c;
        		data[(n*size+m)*4 + 0] = 5 *( c );
        		data[(n*size+m)*4 + 1] = 0;
        		data[(n*size+m)*4 + 2] = 0;
        		data[(n*size+m)*4 + 3] = 255;
			}else {
				//c = c * c;
				values_acc[m][n] += c;
        		data[(n*size+m)*4 + 0] = 0;
        		data[(n*size+m)*4 + 1] = 255*( c);
        		data[(n*size+m)*4 + 2] = 0;
        		data[(n*size+m)*4 + 3] = 255;
			}
			*/
			
			{
        		data[(n*size+m)*4 + 0] = 255 *( c );
        		data[(n*size+m)*4 + 1] = 255*( c );
        		data[(n*size+m)*4 + 2] = 255*( c );
        		data[(n*size+m)*4 + 3] = 255;
            }
			
        }
	}

	ctx.putImageData(myImageData, 0, 0);
	//requestAnimationFrame( runPass );
	}
	
}

function animtick() {
 rp1();
 rp2()
 rp3()
 rp4()
	frames++;
	if( ( frames % 100 ) === 0 )
		frameCounter.textContent = ( frames/ ( (Date.now()-firstTick)/1000)) + " FPS";
	setTimeout( animtick, 5 );

}
animtick();
//	runPass();
//runPass();
