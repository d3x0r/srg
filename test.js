
import * as SRG from "./salty_random_generator.js"
import {SaltyRNG} from "./salty_random_generator.js"

console.log( "Salty:", SaltyRNG );
console.log( "ALL:", SRG );

console.log( "Pass:", SaltyRNG.id("pass") );
console.log( "Password:", SaltyRNG.id("password") );
