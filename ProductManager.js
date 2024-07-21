const fs = require('fs');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(producto) {

        //compruebo que el producto venga completo
        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
            return console.error("Producto incompleto")
        }

        //obtengo ela lista de productos desde le archivo
        const productos = await this.getProduct();
       
        //Creo un nuevo "producto" con los datos proporcionados
        const nuevoProducto = {
            id: productos.length+1,
            title: producto.title,
            description: producto.description,
            price: producto.price,
            thumbnail: producto.thumbnail,
            code: producto.code,
            stock: producto.code
        }
        //agrego ese producto al array de Productos
        productos.push(nuevoProducto);
        
        //Escribo la nuava lista de productos al archivo
        await fs.promises.writeFile(this.path, JSON.stringify(productos),'utf-8');
    }

    async getProduct() {
        try {
            const result = await fs.promises.readFile(this.path, 'utf-8');
            const productos = JSON.parse(result);
            return productos;
        } catch (error) {
            return []
        }

    }

    async getProductByld() {

    }

    async updateProduct() {

    }

    async deleteProduct() {

    }


}