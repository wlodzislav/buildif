# BuildIf - Simple build preprocessor with real JS for logic

Builds different version of source depending on values in JSON/JS config.
Could be used as a standalone CLI utility or as a library.

Useful for making separate builds for on-demand customers with different features or customizations. Allows to keep single codebase without per-customer branches with the tradeoff of build comments and additional build step.

Source files could be any type, but it's primarily build for JS files.

## Syntax

In code:

```javascript
	// BUILD: if (features.billing) {
		console.log("Billing Enabled");
	// BUILD: }

	// BUILD: if(version.startsWith("1")) {
		console.log("Version 1.x");
	// BUILD: } else if (version.startsWith("2")) {
		console.log("Version 2.x");
	// BUILD: }
```

Config file:

```json
	{
		"features": {
			"billing": false
		},
		"version": "2.1.1"
	}
```

Any line prefixed with `// BUILD:` will be executed at the build-time.
Any valid JS statements could be used after prefix: if/else, variable declarations, function calls, require. Ifs could be nested.

## Use as CLI

Use JSON config and output to stdout:

```bash
	buildif --config ./examples/config.json --input ./examples/example.js > output.js
```

Use JS config and output to file:

```bash
	buildif --config ./examples/config.js --input ./examples/example.js --output output.js
```

Use pipes for both input and output:

```bash
	cat ./examples/example.js | bin/buildif --config ./examples/config.json > output.js
```

Overwrite values from config with command line options:

```bash
	buildif --config ./examples/config.json --features.billing=true --input ./examples/example.js
```

Use only command line options without config file:

```bash
	buildif --features.billing=true --version="2.1.0" --input ./examples/example.js
```

Command line overwrites could have multi-level names separated by dot, like "features.billing". For array indices also use dot, like "customers.1.name".

It outputs sane error at the build time. It prints the line of code that triggered error, file name and line number. Execution error in BUILD comments:

	// BUILD: nonExistingVar; // This will trigger error
	ReferenceError: nonExistingVar is not defined
		at <instrumented code> (./examples/example-error.js:7)

### CLI options
	
`--input` - Input file path, if not specified read from stdin.

`--output` - Output file path, if not specified print to stdout.

`--config` - Config file path, if not specified config = {}.

All other options are treated as config overwrites.
When using CLI buildif will try to coerse types for options:

```bash
	buildif --version=2.1 ...
```

will result in config object `{ version: 2.1 }`, but

```bash
	buildif --version=2.1.0 ...
```

will result in config object `{ version: "2.1.0" }`.

## Use as library

`buildif(inputText, configObject)`

Example:

```javascript
	var buildif = require("buildif");
	var text = require("fs").readFileSync("./examples/example.js");
	var config = {
		features: {
			billing: false
		},
		version: "2.1.1"
	};

	console.log(buildif(text, config));
```

