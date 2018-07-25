"use strict";
exports.__esModule = true;
require("@babel/polyfill");
var fs_1 = require("fs");
var gremlin = require("gremlin");
exports.DB = (new gremlin.structure.io.GraphSONReader()).read(JSON.parse(fs_1.readFileSync(".foia-db.json", "ascii")));
