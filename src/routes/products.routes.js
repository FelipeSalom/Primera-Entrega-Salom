import { Router } from "express";
import { ProductManager } from "../models/ProductManager.js";

const routerProp = Router();

const product = new ProductManager();

routerProp.get("/:id", async (req, res) => {
  let id = JSON.parse(req.params.id);
  let pr = await product.getProductById(id).then();
  if (pr !== null) {
    res.status(202).send(pr);
  } else {
    res.status(404).send("NOT FOUND");
  }
});

routerProp.get("/", async (req, res) => {
  let limit = req.query.limit;
  await product.getProduct().then();
  if (limit !== 0 && limit > 0 && limit <= product.products.length) {
    let prods = product.products.slice(0, limit)
    res.status(202).send(prods);
  } else if (limit > product.products.length) {
    res.status(404).send({
      message: "La cantidad de productos que desea supera la cantidad cargada",
    });
  } else {
    res.status(202).send(product.products);
  }
});

routerProp.post("/", async (req, res) => {
  let newProduct = req.body;
  let statusLoad = await product.addProduct(newProduct);
  console.log(statusLoad);
  if (statusLoad === true) {
    res.status(202).send({
      message: `El Articulo ${newProduct.title} fue Agregado Correctamente`,
      data: newProduct,
    });
  } else {
    res.status(400).send({
      message: `Ya Existe un Articulo con el Codigo: ${newProduct.code}`,
    });
  }
});

routerProp.put("/:id", async (req, res) => {
  let id = JSON.parse(req.params.id);
  let productEdit = req.body;
  if (!productEdit.id) {
    await product.updateProduct(id, productEdit);
    res.status(202).send({
      message: `El articulo ${productEdit.title} fue actualizado`,
    });
  } else {
    res.status(404).send({
      message: "Error al Actualizar Id, Accseso denegado",
    });
  }
});

routerProp.delete("/:id", async (req, res) => {
  let id = JSON.parse(req.params.id);
  await product.deleteProduct(id);
  res.status(202).send({
    message: "El producto fue eliminado ",
  });
});

export default routerProp;
