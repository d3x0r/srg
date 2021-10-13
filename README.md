
# Salty Random Generator

Yes, this document needs work.

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



## RNG Methods

|method|return|args|description|
|---|---|---|---|
|Shuffler| ? | ? | A simple array shuffler |
| id | 44 character ID | (optional input) | returns a random hash ID.  If an input is passed, returns the hash of the input |
| Id | 12 character ID | () | returns a short random hash ID |
| u16_id | random characters | () | Get wide characters encoded into a buffer | 
| sign | signature of block | ( data block to sign ) | compute a unique signature and nonce for a block of data |
| verify | bool | (message, signature) | verifies the signature is for the block of data |
| xor | | | |
| dexor | | | |
|  u8xor | | | |
| u16xor | | | |
| xkey | | | |
| ukey | | | |




```
Salty: [Function: SaltyRNG] {
  Shuffler: [Function: Shuffler],
  id: [Function (anonymous)],
  Id: [Function (anonymous)],
  u16_id: [Function (anonymous)],
  sign: [Function (anonymous)],
  verify: [Function (anonymous)],
  xor: [Function: xor],
  dexor: [Function: dexor],
  u16xor: [Function: txor],
  xkey: [Function: makeXKey],
  ukey: [Function: makeU16Key]
}
ALL: [Module: null prototype] {
  GetCurrentTick: [Function: GetCurrentTick],
  SRG_XSWS_decryptData: [Function: SRG_XSWS_decryptData],
  SRG_XSWS_decryptString: [Function: SRG_XSWS_decryptString],
  SRG_XSWS_encryptData: [Function: SRG_XSWS_encryptData],
  SRG_XSWS_encryptString: [Function: SRG_XSWS_encryptString],
  SaltyRNG: [Function: SaltyRNG] {
  TickToTime: [Function: TickToTime],
}
```


# Changelog

- 1.0.1 
   - Release with a module version, 'export {X}' instead of 'exports.X='
- 1.0.0 
   - Initial version