import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  login_code: string;
  rol: {
    admin: boolean;
    user: boolean;
  };
  activated: boolean;
  activationExpiresAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    login_code: { type: String, required: true, length: 6 }, //camelCase
    rol: {
      type: {
        admin: Boolean,
        user: Boolean,
      },
      required: true,
    },
    activated: { type: Boolean, required: true, default: false },
    activationExpiresAt: {
      type: Date,
      default: function (this: IUser) {
        if (!this.activated) {
          return new Date(Date.now() + 60000); // 60 segundos desde ahora si no está activado
        }
        return undefined; // Sin tiempo de expiración si ya está activado
      },
    },
  },
  { timestamps: true }
);

userSchema.index({ activationExpiresAt: 1 }, { expireAfterSeconds: 0 });

export default model<IUser>("User", userSchema, "users");
