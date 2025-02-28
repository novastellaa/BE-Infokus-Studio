import { app } from "./application/app.js";


const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    res.send("Backend is running!");
});

app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});