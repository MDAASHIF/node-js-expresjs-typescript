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
const joi_1 = __importDefault(require("joi"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = __importDefault(require("../models/user"));
const addUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let validationSchema = joi_1.default.object({
            name: joi_1.default.string().required(),
            email: joi_1.default.string().required(),
            password: joi_1.default.string().required()
        });
        const validData = yield validationSchema.validateAsync(req.body);
        validData.password = yield bcrypt_1.default.hash(validData.password, 10);
        let checkEmail = yield user_1.default.findOne({ email: validData.email });
        if (checkEmail) {
            return res.status(400).send({
                status: false,
                message: "Email Already Exists."
            });
        }
        let data = yield user_1.default.create(validData);
        return res.status(200).send({
            status: true,
            message: "Successfully Added.",
            data: data
        });
    }
    catch (error) {
        return res.status(400).send({
            status: false,
            meesage: error.details[0].message
        });
    }
});
exports.default = { addUser };
