const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error(
    "FATAL: JWT_SECRET is NOT set. Set it locally or in Render Environment Variables."
  );
  process.exit(1); // optional but recommended: fail fast so you don't run without a secret
}
// middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
    origin: "http://localhost:5173",
  })
);
const adminRouter = require("./routers/adminRouter");
const staffRouter = require("./routers/StaffRouter");
// environment variables

app.use("/api", adminRouter);
app.use("/api/staff", staffRouter);
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
