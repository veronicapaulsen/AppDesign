var fs = require( 'fs' );
var http = require( 'http' );

var db = new sql.Database( 'weather.sqlite' ); 

function getFormValuesFromURL( url )
{
    var kvs = {};
    var parts = url.split( "?" );
    var key_value_pairs = parts[1].split( "&" );
    for( var i = 0; i < key_value_pairs.length; i++ )
    {
        var key_value = key_value_pairs[i].split( "=" );
        kvs[ key_value[0] ] = key_value[1];
    }
    return kvs
}

function get_results( minTime, maxTime)
{
    db.all('SELECT * FROM data WHERE '+ minTime + ' < Time AND ' + maxTime + ' > Time');
}

function server_fun( req, res )
{
    console.log( req.url );

    if( req.url.indexOf( "query_form" ) >= 0 )
    {
        var kvs = getFormValuesFromURL( req.url );
	var minTime = kvs[ 'minTime' ];
	var maxTime = kvs[ 'maxTime' ];
	get_results( minTime, maxTime );
        res.writeHead( 200 );
        res.end( "You submitted the query form!!!!! " );
    }
    else if ( req.url.indexOf( "add_form" ) >= 0 )
    {
	var kvs = getFormValuesFromURL( req.url );
	var statement = db.prepare("INSERT INTO data VALUES (?)");
	for (var i = 0; i < 10; i++) {
	    statement.run(kvs[i]);
	}
	statement.finalize();
        res.writeHead( 200 );
        res.end( "You submitted the add form!!!!! " );

    }
}

var server = http.createServer( server_fun );

server.listen( 8080 );
