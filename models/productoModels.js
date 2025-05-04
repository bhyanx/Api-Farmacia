const db = require('../config/database'); // Asegúrate de que la ruta sea correcta

class ProductoModel {
    // Obtener todos los productos
    static async getAllProductos() {
        try {
            const [rows] = await db.query('SELECT * FROM Producto WHERE deleted_at IS NULL');
            return rows;
        } catch (error) {
            throw error;
        }
    }

    // Obtener un producto por ID
    static async getProductoById(id) {
        try {
            const [rows] = await db.query('SELECT * FROM Producto WHERE ProductoID = ? AND deleted_at IS NULL', [id]);
            return rows[0];
        } catch (error) {
            throw error;
        }
    }

    // Crear un nuevo producto
    static async createProducto(data) {
        try {
            // Validar que los datos requeridos estén presentes
            const requiredFields = ['Nombre', 'Categoria', 'StockActual', 'StockMinimo', 'PrecioUnitario'];
            const missingFields = requiredFields.filter(field => !data[field]);
            
            if (missingFields.length > 0) {
                throw new Error(`Campos requeridos faltantes: ${missingFields.join(', ')}`);
            }

            // Extraer y validar los datos
            const {
                Nombre,
                NombreGenerico = null,
                Categoria,
                StockActual,
                StockMinimo,
                PrecioUnitario,
                FechaVencimiento = null,
                Lote = null,
                Ubicacion = null
            } = data;

            // Validar tipos de datos
            if (isNaN(StockActual) || isNaN(StockMinimo) || isNaN(PrecioUnitario)) {
                throw new Error('StockActual, StockMinimo y PrecioUnitario deben ser números');
            }

            // Validar que los números sean positivos
            if (StockActual < 0 || StockMinimo < 0 || PrecioUnitario <= 0) {
                throw new Error('Los valores numéricos deben ser positivos');
            }

            // Validar formato de fecha si se proporciona
            if (FechaVencimiento && !/^\d{4}-\d{2}-\d{2}$/.test(FechaVencimiento)) {
                throw new Error('La fecha de vencimiento debe estar en formato YYYY-MM-DD');
            }

            const [result] = await db.query(
                `INSERT INTO Producto (
                    Nombre, 
                    NombreGenerico, 
                    Categoria, 
                    StockActual, 
                    StockMinimo, 
                    PrecioUnitario, 
                    FechaVencimiento, 
                    Lote, 
                    Ubicacion
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    Nombre,
                    NombreGenerico,
                    Categoria,
                    StockActual,
                    StockMinimo,
                    PrecioUnitario,
                    FechaVencimiento,
                    Lote,
                    Ubicacion
                ]
            );

            return result.insertId;
        } catch (error) {
            console.error('Error en createProducto:', error);
            throw error;
        }
    }

    // Actualizar un producto
    static async updateProducto(id, data) {
        try {
            const {
                Nombre,
                NombreGenerico = null,
                Categoria,
                StockActual,
                StockMinimo,
                PrecioUnitario,
                FechaVencimiento = null,
                Lote = null,
                Ubicacion = null
            } = data;

            // Validar tipos de datos
            if (isNaN(StockActual) || isNaN(StockMinimo) || isNaN(PrecioUnitario)) {
                throw new Error('StockActual, StockMinimo y PrecioUnitario deben ser números');
            }

            // Validar que los números sean positivos
            if (StockActual < 0 || StockMinimo < 0 || PrecioUnitario <= 0) {
                throw new Error('Los valores numéricos deben ser positivos');
            }

            // Validar formato de fecha si se proporciona
            if (FechaVencimiento && !/^\d{4}-\d{2}-\d{2}$/.test(FechaVencimiento)) {
                throw new Error('La fecha de vencimiento debe estar en formato YYYY-MM-DD');
            }

            const [result] = await db.query(
                `UPDATE Producto SET 
                    Nombre = ?, 
                    NombreGenerico = ?, 
                    Categoria = ?, 
                    StockActual = ?, 
                    StockMinimo = ?, 
                    PrecioUnitario = ?, 
                    FechaVencimiento = ?, 
                    Lote = ?, 
                    Ubicacion = ?
                WHERE ProductoID = ? AND deleted_at IS NULL`,
                [
                    Nombre,
                    NombreGenerico,
                    Categoria,
                    StockActual,
                    StockMinimo,
                    PrecioUnitario,
                    FechaVencimiento,
                    Lote,
                    Ubicacion,
                    id
                ]
            );
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }

    // Eliminar un producto (eliminación lógica)
    static async deleteProducto(id) {
        try {
            const [result] = await db.query(
                'UPDATE Producto SET deleted_at = NOW() WHERE ProductoID = ?',
                [id]
            );
            return result.affectedRows;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = ProductoModel;