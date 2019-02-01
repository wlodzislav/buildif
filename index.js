function buildif(text, config, _filePath) {
	var body = [];
	body.push("var result = []; var lineNo; try { with (config) {");
	text.split("\n").forEach(function (line, lineNo) {
		if (line.match(/^\s*\/\/\s*BUILD:/)) {
			body.push("lineNo = " + (lineNo + 1) + ";" + line.replace(/^\s*\/\/\s*BUILD:/, ""));
		} else {
			body.push("lineNo = " + (lineNo + 1) + "; result.push(\"" + line.replace(/"/g, "\\\"") + "\");");
		}
	});

	body.push("} } catch (err) { err.lineNo = lineNo; throw err; } return result.join(\"\\n\");");
	var textBody = body.join("\n");
	var compiled = new Function("config", textBody);

	return compiled(config);

};

module.exports = buildif;

