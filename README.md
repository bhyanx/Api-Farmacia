# Documentación de la API - Farmacia (con Axios)

Esta documentación describe las rutas de la API para la gestión de una farmacia, incluyendo usuarios, ventas, productos, proveedores, recetas, alertas, clientes y más. La API está construida con Express.js, soporta CORS y maneja datos en formato JSON. La base URL para todas las rutas es: `https://api-farmacia-production.up.railway.app/api`.

## Configuración General
- **Formato de datos**: JSON
- **CORS**: Habilitado para el origen especificado en `.env`
- **Errores**: Las respuestas de error incluyen un código de estado HTTP y un objeto JSON con las claves `error` y `message`.
- **Autenticación**: No se especifica autenticación en las rutas proporcionadas.
- **Eliminación lógica**: Las entidades soportan eliminación lógica (soft delete) mediante el campo `deleted_at`.
- **Cliente HTTP**: Los ejemplos utilizan **Axios** para realizar solicitudes desde una aplicación React. Asegúrate de tener Axios instalado (`npm install axios`).

## Configuración de Axios
En tu proyecto React, importa Axios y configúralo para usar la base URL:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api-farmacia-production.up.railway.app/api',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

Usa la instancia `api` para todas las solicitudes en los ejemplos a continuación.

## Rutas de la API

### 1. Usuarios (`/api/Usuarios`)
Maneja operaciones relacionadas con los usuarios del sistema.

#### GET `/api/Usuarios`
- **Descripción**: Obtiene todos los usuarios activos.
- **Respuesta**: `200 OK` con un arreglo de usuarios.
- **Ejemplo de respuesta**:
  ```json
  [
    {
      "UsuarioID": 1,
      "Nombre": "Juan Pérez",
      "Rol": "Administrador",
      "Email": "juan@example.com",
      "Contrasena": "hashed_password",
      "Estado": "Activo",
      "created_at": "2025-04-29T10:00:00.000Z",
      "updated_at": "2025-04-29T10:00:00.000Z"
    }
  ]
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  import api from './api'; // Ruta al archivo donde configuraste Axios

  const fetchUsuarios = async () => {
    try {
      const response = await api.get('/Usuarios');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching usuarios:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/Usuarios/:id`
- **Descripción**: Obtiene un usuario por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID del usuario (número).
- **Respuesta**: `200 OK` con los datos del usuario o `404 Not Found` si no existe.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchUsuarioById = async (id) => {
    try {
      const response = await api.get(`/Usuarios/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching usuario:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/Usuarios`
- **Descripción**: Crea un nuevo usuario.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "Nombre": "string",
    "Rol": "string",
    "Email": "string",
    "Contrasena": "string",
    "Estado": "string" // Opcional, por defecto "Activo"
  }
  ```
- **Validaciones**:
  - `Nombre`, `Rol`, `Email` y `Contrasena` son obligatorios.
- **Respuesta**: `201 Created` con el ID del usuario creado.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createUsuario = async (usuarioData) => {
    try {
      const response = await api.post('/Usuarios', usuarioData);
      console.log('Usuario creado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating usuario:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const usuario = {
    Nombre: 'Ana López',
    Rol: 'Farmacéutico',
    Email: 'ana@example.com',
    Contrasena: '123456',
    Estado: 'Activo',
  };
  createUsuario(usuario);
  ```

#### PUT `/api/Usuarios/:id`
- **Descripción**: Actualiza un usuario existente.
- **Parámetros**:
  - `id` (path, requerido): ID del usuario (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "Nombre": "string",
    "Rol": "string",
    "Email": "string",
    "Contrasena": "string", // Opcional
    "Estado": "string" // Opcional, por defecto "Activo"
  }
  ```
- **Validaciones**:
  - `Nombre`, `Rol` y `Email` son obligatorios.
- **Respuesta**: `200 OK` con confirmación.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateUsuario = async (id, usuarioData) => {
    try {
      const response = await api.put(`/Usuarios/${id}`, usuarioData);
      console.log('Usuario actualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating usuario:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const usuarioActualizado = {
    Nombre: 'Juan Pérez',
    Rol: 'Administrador',
    Email: 'juan.perez@example.com',
    Estado: 'Activo',
  };
  updateUsuario(1, usuarioActualizado);
  ```

#### DELETE `/api/Usuarios/:id`
- **Descripción**: Elimina un usuario (soft delete).
- **Parámetros**:
  - `id` (path, requerido): ID del usuario (número).
- **Respuesta**: `200 OK` con confirmación.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteUsuario = async (id) => {
    try {
      const response = await api.delete(`/Usuarios/${id}`);
      console.log('Usuario eliminado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting usuario:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  deleteUsuario(1);
  ```

---

### 2. Ventas (`/api/Ventas`)
Maneja operaciones relacionadas con las ventas.

#### GET `/api/Ventas`
- **Descripción**: Obtiene todas las ventas activas.
- **Respuesta**: `200 OK` con un arreglo de ventas.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchVentas = async () => {
    try {
      const response = await api.get('/Ventas');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching ventas:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/Ventas/:id`
- **Descripción**: Obtiene una venta por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID de la venta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchVentaById = async (id) => {
    try {
      const response = await api.get(`/Ventas/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching venta:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/Ventas/cliente/:clienteId`
- **Descripción**: Obtiene todas las ventas asociadas a un cliente.
- **Parámetros**:
  - `clienteId` (path, requerido): ID del cliente (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchVentasByCliente = async (clienteId) => {
    try {
      const response = await api.get(`/Ventas/cliente/${clienteId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching ventas by cliente:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/Ventas`
- **Descripción**: Crea una nueva venta.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "ClienteID": "number",
    "Total": "number",
    "MetodoPago": "string",
    "Estado": "string" // Opcional, por defecto "Completada"
  }
  ```
- **Validaciones**:
  - `ClienteID` y `MetodoPago` son obligatorios.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createVenta = async (ventaData) => {
    try {
      const response = await api.post('/Ventas', ventaData);
      console.log('Venta creada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating venta:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const venta = {
    ClienteID: 1,
    Total: 100.50,
    MetodoPago: 'Efectivo',
    Estado: 'Completada',
  };
  createVenta(venta);
  ```

#### PUT `/api/Ventas/:id`
- **Descripción**: Actualiza una venta existente.
- **Parámetros**:
  - `id` (path, requerido): ID de la venta (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "ClienteID": "number",
    "Total": "number",
    "MetodoPago": "string",
    "Estado": "string" // Opcional, por defecto "Completada"
  }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateVenta = async (id, ventaData) => {
    try {
      const response = await api.put(`/Ventas/${id}`, ventaData);
      console.log('Venta actualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating venta:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const ventaActualizada = {
    ClienteID: 1,
    Total: 150.75,
    MetodoPago: 'Tarjeta',
    Estado: 'Completada',
  };
  updateVenta(1, ventaActualizada);
  ```

#### DELETE `/api/Ventas/:id`
- **Descripción**: Elimina una venta (soft delete).
- **Parámetros**:
  - `id` (path, requerido): ID de la venta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteVenta = async (id) => {
    try {
      const response = await api.delete(`/Ventas/${id}`);
      console.log('Venta eliminada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting venta:', error.response?.data);
      throw error;
    }
  };
  ```

---

### 3. Detalle de Ventas (`/api/DetalleVentas`)
Maneja los detalles de las ventas (líneas de productos en una venta).

#### GET `/api/DetalleVentas`
- **Descripción**: Obtiene todos los detalles de ventas.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchDetallesVenta = async () => {
    try {
      const response = await api.get('/DetalleVentas');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching detalles venta:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/DetalleVentas/venta/:ventaId`
- **Descripción**: Obtiene los detalles de una venta específica.
- **Parámetros**:
  - `ventaId` (path, requerido): ID de la venta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchDetallesByVenta = async (ventaId) => {
    try {
      const response = await api.get(`/DetalleVentas/venta/${ventaId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching detalles by venta:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/DetalleVentas/:id`
- **Descripción**: Obtiene un detalle de venta por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID del detalle de venta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchDetalleVentaById = async (id) => {
    try {
      const response = await api.get(`/DetalleVentas/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching detalle venta:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/DetalleVentas`
- **Descripción**: Crea un nuevo detalle de venta.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "VentaID": "number",
    "ProductoID": "number",
    "Cantidad": "number",
    "PrecioUnitario": "number"
  }
  ```
- **Validaciones**:
  - Todos los campos son obligatorios.
  - `Subtotal` se calcula automáticamente (`Cantidad * PrecioUnitario`).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createDetalleVenta = async (detalleData) => {
    try {
      const response = await api.post('/DetalleVentas', detalleData);
      console.log('Detalle venta creado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating detalle venta:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const detalle = {
    VentaID: 1,
    ProductoID: 1,
    Cantidad: 2,
    PrecioUnitario: 25.00,
  };
  createDetalleVenta(detalle);
  ```

#### PUT `/api/DetalleVentas/:id`
- **Descripción**: Actualiza un detalle de venta existente.
- **Parámetros**:
  - `id` (path, requerido): ID del detalle de venta (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "VentaID": "number",
    "ProductoID": "number",
    "Cantidad": "number",
    "PrecioUnitario": "number"
  }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateDetalleVenta = async (id, detalleData) => {
    try {
      const response = await api.put(`/DetalleVentas/${id}`, detalleData);
      console.log('Detalle venta actualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating detalle venta:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const detalleActualizado = {
    VentaID: 1,
    ProductoID: 1,
    Cantidad: 3,
    PrecioUnitario: 25.00,
  };
  updateDetalleVenta(1, detalleActualizado);
  ```

#### DELETE `/api/DetalleVentas/:id`
- **Descripción**: Elimina un detalle de venta.
- **Parámetros**:
  - `id` (path, requerido): ID del detalle de venta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteDetalleVenta = async (id) => {
    try {
      const response = await api.delete(`/DetalleVentas/${id}`);
      console.log('Detalle venta eliminado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting detalle venta:', error.response?.data);
      throw error;
    }
  };
  ```

---

### 4. Detalles (`/api/Detalles`)
Maneja los detalles de compras (líneas de productos en una compra).

#### GET `/api/Detalles`
- **Descripción**: Obtiene todos los detalles de compras.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchDetallesCompra = async () => {
    try {
      const response = await api.get('/Detalles');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching detalles compra:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/Detalles/compra/:compraId`
- **Descripción**: Obtiene los detalles de una compra específica.
- **Parámetros**:
  - `compraId` (path, requerido): ID de la compra (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchDetallesByCompra = async (compraId) => {
    try {
      const response = await api.get(`/Detalles/compra/${compraId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching detalles by compra:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/Detalles/:id`
- **Descripción**: Obtiene un detalle de compra por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID del detalle de compra (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchDetalleCompraById = async (id) => {
    try {
      const response = await api.get(`/Detalles/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching detalle compra:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/Detalles`
- **Descripción**: Crea un nuevo detalle de compra.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "CompraID": "number",
    "ProductoID": "number",
    "Cantidad": "number",
    "PrecioUnitario": "number"
  }
  ```
- **Validaciones**:
  - Todos los campos son obligatorios.
  - `Subtotal` se calcula automáticamente.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createDetalleCompra = async (detalleData) => {
    try {
      const response = await api.post('/Detalles', detalleData);
      console.log('Detalle compra creado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating detalle compra:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const detalleCompra = {
    CompraID: 1,
    ProductoID: 1,
    Cantidad: 10,
    PrecioUnitario: 15.00,
  };
  createDetalleCompra(detalleCompra);
  ```

#### PUT `/api/Detalles/:id`
- **Descripción**: Actualiza un detalle de compra existente.
- **Parámetros**:
  - `id` (path, requerido): ID del detalle de compra (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "CompraID": "number",
    "ProductoID": "number",
    "Cantidad": "number",
    "PrecioUnitario": "number"
  }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateDetalleCompra = async (id, detalleData) => {
    try {
      const response = await api.put(`/Detalles/${id}`, detalleData);
      console.log('Detalle compra actualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating detalle compra:', error.response?.data);
      throw error;
    }
  };
  ```

#### DELETE `/api/Detalles/:id`
- **Descripción**: Elimina un detalle de compra.
- **Parámetros**:
  - `id` (path, requerido): ID del detalle de compra (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteDetalleCompra = async (id) => {
    try {
      const response = await api.delete(`/Detalles/${id}`);
      console.log('Detalle compra eliminado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting detalle compra:', error.response?.data);
      throw error;
    }
  };
  ```

---

### 5. Productos (`/api/Productos`)
Maneja operaciones relacionadas con los productos.

#### GET `/api/Productos`
- **Descripción**: Obtiene todos los productos activos.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchProductos = async () => {
    try {
      const response = await api.get('/Productos');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching productos:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/Productos/:id`
- **Descripción**: Obtiene un producto por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID del producto (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchProductoById = async (id) => {
    try {
      const response = await api.get(`/Productos/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching producto:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/Productos`
- **Descripción**: Crea un nuevo producto.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "Nombre": "string",
    "NombreGenerico": "string",
    "Categoria": "string",
    "StockActual": "number",
    "StockMinimo": "number",
    "PrecioUnitario": "number",
    "FechaVencimiento": "string", // Formato: YYYY-MM-DD
    "Lote": "string",
    "Ubicacion": "string"
  }
  ```
- **Validaciones**:
  - Todos los campos son obligatorios.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createProducto = async (productoData) => {
    try {
      const response = await api.post('/Productos', productoData);
      console.log('Producto creado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating producto:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const producto = {
    Nombre: 'Paracetamol',
    NombreGenerico: 'Acetaminofén',
    Categoria: 'Analgésico',
    StockActual: 100,
    StockMinimo: 10,
    PrecioUnitario: 0.50,
    FechaVencimiento: '2026-04-29',
    Lote: 'A123',
    Ubicacion: 'Estante A1',
  };
  createProducto(producto);
  ```

#### PUT `/api/Productos/:id`
- **Descripción**: Actualiza un producto existente.
- **Parámetros**:
  - `id` (path, requerido): ID del producto (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "Nombre": "string",
    "NombreGenerico": "string",
    "Categoria": "string",
    "StockActual": "number",
    "StockMinimo": "number",
    "PrecioUnitario": "number",
    "FechaVencimiento": "string",
    "Lote": "string",
    "Ubicacion": "string"
  }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateProducto = async (id, productoData) => {
    try {
      const response = await api.put(`/Productos/${id}`, productoData);
      console.log('Producto actualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating producto:', error.response?.data);
      throw error;
    }
  };
  ```

#### DELETE `/api/Productos/:id`
- **Descripción**: Elimina un producto (soft delete).
- **Parámetros**:
  - `id` (path, requerido): ID del producto (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteProducto = async (id) => {
    try {
      const response = await api.delete(`/Productos/${id}`);
      console.log('Producto eliminado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting producto:', error.response?.data);
      throw error;
    }
  };
  ```

---

### 6. Detalle de Compras (`/api/DetalleCompras`)
Maneja operaciones relacionadas con las compras a proveedores.

#### GET `/api/DetalleCompras`
- **Descripción**: Obtiene todas las compras activas.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchCompras = async () => {
    try {
      const response = await api.get('/DetalleCompras');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching compras:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/DetalleCompras/:id`
- **Descripción**: Obtiene una compra por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID de la compra (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchCompraById = async (id) => {
    try {
      const response = await api.get(`/DetalleCompras/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching compra:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/DetalleCompras`
- **Descripción**: Crea una nueva compra.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "ProveedorID": "number",
    "FechaCompra": "string", // Formato: YYYY-MM-DD
    "FechaEntrega": "string", // Formato: YYYY-MM-DD
    "Total": "number",
    "Estado": "string"
  }
  ```
- **Validaciones**:
  - Todos los campos son obligatorios.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createCompra = async (compraData) => {
    try {
      const response = await api.post('/DetalleCompras', compraData);
      console.log('Compra creada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating compra:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const compra = {
    ProveedorID: 1,
    FechaCompra: '2025-04-29',
    FechaEntrega: '2025-05-01',
    Total: 500.00,
    Estado: 'Recibida',
  };
  createCompra(compra);
  ```

#### PUT `/api/DetalleCompras/:id`
- **Descripción**: Actualiza una compra existente.
- **Parámetros**:
  - `id` (path, requerido): ID de la compra (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "ProveedorID": "number",
    "FechaCompra": "string",
    "FechaEntrega": "string",
    "Total": "number",
    "Estado": "string"
  }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateCompra = async (id, compraData) => {
    try {
      const response = await api.put(`/DetalleCompras/${id}`, compraData);
      console.log('Compra actualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating compra:', error.response?.data);
      throw error;
    }
  };
  ```

#### DELETE `/api/DetalleCompras/:id`
- **Descripción**: Elimina una compra (soft delete).
- **Parámetros**:
  - `id` (path, requerido): ID de la compra (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteCompra = async (id) => {
    try {
      const response = await api.delete(`/DetalleCompras/${id}`);
      console.log('Compra eliminada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting compra:', error.response?.data);
      throw error;
    }
  };
  ```

---

### 7. Proveedores (`/api/Proveedores`)
Maneja operaciones relacionadas con los proveedores.

#### GET `/api/Proveedores`
- **Descripción**: Obtiene todos los proveedores activos.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchProveedores = async () => {
    try {
      const response = await api.get('/Proveedores');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching proveedores:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/Proveedores/:id`
- **Descripción**: Obtiene un proveedor por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID del proveedor (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchProveedorById = async (id) => {
    try {
      const response = await api.get(`/Proveedores/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching proveedor:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/Proveedores`
- **Descripción**: Crea un nuevo proveedor.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "Nombre": "string",
    "Contacto": "string",
    "Direccion": "string",
    "Estado": "string" // Opcional, por defecto "Activo"
  }
  ```
- **Validaciones**:
  - `Nombre`, `Contacto` y `Direccion` son obligatorios.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createProveedor = async (proveedorData) => {
    try {
      const response = await api.post('/Proveedores', proveedorData);
      console.log('Proveedor creado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating proveedor:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const proveedor = {
    Nombre: 'FarmaDist',
    Contacto: 'contacto@farmadist.com',
    Direccion: 'Av. Principal 123',
    Estado: 'Activo',
  };
  createProveedor(proveedor);
  ```

#### PUT `/api/Proveedores/:id`
- **Descripción**: Actualiza un proveedor existente.
- **Parámetros**:
  - `id` (path, requerido): ID del proveedor (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "Nombre": "string",
    "Contacto": "string",
    "Direccion": "string",
    "Estado": "string" // Opcional
  }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateProveedor = async (id, proveedorData) => {
    try {
      const response = await api.put(`/Proveedores/${id}`, proveedorData);
      console.log('Proveedor actualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating proveedor:', error.response?.data);
      throw error;
    }
  };
  ```

#### DELETE `/api/Proveedores/:id`
- **Descripción**: Elimina un proveedor (soft delete).
- **Parámetros**:
  - `id` (path, requerido): ID del proveedor (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteProveedor = async (id) => {
    try {
      const response = await api.delete(`/Proveedores/${id}`);
      console.log('Proveedor eliminado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting proveedor:', error.response?.data);
      throw error;
    }
  };
  ```

---

### 8. Producto-Proveedor (`/api/ProductoProveedores`)
Maneja la relación entre productos y proveedores.

#### GET `/api/ProductoProveedores`
- **Descripción**: Obtiene todos los registros de productos asociados a proveedores.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchProductoProveedores = async () => {
    try {
      const response = await api.get('/ProductoProveedores');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching producto proveedores:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/ProductoProveedores/:productoId/:proveedorId`
- **Descripción**: Obtiene un registro por `ProductoID` y `ProveedorID`.
- **Parámetros**:
  - `productoId` (path, requerido): ID del producto (número).
  - `proveedorId` (path, requerido): ID del proveedor (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchProductoProveedorByIds = async (productoId, proveedorId) => {
    try {
      const response = await api.get(`/ProductoProveedores/${productoId}/${proveedorId}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching producto proveedor:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/ProductoProveedores`
- **Descripción**: Crea una nueva relación producto-proveedor.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "ProductoID": "number",
    "ProveedorID": "number"
  }
  ```
- **Validaciones**:
  - Ambos campos son obligatorios.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createProductoProveedor = async (productoProveedorData) => {
    try {
      const response = await api.post('/ProductoProveedores', productoProveedorData);
      console.log('Producto-Proveedor creado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating producto proveedor:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const productoProveedor = {
    ProductoID: 1,
    ProveedorID: 1,
  };
  createProductoProveedor(productoProveedor);
  ```

#### DELETE `/api/ProductoProveedores/:productoId/:proveedorId`
- **Descripción**: Elimina una relación producto-proveedor.
- **Parámetros**:
  - `productoId` (path, requerido): ID del producto (número).
  - `proveedorId` (path, requerido): ID del proveedor (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteProductoProveedor = async (productoId, proveedorId) => {
    try {
      const response = await api.delete(`/ProductoProveedores/${productoId}/${proveedorId}`);
      console.log('Producto-Proveedor eliminado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting producto proveedor:', error.response?.data);
      throw error;
    }
  };
  ```

---

### 9. Recetas (`/api/Recetas`)
Maneja operaciones relacionadas con las recetas médicas.

#### GET `/api/Recetas`
- **Descripción**: Obtiene todas las recetas activas.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchRecetas = async () => {
    try {
      const response = await api.get('/Recetas');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching recetas:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/Recetas/:id`
- **Descripción**: Obtiene una receta por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID de la receta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchRecetaById = async (id) => {
    try {
      const response = await api.get(`/Recetas/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching receta:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/Recetas`
- **Descripción**: Crea una nueva receta.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "ClienteID": "number",
    "FechaEmision": "string", // Formato: YYYY-MM-DD
    "Medico": "string",
    "Estado": "string" // Opcional, por defecto "Pendiente"
  }
  ```
- **Validaciones**:
  - `ClienteID` y `Medico` son obligatorios.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createReceta = async (recetaData) => {
    try {
      const response = await api.post('/Recetas', recetaData);
      console.log('Receta creada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating receta:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const receta = {
    ClienteID: 1,
    FechaEmision: '2025-04-29',
    Medico: 'Dr. Carlos Ruiz',
    Estado: 'Pendiente',
  };
  createReceta(receta);
  ```

#### PUT `/api/Recetas/:id`
- **Descripción**: Actualiza una receta existente.
- **Parámetros**:
  - `id` (path, requerido): ID de la receta (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "ClienteID": "number",
    "FechaEmision": "string",
    "Medico": "string",
    "Estado": "string" // Opcional
  }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateReceta = async (id, recetaData) => {
    try {
      const response = await api.put(`/Recetas/${id}`, recetaData);
      console.log('Receta actualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating receta:', error.response?.data);
      throw error;
    }
  };
  ```

#### DELETE `/api/Recetas/:id`
- **Descripción**: Elimina una receta (soft delete).
- **Parámetros**:
  - `id` (path, requerido): ID de la receta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteReceta = async (id) => {
    try {
      const response = await api.delete(`/Recetas/${id}`);
      console.log('Receta eliminada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting receta:', error.response?.data);
      throw error;
    }
  };
  ```

---

### 10. Detalle de Recetas (`/api/DetalleRecetas`)
Maneja los detalles de las recetas (productos prescritos).

#### GET `/api/DetalleRecetas`
- **Descripción**: Obtiene todos los detalles de recetas.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchDetallesReceta = async () => {
    try {
      const response = await api.get('/DetalleRecetas');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching detalles receta:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/DetalleRecetas/:id`
- **Descripción**: Obtiene un detalle de receta por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID del detalle de receta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchDetalleRecetaById = async (id) => {
    try {
      const response = await api.get(`/DetalleRecetas/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching detalle receta:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/DetalleRecetas`
- **Descripción**: Crea un nuevo detalle de receta.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "RecetaID": "number",
    "ProductoID": "number",
    "Dosis": "string",
    "Cantidad": "number"
  }
  ```
- **Validaciones**:
  - `RecetaID`, `ProductoID` y `Cantidad` son obligatorios.
  - `Dosis` es opcional.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createDetalleReceta = async (detalleData) => {
    try {
      const response = await api.post('/DetalleRecetas', detalleData);
      console.log('Detalle receta creado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating detalle receta:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const detalleReceta = {
    RecetaID: 1,
    ProductoID: 1,
    Dosis: '1 tableta cada 8 horas',
    Cantidad: 30,
  };
  createDetalleReceta(detalleReceta);
  ```

#### PUT `/api/DetalleRecetas/:id`
- **Descripción**: Actualiza un detalle de receta existente.
- **Parámetros**:
  - `id` (path, requerido): ID del detalle de receta (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "RecetaID": "number",
    "ProductoID": "number",
    "Dosis": "string",
    "Cantidad": "number"
  }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateDetalleReceta = async (id, detalleData) => {
    try {
      const response = await api.put(`/DetalleRecetas/${id}`, detalleData);
      console.log('Detalle receta actualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating detalle receta:', error.response?.data);
      throw error;
    }
  };
  ```

#### DELETE `/api/DetalleRecetas/:id`
- **Descripción**: Elimina un detalle de receta.
- **Parámetros**:
  - `id` (path, requerido): ID del detalle de receta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteDetalleReceta = async (id) => {
    try {
      const response = await api.delete(`/DetalleRecetas/${id}`);
      console.log('Detalle receta eliminado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting detalle receta:', error.response?.data);
      throw error;
    }
  };
  ```

---

### 11. Alertas (`/api/Alertas`)
Maneja operaciones relacionadas con las alertas (por ejemplo, stock bajo o vencimientos).

#### GET `/api/Alertas`
- **Descripción**: Obtiene todas las alertas.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchAlertas = async () => {
    try {
      const response = await api.get('/Alertas');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching alertas:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/Alertas/:id`
- **Descripción**: Obtiene una alerta por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID de la alerta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchAlertaById = async (id) => {
    try {
      const response = await api.get(`/Alertas/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching alerta:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/Alertas`
- **Descripción**: Crea una nueva alerta.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "ProductoID": "number",
    "Tipo": "string",
    "FechaGeneracion": "string", // Formato: YYYY-MM-DDTHH:mm:ss
    "Estado": "string"pq // Opcional, por defecto "Pendiente"
  }
  ```
- **Validaciones**:
  - `ProductoID` y `Tipo` son obligatorios.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createAlerta = async (alertaData) => {
    try {
      const response = await api.post('/Alertas', alertaData);
      console.log('Alerta creada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating alerta:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const alerta = {
    ProductoID: 1,
    Tipo: 'Stock Bajo',
    FechaGeneracion: '2025-04-29T10:00:00',
    Estado: 'Pendiente',
  };
  createAlerta(alerta);
  ```

#### PUT `/api/Alertas/:id`
- **Descripción**: Actualiza una alerta existente.
- **Parámetros**:
  - `id` (path, requerido): ID de la alerta (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "ProductoID": "number",
    "Tipo": "string",
    "FechaGeneracion": "string",
    "Estado": "string" // Opcional
  }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateAlerta = async (id, alertaData) => {
    try {
      const response = await api.put(`/Alertas/${id}`, alertaData);
      console.log('Alerta actualizada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating alerta:', error.response?.data);
      throw error;
    }
  };
  ```

#### DELETE `/api/Alertas/:id`
- **Descripción**: Elimina una alerta.
- **Parámetros**:
  - `id` (path, requerido): ID de la alerta (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteAlerta = async (id) => {
    try {
      const response = await api.delete(`/Alertas/${id}`);
      console.log('Alerta eliminada:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting alerta:', error.response?.data);
      throw error;
    }
  };
  ```

---

### 12. Clientes (`/api/Clientes`)
Maneja operaciones relacionadas con los clientes.

#### GET `/api/Clientes`
- **Descripción**: Obtiene todos los clientes activos.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchClientes = async () => {
    try {
      const response = await api.get('/Clientes');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching clientes:', error.response?.data);
      throw error;
    }
  };
  ```

#### GET `/api/Clientes/:id`
- **Descripción**: Obtiene un cliente por su ID.
- **Parámetros**:
  - `id` (path, requerido): ID del cliente (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const fetchClienteById = async (id) => {
    try {
      const response = await api.get(`/Clientes/${id}`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching cliente:', error.response?.data);
      throw error;
    }
  };
  ```

#### POST `/api/Clientes`
- **Descripción**: Crea un nuevo cliente.
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "Nombre": "string",
    "DNI": "string",
    "Telefono": "string", // Opcional
    "Email": "string", // Opcional
    "HistorialMedico": "string" // Opcional
  }
  ```
- **Validaciones**:
  - `Nombre` y `DNI` son obligatorios.
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const createCliente = async (clienteData) => {
    try {
      const response = await api.post('/Clientes', clienteData);
      console.log('Cliente creado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating cliente:', error.response?.data);
      throw error;
    }
  };

  // Ejemplo de uso
  const cliente = {
    Nombre: 'María Gómez',
    DNI: '12345678',
    Telefono: '987654321',
    Email: 'maria@example.com',
    HistorialMedico: 'Alergia a penicilina',
  };
  createCliente(cliente);
  ```

#### PUT `/api/Clientes/:id`
- **Descripción**: Actualiza un cliente existente.
- **Parámetros**:
  - `id` (path, requerido): ID del cliente (número).
- **Cuerpo de la solicitud** (JSON, requerido):
  ```json
  {
    "Nombre": "string",
    "DNI": "string",
    "Telefono": "string", // Opcional
    "Email": "string", // Opcional
    "HistorialMedico": "string" // Opcional
  }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const updateCliente = async (id, clienteData) => {
    try {
      const response = await api.put(`/Clientes/${id}`, clienteData);
      console.log('Cliente actualizado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error updating cliente:', error.response?.data);
      throw error;
    }
  };
  ```

#### DELETE `/api/Clientes/:id`
- **Descripción**: Elimina un cliente (soft delete).
- **Parámetros**:
  - `id` (path, requerido): ID del cliente (número).
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const deleteCliente = async (id) => {
    try {
      const response = await api.delete(`/Clientes/${id}`);
      console.log('Cliente eliminado:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error deleting cliente:', error.response?.data);
      throw error;
    }
  };
  ```

---

## Ruta de Prueba
#### GET `/`
- **Descripción**: Verifica que la API está funcionando.
- **Respuesta**: `200 OK` con un mensaje.
- **Ejemplo de respuesta**:
  ```json
  { "message": "API is running" }
  ```
- **Ejemplo de solicitud con Axios**:
  ```javascript
  const checkApi = async () => {
    try {
      const response = await api.get('/');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error checking API:', error.response?.data);
      throw error;
    }
  };
  ```

## Manejo de Errores
- **500 Internal Server Error**: Error en el servidor.
  ```json
  {
    "error": "Error en el servidor",
    "message": "Mensaje específico del error"
  }
  ```
- **400 Bad Request**: Datos de solicitud inválidos (por ejemplo, campos obligatorios faltantes).
- **404 Not Found**: Recurso no encontrado.
- **Manejo en Axios**: Los ejemplos incluyen bloques `try/catch` para capturar errores y acceder a `error.response?.data` para detalles del error.

## Notas Adicionales
- **Uso en React**: Los fragmentos de código pueden usarse en servicios API separados (por ejemplo, `api/usuarios.js`) o directamente en componentes con hooks como `useEffect` para realizar solicitudes al montar el componente.
- **Fechas**: Las fechas en los cuerpos de las solicitudes deben estar en formato `YYYY-MM-DD` o `YYYY-MM-DDTHH:mm:ss` para campos como `FechaGeneracion` o `FechaEmision`.
- **Campos opcionales**: Pueden omitirse en las solicitudes POST y PUT, y se aplicarán valores por defecto según los modelos.
- **Eliminación lógica**: Entidades como `Usuario`, `Cliente`, `Producto`, `Proveedor`, `Receta`, `Compra` y `Venta` usan `deleted_at` para eliminación lógica.
- **Integración en React**: Considera usar un estado global (como Redux o Context) para manejar las respuestas de la API y actualizar la UI de manera eficiente.