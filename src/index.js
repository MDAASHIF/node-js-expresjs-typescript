"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect(process.env.DB_URI || 'mongodb://127.0.0.1:27017/typescript', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useCreateIndex: true
    autoIndex: true
})
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err.message));
const posts_1 = __importDefault(require("./routes/posts"));
const users_1 = __importDefault(require("./routes/users"));
/** Logging */
app.use((0, morgan_1.default)('dev'));
/** Takes care of JSON data */
app.use(express_1.default.json());
/** Parse the request */
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cors_1.default)());
// Routes
app.use('/api/v1/posts/', posts_1.default);
app.use('/api/v1/user/', users_1.default);
app.get('/', (req, res) => {
    res.status(200).send('Hello from express and typescript');
});
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`App listening on PORT ${port}`));
