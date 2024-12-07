// Importamos las dependencias necesarias para que el servidor funcione
import mongoose from 'mongoose';

// Definimos el esquema para los roles
const rolSchema = new mongoose.Schema({
    // Definimos las propiedades del rol
    nombre: {
        type: String,
        required: true,
        unique: true, // No podrán haber dos roles con el mismo nombre
    },
});

// Exportamos el esquema para usarlo en otros archivos
export default mongoose.model('Rol', rolSchema);