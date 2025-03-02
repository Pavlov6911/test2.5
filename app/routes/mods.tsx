import React, { useState } from "react";
import { Link } from "@remix-run/react";

const mockMods = [
  {
    id: 1,
    name: "Realistic Police Vehicles",
    description: "Enhanced police vehicle pack with detailed models and sounds",
    category: "Vehicles",
    downloads: 5420,
    author: "ModCreator123",
    fileSize: "25.6 MB",
    fileType: ".zip",
    uploadDate: "2023-11-15",
    price: 0,
    previewImage: "/path/to/preview1.jpg"
  },
  {
    id: 2,
    name: "Advanced RP Interactions",
    description: "Expanded roleplay interaction system for servers",
    category: "Scripts",
    downloads: 3210,
    author: "RPDev456",
    fileSize: "12.3 MB",
    fileType: ".rar",
    uploadDate: "2023-10-22",
    price: 9.99,
    previewImage: "/path/to/preview2.jpg"
  }
  // ... other mods
];

export default function ModsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceFilter, setPriceFilter] = useState("all"); // "all", "free", "paid"

  const categories = ["All", "Vehicles", "Scripts", "Maps", "UI", "Other"];

  const filteredMods = mockMods.filter(mod => {
    const matchesSearch = mod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || mod.category === selectedCategory;
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "free" && mod.price === 0) || 
      (priceFilter === "paid" && mod.price > 0);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Mod Library</h1>
        <Link 
          to="/ai"
          className="text-primary hover:text-primary/90"
        >
          Ask AI
        </Link>
      </div>
      
      <div className="flex flex-wrap gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search mods..." 
          className="flex-grow px-4 py-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <select 
          className="px-4 py-2 border rounded"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <select
          className="px-4 py-2 border rounded"
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {filteredMods.map(mod => (
          <div 
            key={mod.id} 
            className="bg-card text-card-foreground shadow-lg rounded-lg overflow-hidden"
          >
            {mod.previewImage && (
              <img 
                src={mod.previewImage} 
                alt={mod.name} 
                className="w-full h-48 object-cover"
              />
            )}
            
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{mod.name}</h2>
                <span className={`px-2 py-1 rounded text-sm ${
                  mod.price > 0 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-green-500/10 text-green-500'
                }`}>
                  {mod.price > 0 ? `€${mod.price}` : 'Free'}
                </span>
              </div>
              
              <p className="text-muted-foreground mb-4">{mod.description}</p>
              
              <div className="space-y-2 text-sm text-muted-foreground">
                <div>Category: {mod.category}</div>
                <div>Size: {mod.fileSize}</div>
                <div>Updated: {mod.uploadDate}</div>
                <div>Downloads: {mod.downloads}</div>
              </div>
              
              <div className="mt-4 flex justify-between items-center">
                <button 
                  className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90"
                >
                  Download
                </button>
                <Link 
                  to={`/mods/${mod.id}`} 
                  className="text-primary hover:underline"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
