/* Run:
	buildif --config ./examples/config.json --input ./examples/example.js
	buildif --config ./examples/config.js --input ./examples/example.js
	buildif --config ./examples/config.json --features.billing=true --input ./examples/example.js
*/

// BUILD: if (features.billing) {
	console.log("Billing Enabled");

	// BUILD: if(version.startsWith("1")) {
		console.log("Version 1.x");
	// BUILD: } else if (version.startsWith("2")) {
		console.log("Version 2.x");
	// BUILD: }

// BUILD: }

// BUILD: if(!features.billing) {
	console.log("Billing Disabled");
	// BUILD: if(version.startsWith("1")) {
		console.log("Version 1.x");
	// BUILD: } else {
		console.log("Version 2.x");
	// BUILD: }
// BUILD: }

