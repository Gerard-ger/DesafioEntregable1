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
            id: productos.length + 1,
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
        await fs.promises.writeFile(this.path, JSON.stringify(productos), 'utf-8');
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

    async getProductById(id) {
        //obtengo la lista de productos desde le archivo
        const productos = await this.getProduct();
        //Busco en el array el producto correcto segun el ID pasado
        const producto = productos.find(p => p.id === id);
        //retorno el encontrado o error
        return producto || `No se encontró un producto con el id ${id}`;
    }

    async updateProduct(id, productoAActualizar) {

        //obtengo la lista de productos desde le archivo
        const productos = await this.getProduct();
        //recorro el array buscando el producto correcto segun el ID pasado
        const index = productos.findIndex(p => p.id === id);
        //si no encuento devuelvo error
        if (index === -1) {
            return `No se encontró un producto con el id ${id}`;
        }
        //actualizo los datos
        productos[index] = {...productos[index], ...productoAActualizar };
        //Vuelvo a guardar el array actualizado en el archivo
        await fs.promises.writeFile(this.path, JSON.stringify(productos), 'utf-8');
        //aviso que se actualizo correctamente
        return `Producto con id ${id} actualizado correctamente`;
    }

    async deleteProduct(id) {
        //obtengo la lista de productos desde le archivo
        const productos = await this.getProduct();

        //recorro el array buscando el producto correcto segun el ID pasado
        const index = productos.findIndex(p => p.id === id);
        //si no encuento devuelvo error
        if (index === -1) {
            return `No se encontró un producto con el id ${id}`;
        }
        //elimino producto
        productos.splice(index, 1);
        //guardo el archivo actualizado
        await fs.promises.writeFile(this.path, JSON.stringify(productos), 'utf-8');
        //aviso que se elimino correctamente
        return `Producto con id ${id} eliminado correctamente`;

    }


}



const test = async () => {
    const productoManager = new ProductManager('./productos.json');

    await productoManager.addProduct({ title: "producto prueba", description:"Este es un producto prueba", price: 200, thumbnail: "Sin imagen", code:"abc123", stock: 25 })
   
    const productos = await productoManager.getProduct();

    console.log(productos);

    console.log(await productoManager.getProductById(5));
    
    console.log(await productoManager.updateProduct(1, { price: 300 }));

    console.log(await productoManager.deleteProduct(1));

}

test();