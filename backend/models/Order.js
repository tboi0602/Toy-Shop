import mongoose from "mongoose";
const OrderSchema = new mongoose.Schema({
    orderId:{type: String, required: true, unique: true},
    userId:{type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    items:[{
        productId:{type: String, required:true},
        productName: String,
        image: String,
        oldPrice: Number,
        salePrice: Number,
        buyQuantity:{
            type: Number,
            default:1,
        },
    },],

    createAt:{
        type:Date,
        default:Date.now,
    },
    status:String,
    total:{type:Number, default: 0},
});
OrderSchema.set("toJSON", {
    transform: function (doc, ret) {
    delete ret.__v;
    },
});

export default mongoose.model("Order", OrderSchema);
