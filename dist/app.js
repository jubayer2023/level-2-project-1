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
const app = (0, express_1.default)();
// parsers
app.use(express_1.default.json());
app.use(express_1.default.text());
//router
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
userRouter.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    res.json({
        success: true,
        message: "User successfully created",
        data: user,
    });
}));
courseRouter.post("/create-course", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const course = req.body;
    res.json({
        success: true,
        message: "Successfully created course !!",
        data: course,
    });
}));
// middleware
const logger = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("===>", req.hostname, req.url);
    next();
});
// home
app.get("/", logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.params.userId);
    try {
        res.send("something");
    }
    catch (error) {
        // console.log(error);
        next(error);
    }
}));
// post route
app.post("/", logger, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log((data === null || data === void 0 ? void 0 : data.person1.name) + " + " + (data === null || data === void 0 ? void 0 : data.person2.name));
    const d = (data === null || data === void 0 ? void 0 : data.person1.name) + " + " + (data === null || data === void 0 ? void 0 : data.person2.name);
    res.json({
        success: true,
        sendData: d,
    });
}));
app.use((error, req, res, next) => {
    console.log(error);
    if (error) {
        res.status(404).json({
            success: false,
            message: "Failled to get Data",
        });
    }
});
exports.default = app;
