var jsc = require( 'jsverify' );

console.log( "Running the Boolean test:" );
// forall (f: json -> bool, b: bool), f (f (f b)) ≡ f(b).
var boolFnAppliedThrice =
    jsc.forall( "bool -> bool", "bool",
        function( f, b )
        {
            return f( f( f( b ) ) ) === f( b );
        }
    );
jsc.assert( boolFnAppliedThrice );
console.log( "... OK, passed 100 tests" );

function arraysEqual( a1, a2 )
{
    try {
        if( a1.length !== a2.length )
            return false;
        for( var i = 0; i < a1.length; i++ )
        {
            if( a1[i] !== a2[i] )
                return false;
        }
        return true;
    }
    catch( exp ) {
        return false;
    }
}

console.log( "Running the sort idempotent test:" );
// forall (f: string -> nat, arr: array string),
// sortBy(sortBy(arr, f), f) ≡ sortBy(arr, f).
var sortIdempotent =
    jsc.forall( "array string",
        function( arr )
        {
            var arr_copy = arr.slice();
            arr.sort();
            arr_copy.sort().sort()
            return arraysEqual( arr, arr_copy );
    } );
jsc.assert( sortIdempotent );
console.log( "... OK, passed 100 tests" );


function arraysLengthEqual( a1, a2 )
{
    if( a1.length == a2.length )
    {
	return true;
    }
    else{
	return false;
    }
}

console.log( "Running the lengths equal test:" );
console.log( "Write a test that returns true if sorting doesn't change an array's length" );
var sortLength =
    jsc.forall( "array string",
        function( arr )
        {	    
	    var arr_copy = arr.slice();
	    arr_copy.sort();
            return arraysLengthEqual( arr, arr_copy );
        } );
jsc.assert( sortLength );
console.log( "... OK, passed 100 tests" );


function arrayInOrder(arr, idx1, idx2)
{
    arr.sort();
    if( idx1 < idx2 )
    {
	if( arr[idx1] <= arr[idx2] )
	{
	    return true;
	}
    }else if ( idx1 > idx2 )
    {
	if( arr[idx1] >= arr[idx2] )
	{
	    return true;
	}
    }else if ( idx1 == idx2 )
    {
	if( arr[idx1] == arr[idx2] )
	{
	    return true;
	} 
    }
    return false;
}

console.log( "Running the in-order test:" );
console.log( "Write a test that returns true the elements of the sorted array are in order" );
var sortInOrder =
    jsc.forall( "array string", idx1, idx2
        function( arr )
        {
            return arrayInOrder(arr, idx1, idx2);
        } );
jsc.assert( sortInOrder );
console.log( "... OK, passed 100 tests" );


function addRemoveTest( arr1, arr2 , str)
{
    if( arr1.indexOf(str) >=0 )
    {
	if( arr2.indexOf(str) >= 0 )
	{
	    return true;
	}
    }else if ( arr1.indexOf(str) == -1 )
    {
	if( arr2.indexOf(str) == -1 )
	{
	    return true;
	}
    }
    return false;
}

console.log( "Running the add/remove test:" );
console.log( "Write a test that returns true if every element that appears somewhere in the sorted array appears somewhere in the unsorted array and vice-versa" );
var sortAddRemove =
    jsc.forall( "array string",
        function( arr )
        {
	    var arr_copy = arr.slice();
	    arr_copy.sort();
            return addRemoveTest(arr, arr_copy, "array string" );
        } );
jsc.assert( sortAddRemove );
console.log( "... OK, passed 100 tests" );


function numberOfCopies(arr1, arr2, str)
{
    //indexOf returns the first occurence so we just have to check the next ones to count the number of copies
    var counter = 0;
    if( arr1.indexOf(str) >= 0 )
    {
	var idx = arr1.indexOf( str );
	idx++;
	var boolean moreCopies = true;
	while(moreCopies)
	{
	    if( arr1[idx] == str )
	    {
		counter++;
		idx++;
	    }else{
		moreCopies = false;
	    }
	}
	if( arr2.indexOf(str) >= 0 )
	{
	    idx = arr2.indexOf( str );
	    var counter2 = 0;
	    for(int i=idx; i < counter; i++)
	    {
		if( arr2[i] == str )
		{
		    counter2++;
		}else{
		    break;
		}
	    }
	    if( counter2 == counter )
	    {
		return true;
	    }else{
		return false;
	    }
	}
    }
}

console.log( "Running the sort number of copies test:" );
console.log( "Write a test that returns true if the number of copies of a particular value in the unsorted array is the same as the number of copies of that value in the sorted array." );
var sortNumCopies =
    jsc.forall( "array string",
        function( arr )
        {
	    var arr_copy = arr.slice();
	    arr_copy.sort();
            return numberOfCopies( arr, arr_copy, "array string" );
        } );
jsc.assert( sortNumCopies );
console.log( "... OK, passed 100 tests" );
