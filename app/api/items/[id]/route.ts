import { NextResponse } from "next/server";
import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/item";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { id } = params;
        const { newName, newType, newImage, newPrice, newAvailable } = await request.json();
        console.log('Updating item:', id, 'with data:', { newName, newType, newImage, newPrice, newAvailable });

        await connectMongoDB();
        
        const updatedItem = await Item.findByIdAndUpdate(
            id,
            {
                name: newName,
                type: newType,
                image: newImage,
                price: Number(newPrice),
                available: Boolean(newAvailable)
            },
            { new: true, runValidators: true }
        );

        if (!updatedItem) {
            console.log('Item not found:', id);
            return NextResponse.json(
                { message: "Item not found" },
                { status: 404 }
            );
        }

        console.log('Item updated successfully:', updatedItem);
        return NextResponse.json(
            { message: "Item updated", item: updatedItem },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Error updating item:', error);
        return NextResponse.json(
            { message: error.message || "Error updating item" },
            { status: 500 }
        );
    }
} 