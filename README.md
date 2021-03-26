
# Salty Random Generator

   Takes some salt (some bits of either known or entropic valus) and generates a stream of bits from it.  
When the stream runs out of bits, the salt callback is invoked for more entropy and more bits are computed.
This can be used for procedural noise generation, because seed values can be specified and will re-generate the same stream of bits.
By feeding a source of randomness (the low milliseconds of a clock for instance) a bit of entropy is added... in this case 10 bits or so, which isn't very much.  Other sources of entropy may be used from other generators, or maybe another longer running generator with its own cycle?

salty_random_generator.js usage

```
  var SRG = require( 'salty_random_generator' );
  var RNG = SRG.SaltyRNG( saltingCallback );
  function saltingCallback( salt ) {
      //salt is an array.
      // push objects into the array to be used for next random generation
      // some things one might use - new Date().getTime()
      salt.push( new Date().getTim() );
  }


function doSomething () {
  var uint = RNG.getBits( [1-32 bits] );
  var arrayBuffer = RNG.getBuffer( [some number of bits...] );
   // use uint or arraybuffer values appropriately.... 
  
}
  
```

I think it might technically allows you to get 0 or less bits and return an empty value (0 or new ArrayBuffer(0) ).

RNG.compute() // function that takes salt and generates some bits
RNG.saltbuf = [] // the array that is used to communicate salt when more random bits are required.


