import express from "express";
import routerProp from "./routes/products.routes.js";

const PORT = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//ROUTES:
app.use('/api/products', routerProp);

app.listen(PORT, () => {
	console.log("Server run on port: ", PORT);
});


