const fs = require('fs');
let products = [];

class ProductManager {
    constructor(){
        this.id = 1;
        this.path = './products.json'
    }

    getProduct() {
        products = JSON.parse(read);
        return products;
    }

    addProduct(title, description,thumbnail, price, code, stock){
        products = JSON.parse(read);
        if (!title || !description || !thumbnail || !price || !stock || !code){
            console.log("Falta Completar Campos");
            return
        }
        if (!products.some((element) => element.code === code)){
            let idPruct = { id: this.id + products.length}
            let product = {title, description, thumbnail, price, stock, code};
            let newProduct = {...idPruct, ...product} 
            products.push(newProduct);
            console.log(`El Articulo ${title} fue Agregado Correctamente`);
            write();
        }else{
            console.log(`Ya Existe un Articulo con el Codigo: ${code}`);
        }
    }
    
    getProductById(id){
        products = JSON.parse(read);
        let product = products.find((element) => element.id === id);
        if (product){
            return product
        }else{
            console.error(`El Producto de Id: ${id} es inexistente`);
        }
    }
    updateProduct(id, newData, op){
        products = JSON.parse(read);
        let product = products.find((element) => element.id === id);
        let idx = products.indexOf(products.find((element) => element.id === id))
        if (product){
            switch(op) {
                case 1:
                    product.title = newData;
                    products.splice(idx, 1, product);
                    break;
                case 2:
                    product.description = newData;
                    products.splice(idx, 1, product);
                    break;
                case 3:
                    product.thumbnail = newData;
                    products.splice(idx, 1, product);
                    break;
                case 4:
                    product.price = newData;
                    products.splice(idx, 1, product);
                    break;
                case 5:
                    product.code = newData;
                    products.splice(idx, 1, product);
                    break;
                case 6:
                    product.stock = newData;
                    products.splice(idx, 1, product);
                    break;
            }
        }else{
            console.error('El Producto Que busca Modificar es inexistente');
        }
        console.log('El articulo se a modificado correctamente')
        write();
    }
    deleteProduct(id){
        products = JSON.parse(read);
        let idx = products.indexOf(products.find((element) => element.id === id))
        if (product){
            products.splice(idx, 1);
            console.log('El Articulo se Borro Correctamente')
        }else{
            console.error('El Producto Que busca Eliminar es inexistente');
        }
        write();
    }
};

const product = new ProductManager();

const read = fs.readFileSync(product.path, 'utf-8');

const write = async ()=>{
    try{
        let res = await fs.promises.writeFile(product.path, JSON.stringify(products, null, 2), 'utf-8' )
    }catch(error){
        console.log('No se puede escribir el Archivo', error)
    }
}

// 

//Productos Agregados
//product.addProduct("Justin", "Muñeco Tamaño de Felpa Tamaño Real del cantante Justin Biber, ideas para esas tardes lluviosas donde la existencia se vuelve efiemera","url", 15000, 544, 10);

//Verificaciones De Carga
// product.addProduct("Salamin", "Refinado Salamin de Tilcara", 1500, 65, 8);

//Muestra de Los Productos
//console.log(product.getProduct());

//Verificacion de Producto Repetido
//product.addProduct("Tambo", "Refinado Queso de Tilcara","url", 200, 65, 9);

//Busqueda por ID
//console.log(product.getProductById(4))

//Uodate opciones switch: 1 - Titulo, 2 - Descripcion, 3 - Url, 4 - Precio, 5 - Code, 6 - Stock
//Parametros: Primer Parametro = ID, Segundo Parametro = Nuevo Valor, Tercer Parametro = Valor a Modificar (op Switch)
//product.updateProduct(1,'Muñeco',1)

//Deleate por ID
//product.deleteProduct(1)