
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

(some added in 1.2.1)

|method|return|args|description|
|---|---|---|---|
|Shuffler| ? | ? | A simple array shuffler |
| id | 44 character ID | (optional input) | returns a random hash ID.  If an input is passed, returns the hash of the input. |
| Id | 12 character ID | (optional input) | returns a short random hash ID.  If an input is passed, returned the hash of the input. |
| u16_id | random characters | () | Get wide characters encoded into a buffer | 
| sign | signature of block | ( data block to sign ) | compute a unique signature and nonce for a block of data |
| verify | bool | (message, signature) | verifies the signature is for the block of data |
| xor | | (a,b) | does an XOR of two base64 strings, results with a base64 string. |
| dexor | | (a,b,d,e) | does an xor of parts of base64 strings; `d` parameter is (the destination) where to start, `e` is where to end. |
| u8xor | | (a,b) | considers `a` as a utf8 string, and xor's a base64 string `b` over it. |
| u16xor | |(a,b) | takes two utf16 strings and xors their codepoints |
| xkey | | (key, step) |  create a key-buffer using a base64 key, and a step or offset to start at.  As the key is used this step is stepped internally. |


## Other exported utility functions

|method|return|args|description|
|---|---|---|---|
| GetCurrentTick | number | ()|returns the current tick *256; with the low 256 value being the timezone |
| SRG_XSWS_decryptData | UInt8Array | objBuf, tick, keyBuf |  Takes the Uint8Array utf8 data `objBuf`, a number `tick` which is additional entropy to add to shuffle, and a string or typed array `keybuf` which is the general salt to apply, and decrypts it; returns the decrypted value. |
| SRG_XSWS_encryptData | UInt8Array | objBuf, tick, keyBuf |  Takes the Uint8Array utf8 data `objBuf`, a number `tick` which is additional entropy to add to shuffle, and a string or typed array `keybuf` which is the general salt to apply, and encrypts it; returns the encrypted value. |
| SRG_XSWS_decryptString | UInt8Array | objBuf, tick, keyBuf |  Takes the string `objBuf`, a number `tick` which is additional entropy to add to shuffle, and a string or typed array `keybuf` which is the general salt to apply, and decrypts it; returns the decrypted value. |
| SRG_XSWS_encryptString | UInt8Array | objBuf, tick, keyBuf |  Takes the string `objBuf`, a number `tick` which is additional entropy to add to shuffle, and a string or typed array `keybuf` which is the general salt to apply, and encrypts it; returns the encrypted value. |
| SaltyRNG | | | See Above|
| TickToTime| number | Date() | returns tick retured from GetCurrentTick() as a Date |

## test.js output

```
import  {SaltyRNG} from "@d3x0r/srg";
//import  {SaltyRNG} from "/node_modules/@d3x0r/srg/salty_random_generator.js";

SaltyRNG: [Function: SaltyRNG] {
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
  ukey: [Function: makeU16Key], /* exists, causes exception, unimplemented TODO? */
  u8xor: [Function: u8xor]
}

import ALL from "@d3x0r/srg"

ALL: [Module: null prototype] {
  GetCurrentTick: [Function: GetCurrentTick],
  SRG_XSWS_decryptData: [Function: SRG_XSWS_decryptData],
  SRG_XSWS_decryptString: [Function: SRG_XSWS_decryptString],
  SRG_XSWS_encryptData: [Function: SRG_XSWS_encryptData],
  SRG_XSWS_encryptString: [Function: SRG_XSWS_encryptString],
  SaltyRNG: (see object above)
  TickToTime: [Function: TickToTime]
}


```


# Changelog
- 1.2.3
   - fix off-by-one error in string length used for K12.
- 1.2.2
   - Fixed regression building K12.
- 1.2.1
   - Merge utility work
- 1.2.0
   - Release as module version.  (1.2.x family)
- 1.0.1 (unrelesed?)
   - Release with a module version, 'export {X}' instead of 'exports.X='
- 1.0.0 
   - Initial version