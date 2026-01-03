import mongoose from "mongoose";
import { hash } from "bcrypt";

/**
 * @typedef {Object} User
 * @property {string} userName
 * @property {string} password
 * @property {string} email
 * @property {"male"|"female"|"non-binary"|"prefer-not-to-say"} [gender]
 * @property {string} [bio]
 * @property {Date} [dateOfBirth]
 * @property {string} [picture]
 * @property {Date} [lastSeen]
 * @property {boolean} [emailVerified]
 * @property {Date} [emailVerifiedAt]
 * @property {boolean} [readReceiptsEnabled]
 * @property {boolean} [typingIndicatorEnabled]
 * @property {boolean} [isProfileComplete]
 */

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      require: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required."],
    },

    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
    },

    gender: {
      type: String,
      enum: ["male", "female", "non-binary", "prefer-not-to-say"],
    },

    bio: {
      type: String,
      maxlength: 200,
      trim: true,
    },

    dateOfBirth: {
      type: Date,
    },

    picture: String,

    lastSeen: Date,

    emailVerified: {
      type: Boolean,
      default: false,
    },

    emailVerifiedAt: {
      type: Date,
    },

    readReceiptsEnabled: {
      type: Boolean,
      default: true,
    },

    typingIndicatorEnabled: {
      type: Boolean,
      default: true,
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  // Only hash when the password field has been modified (or is new)
  if (!this.isModified("password")) return;

  /**
   * Hash the user's password before saving.
   * Using bcrypt.hash which returns a Promise.
   * @returns {Promise<void>}
   */
  this.password = await hash(this.password, 10);
});

/**
 * User model exported for use across the application.
 * @type {import('mongoose').Model<User>}
 */
export default mongoose.model("User", userSchema);
