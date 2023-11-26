"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const models_1 = __importDefault(require("./db/models"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.get('/*', (req, res) => {
    res.send("No such route found!");
});
app.post('/ingest', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const logData = req.body;
    try {
        const log = new models_1.default(logData);
        yield log.save();
        res.status(200).send('Log ingested successfully');
    }
    catch (error) {
        console.error('Error processing logs:', error);
        res.status(500).send('Internal Server Error');
    }
}));
app.post('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filterType = req.body.filterType;
        const filterValue = req.body.filterValue;
        console.log(req.body);
        if (filterType === "metadata") {
            const logData = yield models_1.default.find({ "metadata.parentResourceId": filterValue });
            console.log(logData);
            res.json(logData);
        }
        else {
            const logData = yield models_1.default.find({ [filterType]: filterValue });
            console.log(logData);
            res.json(logData);
        }
    }
    catch (error) {
        console.error('Error searching for  logs:', error);
        res.status(500).send('Internal Server Error');
    }
}));
app.post('/*', (req, res) => {
    res.status(404).send("No such route found!");
});
mongoose_1.default.connect('mongodb+srv://kandadisathvik:pTtDErnGofNnwK42@cluster1.lwadyfq.mongodb.net/', { dbName: "logs" });
app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
//   app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);
//   });
// });
