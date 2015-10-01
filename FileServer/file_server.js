var http = require( 'http' );
var fs = require( 'fs' );

function server_fun( req, res )
{
    // console.log( req );
    console.log( req.url );
    res.writeHead( 200 );
    var contents = readFile( req.url );
    res.end( contents );
}

var server = http.createServer( server_fun );

server.listen( 8080 );

function readFile( url )
{
    var filename = url.substring(1);
    console.log(filename);

    try{
	var f = fs.readFileSync( filename );	
    }catch( exp ){
	throw exp;
    }
    var contents = f.toString();
    return contents;
}