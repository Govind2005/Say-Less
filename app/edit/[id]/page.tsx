import { notFound } from "next/navigation";
import EditItemForm from "@/components/EditItemForm";
import connectMongoDB from "@/libs/mongodb";
import Item from "@/models/item";

async function getItem(id: string) {
    try {
        await connectMongoDB();
        const item = await Item.findById(id);
        if (!item) return null;
        return item;
    } catch (error) {
        console.error("Error fetching item:", error);
        return null;
    }
}

export default async function EditPage({ params }: { params: { id: string } }) {
    const item = await getItem(params.id);

    if (!item) {
        return notFound();
    }

    return (
        <EditItemForm
            id={item._id.toString()}
            name={item.name}
            type={item.type}
            image={item.image}
            price={item.price}
            available={item.available}
        />
    );
} 