function recordTemplate(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (record) {
buf.push("<div class=\"record\"><div class=\"functionSignature\"><a" + (jade.attr("name", "" + (record.pluginType) + "-" + (record.groupName) + "-" + (record.name) + "", true, false)) + (jade.attr("href", "#" + (record.pluginType) + "-" + (record.groupName) + "-" + (record.name) + "", true, false)) + ">" + (((jade_interp = record.name) == null ? '' : jade_interp)) + " " + (((jade_interp = record.signature) == null ? '' : jade_interp)) + "</a></div><div class=\"comment markdown-body\">" + (((jade_interp = record.comment) == null ? '' : jade_interp)) + " </div></div>");}.call(this,"record" in locals_for_with?locals_for_with.record:typeof record!=="undefined"?record:undefined));;return buf.join("");
}function sampleTemplate(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (record) {
buf.push("<!-- foundation record proof of concept--><div class=\"record\"><div class=\"functionSignature\">" + (((jade_interp = record.name) == null ? '' : jade_interp)) + " " + (((jade_interp = record.signature) == null ? '' : jade_interp)) + " </div><div class=\"comment\">" + (((jade_interp = record.comment) == null ? '' : jade_interp)) + " </div></div>");}.call(this,"record" in locals_for_with?locals_for_with.record:typeof record!=="undefined"?record:undefined));;return buf.join("");
}