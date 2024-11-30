import jwt from "jsonwebtoken";

export async function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).send({
            status: "error",
            code: 401,
            message: "Token tidak ditemukan",
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log("Token diterima:", token); // Log token untuk memastikan token diterima
        console.log("JWT_SECRET:", process.env.JWT_SECRET); // Log JWT_SECRET untuk memverifikasi apakah nilainya ada

        if (err) {
            console.error("JWT Verification Error:", err.message); // Log error yang terjadi
            return res.status(403).send({
                status: "error",
                code: 403,
                message: "Token tidak valid",
            });
        }
        console.log("JWT Decoded User:", user); // Log user setelah token berhasil didekode
        req.user = user;
        next();
    });

}

export async function adminMiddleware(req, res, next) {
    if (req.user.role !== "admin") {
        return res.status(403).send({
            status: "error",
            code: 403,
            message: "Anda tidak memiliki akses",
        });
    }
    next();
}