import connectMongoDB from "@/libs/mongodb"
import {NextResponse} from "next/server";
import Item from "@/models/item";

export async function POST(request) {
    try {
        const {name,type,price,image,available} = await request.json();
        await connectMongoDB();
        await Item.create({name,price,type,image,available});
        return NextResponse.json({message:name}) 
    } catch (error) {
        console.log("well it's here " + error);
        return NextResponse.json({message:"once more"});
    }
}

export async function GET() {
    console.log("getting")
    try {
        await connectMongoDB();
        const items = await Item.find();
        return NextResponse.json(items);
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"once more"});
    }
}

export async function DELETE(request) {
    const id = request.nextUrl.searchParams.get("id");
    try {
        await connectMongoDB();
        await Item.findByIdAndDelete(id);
        return NextResponse.json({message: "deleted"})
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"once more"});
    }
}