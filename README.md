# Salty Random Generator

Salty Random Generator

This is an addon for Node (cannot guaranteee this version functions in a browser).

This is the ealiest version that was tested... this is a minimal RNG.  Others have
some extended methods for shuffling data.

## Methods

```
 var RNG = require( "salty_random_generator")( callback }
```


constructor callback is used as a source of salt to the generator
the callback is passed an array to which strings are expected to be added
( [] )=>{ [].push( more_salt ); }.

If there is no callback specified, a default internal callback that uses the current time/date information is used.


``` js 
function callback( seed ) {
	seed.push( new Date.toLocalString() );
}


|method| arguments | result | description |
|----|-----|----|----|
| reset | () | nothing | resets the RNG to the start of a stream. |
| getBits | ([0-31]) | a integer of the specified number of bits from 1 to 31. |
| getBuffer | (bits) | returns a binary array buffer with the specified number of bits. |
| save | () | StateObject | returns an object containing the current state, which can be used with `restore()` |
| restore | (StateObject) | nothing | Restores the RNG state to the generator.  Can resume with new subsequent seeds or retry for example |
| feed | ( string or uint8Array ) | nothing | Forces more entropy in the RNG; even before the callback is called to get entropy. |
