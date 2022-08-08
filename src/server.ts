import express from "express";
import imagesRouter from "./routers/images";

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/images", imagesRouter);

app.all("**", (req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log(`Server is up and running at port ${PORT}`);
});

export default app;
