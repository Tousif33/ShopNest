import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        productName:{type:String , required:true},
        productDesc:{type:String , required:true},

        productImg:[
            {
                url:{type:String , required:true},
                public_id :{type:String , required:true},
  
            }
        ],
       productPrice :{type:Number},
       category:{type:String},
       stock:{type:Number,required:true},
       brand:{type:String}

    },
     {timestamps:true}
)
  
export const Product = mongoose.model("Product",productSchema)