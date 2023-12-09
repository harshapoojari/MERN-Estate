import mongoose from "mongoose";

const listingSchema=new mongoose.Schema({
    
        name:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        address:{
            type:String,
            required:true
        },
        regularPrice:{
             type:Number,
             required:true
        },
        disccountPrice:{
            type:Number,
            required:true
        },
        bedrooms:{
            type:Number,
            required:true,
            
        },
        furnished:{
            type:Boolean,
            required:true
        },
        parking:{
            type:Boolean,
            required:true
        },
        placeType:{
            type:Boolean,
            required:true
            
        },
        offer:{
            type:Boolean,
            required:true
        },
        image:{
            type:Array,
            required:true
        },
        userRef:{
            type:String,
            required:true

        },
        
    
},{
    timestamps:true
}
)

const Listing=mongoose.model("Listing",listingSchema);
export default Listing;