/* Run:
	buildif --config ./examples/config.json --input ./examples/example-error.js
	buildif --config ./examples/config.js --input ./examples/example-error.js
	buildif --config ./examples/config.json --features.billing=true --input ./examples/example-error.js
*/

// BUILD: nonExistingVar; // This will trigger error

