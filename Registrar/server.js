var fs = require( 'fs' );
var http = require( 'http' );
var sql = require( 'sqlite3' ).verbose();

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

function addStudent( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var sid = kvs[ 'sid' ];
    var student_name = kvs[ 'student_name' ];
    var sandwich = kvs[ 'sandwich' ];
    db.run( "INSERT INTO Students(Sid, Name, SandwichPreference) VALUES ( ?, ?, ? )", sid, student_name, sandwich,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added student" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function addTeacher( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var tid = kvs[ 'tid' ];
    var teacher_name = kvs[ 'teacher_name' ];
    var department = kvs[ 'department' ];
    db.run( "INSERT INTO Teachers(Tid, Name, Department) VALUES ( ?, ?, ? )", tid, teacher_name, department,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added teacher" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function addClass( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var cid = kvs[ 'cid' ];
    var class_name = kvs[ 'class_name' ];
    db.run( "INSERT INTO Classes(Cid, Name) VALUES ( ?, ? )", cid, class_name,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added class" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function addEnrollement( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var sid = kvs[ 'sid' ];
    var cid = kvs[ 'cid' ];
    db.run( "INSERT INTO Enrollements(Sid, Cid) VALUES ( ?, ? )", sid, cid,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added enrollement" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function addTeachingAssignment( req, res )
{
    var kvs = getFormValuesFromURL( req.url );
    var db = new sql.Database( 'registrar.sqlite' );
    var tid = kvs[ 'tid' ];
    var cid = kvs[ 'cid' ];
    db.run( "INSERT INTO TeachingAssignments(Tid, Cid) VALUES ( ?, ? )", tid, cid,
            function( err ) {
                if( err === null )
                {
                    res.writeHead( 200 );
                    res.end( "Added teaching assignment" );
                }
                else
                {
                    console.log( err );
                    res.writeHead( 200 );
                    res.end( "FAILED" );
                }
            } );
}

function studentsTable()
{
    var table_elem = document.createElement('table');
    var table_body = document.createElement('tbody');
    for( var r = 0; r < db.all('SELECT COUNT(*) FROM Students'); r++ )
    {
	var row_elem = document.createElement( 'tr' );
	var sid_col = document.createElement( 'td' );
	var name_col = document.createElement( 'td' );
	var sandwich_col = document.createElement( 'td' );
	sid_col.value = db.all('SELECT Sid FROM Students');
	name_col.value = db.all('SELECT Name FROM Students');
	sandwich_col.value = db.all('SELECT SandwichPreference FROM Students');
	row_elem.appendChild(sid_col);
	row_elem.appendChild(name_col);
	row_elem.appendChild(sandwich_col);
	table_body.appendChild(row_elem);
    }
    table_elem.appendChild(table_body);
}

function teachersTable()
{
    var table_elem = document.createElement('table');
    var table_body = document.createElement('tbody');
    for( var r = 0; r < db.all('SELECT COUNT(*) FROM Teachers'); r++ )
    {
	var row_elem = document.createElement( 'tr' );
	var tid_col = document.createElement( 'td' );
	var name_col = document.createElement( 'td' );
	var department_col = document.createElement( 'td' );
	tid_col.value = db.all('SELECT Tid FROM Teachers');
	name_col.value = db.all('SELECT Name FROM Teachers');
	department_col.value = db.all('SELECT Department FROM Teachers');
	row_elem.appendChild(tid_col);
	row_elem.appendChild(name_col);
	row_elem.appendChild(department_col);
	table_body.appendChild(row_elem);
    }
    table_elem.appendChild(table_body);
}

function classesTable()
{
    var table_elem = document.createElement('table');
    var table_body = document.createElement('tbody');
    for( var r = 0; r < db.all('SELECT COUNT(*) FROM Classes'); r++ )
    {
	var row_elem = document.createElement( 'tr' );
	var cid_col = document.createElement( 'td' );
	var name_col = document.createElement( 'td' );
	cid_col.value = db.all('SELECT Cid FROM Classes');
	name_col.value = db.all('SELECT Name FROM Classes');
	row_elem.appendChild(cid_col);
	row_elem.appendChild(name_col);
	table_body.appendChild(row_elem);
    }
    table_elem.appendChild(table_body);
}

function enrollementsTable()
{
    var table_elem = document.createElement('table');
    var table_body = document.createElement('tbody');
    for( var r = 0; r < db.all('SELECT COUNT(*) FROM Enrollements'); r++ )
    {
	var row_elem = document.createElement( 'tr' );
	var sid_col = document.createElement( 'td' );
	var cid_col = document.createElement( 'td' );
	sid_col.value = db.all('SELECT Sid FROM Enrollements');
	cid_col.value = db.all('SELECT Cid FROM Enrollements');
	row_elem.appendChild(sid_col);
	row_elem.appendChild(cid_col);
	table_body.appendChild(row_elem);
    }
    table_elem.appendChild(table_body);
}

function teachingassignmentsTable()
{
    var table_elem = document.createElement('table');
    var table_body = document.createElement('tbody');
    for( var r = 0; r < db.all('SELECT COUNT(*) FROM TeachingAssignments'); r++ )
    {
	var row_elem = document.createElement( 'tr' );
	var tid_col = document.createElement( 'td' );
	var cid_col = document.createElement( 'td' );
	tid_col.value = db.all('SELECT Tid FROM TeachingAssignments');
	cid_col.value = db.all('SELECT Cid FROM TeachingAssignments');
	row_elem.appendChild(tid_col);
	row_elem.appendChild(cid_col);
	table_body.appendChild(row_elem);
    }
    table_elem.appendChild(table_body);
}

function server_fun( req, res )
{
    console.log( "The URL: '", req.url, "'" );
    // ...
    if( req.url === "/" || req.url === "/index.htm" )
    {
        req.url = "/index.html";
    }
    var filename = "./" + req.url;
    try {
        var contents = fs.readFileSync( filename ).toString();
        res.writeHead( 200 );
        res.end( contents );
    }
    catch( exp ) {
        if( req.url.indexOf( "add_student?" ) >= 0 )
        {
            addStudent( req, res );
        }
	else if ( req.url.indexOf( "add_teacher?" ) >= 0 )
	{
	    addTeacher( req, res );
	}
	else if ( req.url.indexOf( "add_class?" ) >= 0 )
	{
	    addClass( req, res );
	}
	else if ( req.url.indexOf( "add_enrollement?" ) >= 0 )
	{
	    addEnrollement( req, res );
	}
	else if ( req.url.indexOf( "add_teachingAssignment?" ) >= 0 )
	{
	    addTeachingAssignment( req, res );
	}
	else if( req.url.indexOf( "students_table" ) >= 0 )
	{
	    studentsTable();	    
	}
	else if( req.url.indexOf( "teachers_table" ) >= 0 )
	{
	    teachersTable();	    
	}
	else if( req.url.indexOf( "classes_table" ) >= 0 )
	{
	    classesTable();	    
	}
	else if( req.url.indexOf( "enrollements_table" ) >= 0 )
	{
	    enrollementsTable();	    
	}
	else if( req.url.indexOf( "teachingassignments_table" ) >= 0 )
	{
	    teachingassignmentsTable();	    
	}
        else
        {
            // console.log( exp );
            res.writeHead( 404 );
            res.end( "Cannot find file: "+filename );
        }
    }
}

var server = http.createServer( server_fun );

server.listen( 8080 );
