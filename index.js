class ProductManager {
    constructor(){
        this.product = [];
        this.id = 1;
    }

    getProduct() {
        return this.product;
    }

    addProduct(title, description,thumbnail, price, code, stock){
        if (!title || !description || !thumbnail || !price || !stock || !code){
            console.log("Falta Completar Campos");
            return
        }
        if (!this.product.some((element) => element.code === code)){
            let idPruct = { id: this.id + this.product.length}
            let product = {title, description, thumbnail, price, stock, code};
            let newProduct = {...idPruct, ...product} 
            this.product.push(newProduct);
            console.log(`El Articulo ${title} fue Agregado Correctamente`);
        }else{
            console.log(`Ya Existe un Articulo con el Codigo: ${code}`);
        }
    }
    
    getProductById(id){
        let product = this.product.find((element) => element.id === id);
        if (product){
            return product
        }else{
            console.error(`El Producto de Id: ${id} es inexistente`);
        }
    }
};

const product = new ProductManager();

//Productos Agregados
product.addProduct("Salamin", "Refinado Salamin de Tilcara","url", 1500, 65, 8);
product.addProduct("Mortadela Vegana", "Mortadela a Base de Soja y Papa","url", 3000, 89, 5);
product.addProduct("Jamon", "Refinado Jamon de la Patagonia","url", 2000, 90, 10);

//Verificaciones De Carga
product.addProduct("Salamin", "Refinado Salamin de Tilcara", 1500, 65, 8);

//Muestra de Los Productos
//console.log(product.getProduct());

//Verificacion de Producto Repetido
//product.addProduct("Tambo", "Refinado Queso de Tilcara","url", 200, 65, 9);

//Busqueda por ID
//console.log(product.getProductById(4))
//console.log(product.getProductById(2))