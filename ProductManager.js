const fs = require('fs');

class ProductManager {
  constructor() {
    this.path = "./products.json";
    this.id = 0;
    this.products = [];
  }
  async idCreator(){
    await this.getProduct();
    this.products.sort((a, b) => {return a.id - b.id})
    const id = this.products.find((product, index) => product.id !== index);
    if (id !== undefined) {
      this.id = this.products.indexOf(id);
    } else {
      this.id = this.products.length;
    }
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
    await this.idCreator();
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
      let product = { id: this.id, ...newProduct };
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
        return product
      } else {
        console.log(`El Producto de ID: ${id} es Inexistente`)
        product = null;
        return product;
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

module.exports = ProductManager;

const product = new ProductManager();

//Productos Agregados

// const newProduct = {
//   title: "Gabinete Phanteks eclipse p400",
//   description: "Gabinete de 210x510x420, vidrio templado frontal",
//   thumbnail: "url",
//   price: 365000,
//   stock: 5,
//   code: 200
// }
// product.addProduct(newProduct).then();

//Muestra de Los Productos
//product.getProduct().then(async (res) => {console.log(product.products)});

//Busqueda por ID
//product.getProductById(4353)

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
//product.deleteProduct(1)
