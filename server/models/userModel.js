import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Por favor ingresa tu nombre"],
  },
  email: {
    type: String,
    required: [true, "Por favor ingresa tu correo electrónico"],
    unique: true,
    lowercase: true,
    validate: [
      validator.isEmail,
      "Por favor ingresa un correo electrónico válido",
    ],
  },
  img: String,
  password: {
    type: String,
    required: [true, "Por favor ingresa tu contraseña"],
    minlength: [8, "La contraseña debe tener al menos 8 caracteres"],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Por favor confirma tu contraseña"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Las contraseñas no coinciden",
    },
  },
});

userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 14);
    this.passwordConfirm = undefined;
  }

});

const User = mongoose.model("User", userSchema);

export default User;
