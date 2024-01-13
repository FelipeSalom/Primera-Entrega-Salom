const fs = require("fs");
const express = require("express");
const ProductManager = require("./ProductManager.js");
const PORT = 8080;
const app = express();

const product = new ProductManager();

app.listen(PORT, () => {
  console.log("Server run on port: ", PORT);
});

app.get("/", (req, res) => {
  res.send("<h1>Tienda Oficial de Pepito</h1>");
});

app.get('/products/:id', async (req, res)=>{
		let id = JSON.parse(req.params.id);
		let pr = await product.getProductById(id).then();
		if (pr !== null) {
			res.send(pr);
		}else{
			res.send('NOT FOUND')
		}
})

app.get('/products', async (req, res)=>{
	let limit = req.query.limit;
	console.log(limit)
	let pr = [];
	await product.getProduct().then();
	if (limit !== 0 && limit > 0){
		for ( let i = 0; i < limit; i++){
			pr.push(product.products[i])
		}
		res.send(pr);
	}else{
		res.send(product.products);
	}
})


