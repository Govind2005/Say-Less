'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Add() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        type: "",
        image: "",
        price: "",
        available: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('/api/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    available: formData.available.toLowerCase() === 'true'
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add item');
            }

            // Clear form and redirect
            setFormData({
                name: "",
                type: "",
                image: "",
                price: "",
                available: ""
            });

            router.refresh(); // Refresh the page data
            router.push('/'); // Redirect to home page or items list
            
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add item. Please try again.');
        }
    };

    return (
        <div className="bg-blue-50 p-32">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    className="border border-slate-500 px-8 py-2" 
                    type="text"
                    placeholder="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input 
                    className="border border-slate-500 px-8 py-2" 
                    type="text"
                    placeholder="Type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                />
                <input 
                    className="border border-slate-500 px-8 py-2" 
                    type="text"
                    placeholder="Image"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    required
                />
                <input 
                    className="border border-slate-500 px-8 py-2" 
                    type="number"
                    placeholder="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                />
                <select
                    className="border border-slate-500 px-8 py-2"
                    name="available"
                    value={formData.available}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select availability</option>
                    <option value="true">Available</option>
                    <option value="false">Not Available</option>
                </select>
                <button 
                    type="submit"
                    className="bg-green-600 font-bold text-white py-3 px-6 w-fit hover:bg-green-700 transition-colors"
                >
                    Add
                </button>
            </form>
        </div>
    );
}