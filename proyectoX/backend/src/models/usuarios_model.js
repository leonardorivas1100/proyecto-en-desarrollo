import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';  

// Esquema del modelo Usuario
const usuarioSchema = new mongoose.Schema({

  numeroIdentificacion: {
    type: String,    
    required: true,
    unique: true,  
  },

  nombres: { 
    type: String,
    required: true
  },

  apellidos: { 
    type: String,
    required: true 
  },

  telefono: {
    type: String,
    required: true,
    unique: true,  
  },

  email: {
    type: String,
    required: true,
    unique: true,  
  },
  
  password: { 
    type: String, 
    required: true 
  },

  id_rol: {
    type: mongoose.Schema.Types.ObjectId,  
    required: true,
    ref: 'Rol',
  },
  
}, { timestamps: true });

// Middleware para encriptar la contraseña antes de guardarla
usuarioSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await bcrypt.hash(this.password, 10); // Encriptamos la contraseña con un saltRounds de 10
  }
  next();
});

// Modelo de Usuario
const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;
