'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Item {
    _id: string;
    name: string;
    type: string;
    image: string;
    price: number;
    available: boolean;
}

interface EditItemFormProps {
    id: string;
    name: string;
    type: string;
    image: string;
    price: number;
    available: boolean;
}

export default function EditItemForm({ id, name, type, image, price, available }: EditItemFormProps) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        newName: name || '',
        newType: type || '',
        newImage: image || '',
        newPrice: price || 0,
        newAvailable: available || false
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Submitting form with data:', formData);
        console.log('Item ID:', id);

        try {
            const res = await fetch(`/api/items/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log('Response:', data);

            if (!res.ok) {
                throw new Error(data.message || "Failed to update item");
            }

            alert('Item updated successfully!');
            router.refresh();
            router.push('/');
        } catch (error: any) {
            console.error('Error details:', error);
            alert(error.message || 'Failed to update item');
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const updatedValue = name === 'newPrice' ? Number(value) : 
                           name === 'newAvailable' ? value === 'true' : 
                           value;
                           
        console.log(`Updating ${name} to:`, updatedValue);
        
        setFormData(prev => ({
            ...prev,
            [name]: updatedValue
        }));
    };

    return (
        <div className="bg-blue-50">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-32">
                <input
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Name"
                    name="newName"
                    value={formData.newName}
                    onChange={handleChange}
                    required
                />
                <input 
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Type"
                    name="newType"
                    value={formData.newType}
                    onChange={handleChange}
                    required
                />
                <input 
                    className="border border-slate-500 px-8 py-2"
                    type="text"
                    placeholder="Image URL"
                    name="newImage"
                    value={formData.newImage}
                    onChange={handleChange}
                    required
                />
                <input 
                    className="border border-slate-500 px-8 py-2"
                    type="number"
                    placeholder="Price"
                    name="newPrice"
                    value={formData.newPrice}
                    onChange={handleChange}
                    required
                />
                <select
                    className="border border-slate-500 px-8 py-2"
                    name="newAvailable"
                    value={String(formData.newAvailable)}
                    onChange={handleChange}
                    required
                >
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
                <button 
                    type="submit"
                    className="bg-green-600 font-bold text-white py-3 px-6 w-fit hover:bg-green-700"
                >
                    Update Item
                </button>
            </form>
        </div>
    );
}
