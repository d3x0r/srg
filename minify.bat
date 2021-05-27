:call google-closure-compiler.cmd --language_out NO_TRANSPILE --formatting=pretty_print  --js=vfs-fs-w.js --js_output_file=vfs-fs-w-pretty.js
call google-closure-compiler.cmd --externs externs.js --compilation_level ADVANCED_OPTIMIZATIONS  --language_out NO_TRANSPILE  --js=salty_random_generator.js --js_output_file=salty_random_generator.min.js
