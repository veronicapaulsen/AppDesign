var http = require( 'http' );
var fs   = require( 'fs' );

if( process.argv.length < 3 )
{
    console.log( "Error: a file path is required" );
    process.exit( 1 );
}

var filename = process.argv[ 2 ];

function readFile( filename )
{
    try
    {
	var lines = fs.readFileSync( filename ).toString().split("\n");
	return lines;
    }
    catch(e)
    {
	console.log( "Error: Something bad happened trying to open " + filename);
	process.exit( 1 );
    }
}


function download( url, dest, callback )
{
    console.log( "Start downloading!!" );

    try {
	var f = fs.openSync( dest, 'w' );
	fs.closeSync( f );
    }
    catch( exp )
    {
	console.log( 'unable to open', dest, 'for writing' );
	process.exit(1);
    }
    var file = fs.createWriteStream( dest );
    try
    {
	var request = http.get( url, function( response ) {
            // console.log( "response??? ", response );
            console.log( "response??? " );
            file.on( 'finish', function() {
		console.log( "Finished writing!" );
            } );
	    response.pipe( file );
	} );
    }
    catch(e)
    {
	console.log( "Error: this is an invalid url: " + url );
	process.exit( 1 );
    }
    // Not temporally after the "get" is done!!!!!!!!

    request.on( 'error', function( err ) {
        console.log( "Error!!!", err );
    } );

    console.log( "Sent request" );
}

// download( "http://cs.coloradocollege.edu/index.html", "cs.html", null );
//download( "http://cs.coloradocolege.edu/index.html", "cs.html", null );

var lines = readFile( filename );

for(var i=0; i < lines.length; i++)
{
    var dest_and_url = lines[i].split(" ");
    console.log(dest_and_url[1]);
    download( dest_and_url[1], dest_and_url[0], null );
}

console.log( "Done?" );
