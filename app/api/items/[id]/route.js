import connectMongoDB from "@/libs/mongodb";
import {NextResponse} from "next/server";
import Item from "@/models/item";

export async function PUT(request, {params}) {
    const {id} = params;
    const {newName:name,newType:type,newPrice:price,newImage:image,newAvailable:available} = await request.json();
    try {
        await connectMongoDB();
        await Item.findByIdAndUpdate(id,{name,type,price,image,available});
        return NextResponse.json({message: "item updated"});
    } catch (error) {
        console.log(error)
        return NextResponse.json(error); 
    }
}

export async function GET(request, {params}) {
    const {id} = params;
    try {
        await connectMongoDB();
        const item = await Item.findOne({_id:id});
        return NextResponse.json({item});
    } catch (error) {
        console.log(error);
        return NextResponse.json(error);
    }
}