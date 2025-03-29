import express from "express";
import cors from "cors";


const app = express();

app.get("/api", (req, res) => {
});

app.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
});

