import { promises as fs } from 'fs';

export class ProductManager {
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
			await fs.writeFile(this.path, JSON.stringify(this.products, null, 2),"utf-8");
			resolve();
		})
  }
  async read() {
		return new Promise (async (resolve, reject) =>{
			await this.ensureProductsFile();
			const fileData = await fs.readFile(this.path, 'utf-8');
			resolve(JSON.parse(fileData))
		} )
  }
	async ensureProductsFile() {
		return fs.readFile(this.path, "utf-8")
		.catch(async (err) => {await fs.writeFile(this.path, JSON.stringify([], null, 2), "utf-8");
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
      !newProduct.category||
      !newProduct.code
    ) {
      console.log("Falta Completar Campos");
      return;
    }
    if (!this.products.some((element) => element.code === newProduct.code)) {
      let product = { id: this.id, status: true, ...newProduct };
      this.products.push(product);
      await this.write();
      this.id = product.id;
      return true
    } else {
      return false
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
      if (product &&       
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.thumbnail ||
        !newProduct.price ||
        !newProduct.stock ||
        !newProduct.category||
        !newProduct.code) {
        product = {id: id, status: true, ...productEdit};
        this.products.splice(idx, 1, product);
      } else {
        console.error("El Producto Que busca Modificar es inexistente y/o Falta completar algun campo");
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


