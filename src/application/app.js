import express from "express";
import cors from "cors";
import dotenv from "dotenv"; // Tambahkan ini
import { errorMiddleware } from "../error/error-middleware.js";
import { authRoute } from "../routes/auth-route.js";
import { categoryRoute } from "../routes/category-route.js";
import { imageRoute } from "../routes/image-route.js";
import { packageRoute } from "../routes/package-route.js";
import { timeRoute } from "../routes/time-route.js";
import { addonRoute } from "../routes/addon-route.js";
import { reservationRoute } from "../routes/reservation-route.js";
import { transactionRoute } from "../routes/transcation-route.js";
import { reviewRoute } from "../routes/review-route.js";

dotenv.config(); // Tambahkan ini untuk memuat .env

export const app = express();

// konfigurasi cors
app.use(cors({
    origin: 'https://www.infokus.my.id/',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
}));
app.use(express.json());

app.use(authRoute);
app.use(categoryRoute);
app.use(imageRoute);
app.use(packageRoute);
app.use(timeRoute);
app.use(addonRoute);
app.use(reservationRoute);
app.use(transactionRoute);
app.use(reviewRoute);

app.use(errorMiddleware);


let message = "";
if (process.env.NODE_ENV === "development") {
    message = "Hello from development!";
} else if (process.env.NODE_ENV === "production") {
    message = "Hello from production!";
}

app.get("/v1", (req, res) => {
    res.status(200).send({
        status: "success",
        code: 200,
        message: message,
    });
});