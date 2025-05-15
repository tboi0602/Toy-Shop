  import mongoose from "mongoose";

  // Product Schema
  const notiSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: true },
        content: { type: String, required: true, unique: true },   
    }
  );

  notiSchema.set("toJSON", {
    transform: function (doc, ret) {
      delete ret.__v;
    },
  });

  export default mongoose.model("Notification", notiSchema);
