"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var processor_1 = __importDefault(require("./processor"));
var app = (0, express_1.default)();
var port = 3000;
app.get('/', function (req, res) {
    var html = '<h2>usage info</h2>\
			   <p>route: api/image</p><br>\
			   <p>req query params</p><br>\
			   <ol><li>filename</li>\
			   <li>width default 400px</li>\
			   <li>height default 400px</li></ol><br>\
			   <p>example request : /api/image/?filename=""&width=""&height=""</p>';
    res.send(html);
});
app.get('/api/image/', function (req, res) {
    var imageName = req.query.filename;
    var width = 400;
    var height = 400;
    if (Number(req.query.width) && Number(req.query.height)) {
        width = Number(req.query.width);
        height = Number(req.query.height);
    }
    var propertiesObj = processor_1.default.prepareImageProperties(imageName, width, height, res);
    console.log(propertiesObj);
});
app.listen(port, function () {
    console.log("app is up and running at http://localhost:".concat(port));
});
