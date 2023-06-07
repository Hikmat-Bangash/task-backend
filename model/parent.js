import mongoose from "mongoose";

const ParentSchema = new mongoose.Schema(
  {
    parentId: {
      type: Number,
      unique: true,
      index: true,
      required: true,
    },
    sender: {
      type: String,
      required: [true, "sender name is required"],
    },
    receiver: {
      type: String,
      required: [true, "receiver name is required"],
    },
    TotalAmount: {
      type: Number,
      required: true,
    },
    TotalPaidAmount: {
      type: [
        {
          childId: { type: Number },
          sender: {
            type: String,
          },
          receiver: {
            type: String,
          },
          TotalAmount: {
            type: Number,
          },
          installment: {
            type: Number,
          },
        },
      ],
    },
  },
  { timestamps: true }
);


export const ParentModel =
  mongoose.models.parent ||
  mongoose.model ("parent", ParentSchema);