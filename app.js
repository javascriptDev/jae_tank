var http = require( 'http' );
var fs = require( 'fs' );

http.createServer( function( req, res ) {
	res.writeHead( 200, {'Content-Type': 'text/html;charset=utf-8'} );
	var url = req.url;
	if(url == '/') {
		fs.readFile( 'index.html', 'utf8', function( err, data ) {
			res.write( data );
			res.end();
		} );

	}else{
		fs.readFile(url, 'utf8', function( err, data ) {
			res.write( data );
			res.end();
		} );
	}


} ).listen( process.env.PORT || 1337, null );
