"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var app = (0, express_1.default)();
var port = 3000;
app.get('/', function (req, res) {
    var html = '<h2>usage info</h2>\
			   <p>route: api/image</p><br>\
			   <p>req query params</p><br>\
			   <ol><li>filename</li>\
			   <li>width</li>\
			   <li>height</li></ol><br>\
			   <p>example request : api/image/?filename=""&width=""&height=""</p>';
    res.send(html);
});
app.listen(port, function () {
    console.log("app is up and running at http://localhost:".concat(port));
});
