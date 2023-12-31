const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.id = 0;
    this.products = [];
  }
  async write() {
		return new Promise (async (resolve, reject) => {
			await this.ensureProductsFile();
			await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2),"utf-8");
			resolve();
		})
  }
  async read() {
		return new Promise (async (resolve, reject) =>{
			await this.ensureProductsFile();
			const fileData = await fs.promises.readFile(this.path, 'utf-8');
			resolve(JSON.parse(fileData))
		} )
  }
	async ensureProductsFile() {
		return fs.promises.readFile(this.path, "utf-8")
		.catch(async (err) => {await fs.promises.writeFile(this.path, JSON.stringify([], null, 2), "utf-8");
		});
	}
  async getProduct() {
    this.products = await this.read();
  }
  async addProduct(newProduct) {
    await this.getProduct();
    if (
      !newProduct.title ||
      !newProduct.description ||
      !newProduct.thumbnail ||
      !newProduct.price ||
      !newProduct.stock ||
      !newProduct.code
    ) {
      console.log("Falta Completar Campos");
      return;
    }
    if (!this.products.some((element) => element.code === newProduct.code)) {
      let product = { id: this.id + Math.floor(Math.random() * 9999), ...newProduct };
      this.products.push(product);
      await this.write();
			console.log(`El Articulo ${product.title} fue Agregado Correctamente`);
      this.id = product.id;
    } else {
      console.log(`Ya Existe un Articulo con el Codigo: ${newProduct.code}`);
    }
  }
  async getProductById(id) {
			await this.getProduct();
      let product = this.products.find((element) => element.id === id);
      if (product) {
        console.log(product);
      } else {
        console.error(`El Producto de Id: ${id} es inexistente`);
      }
  }
  async updateProduct(id, productEdit) {
			await this.getProduct();
      let product = this.products.find((element) => element.id === id);
      let idx = this.products.indexOf(
        this.products.find((element) => element.id === id)
      );
      if (product) {
        product = {id: id, ...productEdit};
        this.products.splice(idx, 1, product);
      } else {
        console.error("El Producto Que busca Modificar es inexistente");
      }
      console.log("El articulo se a modificado correctamente");
      await this.write();
  }
  async deleteProduct(id) {
			await this.getProduct();
      let idx = this.products.indexOf(
        this.products.find((element) => element.id === id)
      );
      let product = this.products.find((element) => element.id === id);
      if (product) {
        this.products.splice(idx, 1);
        console.log("El Articulo se Borro Correctamente");
      } else {
        console.error("El Producto Que busca Eliminar es inexistente");
      }
      await this.write();
    };
}

const product = new ProductManager();

//Productos Agregados

// const newProduct = {
//     title: "Justin",
//     description: "Muñeco Tamaño de Felpa Tamaño Real del cantante Justin Biber, ideas para esas tardes lluviosas donde la existencia se vuelve efiemera",
//     thumbnail:"url",
//     price:15000,
//     stock: 10,
//     code: 78
// }
// product.addProduct(newProduct).then();

//Muestra de Los Productos
//product.getProduct().then(async (res) => {console.log(product.products)});

//Busqueda por ID
//product.getProductById(329)

//Update
//const productEdit = {
//     title: "actualizado",
//     description: "Muñeco Tamaño de Felpa Tamaño Real del cantante Justin Biber, ideas para esas tardes lluviosas donde la existencia se vuelve efiemera",
//     thumbnail:"url",
//     price:15000,
//     stock: 10,
//     code: 300
// }
// product.updateProduct(329, productEdit)

//Deleate por ID
//product.deleteProduct(6959)
