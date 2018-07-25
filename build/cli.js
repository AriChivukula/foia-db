#!/usr/bin/env node
"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
var yargs = require("yargs");
var gremlin = require("gremlin");
if (require.main === module) {
    yargs
        .usage("$0", "FOIA DB", function (y) { return y
        .option("compile", {
        boolean: true,
        describe: "Write out db"
    }); }, function (argv) {
        validateConfig(argv.compile);
    })
        .help()
        .argv;
}
function validateConfig(compile) {
    console.log("Loading Config");
    var config = JSON.parse(fs_1.readFileSync(".foia-db", "ascii"));
    var traversal = (new gremlin.structure.Graph()).traversal();
    Object.keys(config.folders).forEach(function (folder_name) {
        traversal = validateFolder(config, folder_name, traversal);
    });
    if (compile) {
        console.log("Writing DB");
        fs_1.writeFileSync(".foia-db.json", (new gremlin.structure.io.GraphSONWriter()).write(traversal.getGraph()));
    }
}
function validateFolder(config, folder_name, traversal) {
    console.log(folder_name);
    if (!fs_1.existsSync("db/" + folder_name + "/")) {
        throwError([folder_name], "Missing data");
    }
    fs_1.readdirSync("db/" + folder_name + "/").forEach(function (document_name) {
        traversal = validateDocument(config, folder_name, document_name, traversal);
    });
    return traversal;
}
function validateDocument(config, folder_name, document_name, traversal) {
    console.log(folder_name + "/" + document_name);
    traversal = traversal.addV(folder_name);
    var key_type = config.folders[folder_name].key.type;
    switch (key_type) {
        case "string":
            if (document_name.trim() !== document_name) {
                throwError([folder_name, document_name], "This is not a proper string " + document_name);
            }
            traversal = traversal.property("id", document_name);
            break;
        case "number":
            if (parseInt(document_name, 10).toString() !== document_name.replace(/^0+(?!$)/, "")) {
                throwError([folder_name, document_name], "This is not a proper number " + document_name);
            }
            traversal = traversal.property("id", parseInt(document_name, 10));
            break;
        default:
            throwError([folder_name, document_name], "Unsupported data type " + key_type);
    }
    Object.keys(config.folders[folder_name].document).forEach(function (value_name) {
        traversal = traversal.property(value_name, validateValue(config, folder_name, document_name, value_name));
    });
    return traversal;
}
function validateValue(config, folder_name, document_name, value_name) {
    console.log(folder_name + "/" + document_name + "/" + value_name);
    var documentConfig = config.folders[folder_name].document;
    var doc = JSON.parse(fs_1.readFileSync("db/" + folder_name + "/" + document_name, "ascii"));
    var final_value = doc[value_name];
    var value_type = documentConfig[value_name].type;
    switch (value_type) {
        case "string":
            if (typeof final_value !== "string") {
                throwError([folder_name, document_name, value_name], "This is not a proper string " + final_value);
            }
            break;
        case "string[]":
            if (!Array.isArray(final_value) || !final_value.every(function (value) { return typeof value === "string"; })) {
                throwError([folder_name, document_name, value_name], "This is not a proper string[] " + final_value);
            }
            break;
        case "number":
            if (typeof final_value !== "number") {
                throwError([folder_name, document_name, value_name], "This is not a proper number " + final_value);
            }
            break;
        case "number[]":
            if (!Array.isArray(final_value) || !final_value.every(function (value) { return typeof value === "number"; })) {
                throwError([folder_name, document_name, value_name], "This is not a proper number[] " + final_value);
            }
            break;
        case "boolean":
            if (typeof final_value !== "boolean") {
                throwError([folder_name, document_name, value_name], "This is not a proper boolean " + final_value);
            }
            break;
        case "boolean[]":
            if (!Array.isArray(final_value) || !final_value.every(function (value) { return typeof value === "boolean"; })) {
                throwError([folder_name, document_name, value_name], "This is not a proper boolean[] " + final_value);
            }
            break;
        default:
            throwError([folder_name, document_name, value_name], "Unsupported data type " + value_type);
    }
    return final_value;
}
function throwError(breadcrumbs, message) {
    throw new Error("<" + breadcrumbs.join(",") + "> " + message);
}
