import mongoose, { Schema, Document } from "mongoose";

export interface ILead extends Document {

  name: string;

  email: string;

  company: string;

  status: "new" | "contacted" | "qualified" | "lost";

  source: "linkedin" | "website" | "referral";

  assignedTo?: mongoose.Types.ObjectId;

}

const leadSchema = new Schema<ILead>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new",
    },

    source: {
      type: String,
      enum: ["linkedin", "website", "referral"],
      required: true,
    },

    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model<ILead>("Lead", leadSchema);

export default Lead;