  import mongoose from "mongoose";

  // Product Schema
  const productSchema = new mongoose.Schema(
    {
      productId: { type: String, required: true, unique: true },
      productName: { type: String, required: true, unique: true },
      saleprice: { type: Number },
      oldprice: { type: Number },  
      sales: { type: Number},
      image: { type: String},
      saleQuantity:   {type: Number, default: 0},
      quantity:{type: Number, default:0},
      description: { type: String },
      isUsing: {type: Boolean, default: true},
    }
  );

  productSchema.set("toJSON", {
    transform: function (doc, ret) {
      delete ret.__v;
    },
  });

  export default mongoose.model("Product", productSchema);
