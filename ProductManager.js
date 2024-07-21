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

        //obtengo la lista de productos desde le archivo
        const productos = await this.getProduct();
       
        //Creo un nuevo "producto" con los datos proporcionados
        const nuevoProducto = {
            id: productos.length+1,
            title: producto.title,
            description: producto.description,
            price: producto.price,
            thumbnail: producto.thumbnail,
            code: producto.code,
            stock: producto.stock
        }
        //agrego ese producto al array de Productos
        productos.push(nuevoProducto);
        
        //Escribo la nuava lista de productos al archivo
        await fs.promises.writeFile(this.path, JSON.stringify(productos),'utf-8');
    }

    async getProduct() {
        try {
            //Leo el archivo y lo parseo, luego devuelvo la lista de productos que obtengo
            const result = await fs.promises.readFile(this.path, 'utf-8');
            const productos = JSON.parse(result);
            return productos;
        } catch (error) {
            //si no lee nada devuelte una lista vacia
            return []
        }
    }

    async getProductByld(id) {
        //obtengo la lista de productos desde le archivo
        const productos = await this.getProduct();
        //recorro el array buscando el producto correcto segun el ID pasado
        for (const producto of productos) {
            if (producto.id == id ) {
                return producto;
            }
        }
    }

    async updateProduct(id, productoAActualizar) {
      
         //obtengo la lista de productos desde le archivo
         const productos = await this.getProduct();
         //recorro el array buscando el producto correcto segun el ID pasado
         for (const producto of productos) {
             if (producto.id == id ) {
                //cuando lo encontre le actualizo los datos 
                producto.title = productoAActualizar.title;
                producto.description = productoAActualizar.description;
                producto.price = productoAActualizar.price;
                producto.code = productoAActualizar.code;
                producto.stock = productoAActualizar.stock;
             }
         }
         //Vuelvo a guardar el array actualizado en el archivo
         await fs.promises.writeFile(this.path, JSON.stringify(productos),'utf-8');

    }

    async deleteProduct(id) {
        //obtengo la lista de productos desde le archivo
        const productos = await this.getProduct();

        for (let i = 0; i < productos.length; i++) {
            if (producto.id == id ) {
                delete(productos[i]);
            }
        }


    }


}