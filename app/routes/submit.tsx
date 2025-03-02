import { useState, useEffect } from "react";
import { Form, Link } from "@remix-run/react";

export default function SubmitModPage() {
  const [modName, setModName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Scripts");
  const [modFile, setModFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<File | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [price, setPrice] = useState("");
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreviewImage(file);
      const url = URL.createObjectURL(file);
      setPreviewImageUrl(url);
    }
  };

  const categories = ["Scripts", "Vehicles", "Maps", "UI", "Other"];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Submit a Mod</h1>
        <Link 
          to="/ai"
          className="text-primary hover:text-primary/90 flex items-center space-x-2"
        >
          <span>Ask AI</span>
        </Link>
      </div>
      
      <Form 
        className="max-w-lg mx-auto"
        encType="multipart/form-data"
      >
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Mod Name</label>
          <input 
            type="text" 
            value={modName}
            onChange={(e) => setModName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter mod name"
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Describe your mod"
            rows={4}
            required 
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-semibold">Category</label>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {isClient && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Preview Image</label>
            <input 
              type="file" 
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded"
              accept="image/*"
            />
            {previewImageUrl && (
              <img 
                src={previewImageUrl} 
                alt="Preview" 
                className="mt-2 max-w-full h-auto rounded"
              />
            )}
          </div>
        )}

        <div className="mb-4">
          <label className="flex items-center space-x-2">
            <input 
              type="checkbox"
              checked={isPaid}
              onChange={(e) => setIsPaid(e.target.checked)}
              className="rounded"
            />
            <span>Paid Mod</span>
          </label>
          
          {isPaid && (
            <div className="mt-2">
              <input 
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price in EUR"
                className="w-full px-4 py-2 border rounded"
                step="0.01"
                min="0"
              />
            </div>
          )}
        </div>

        {isClient && (
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Mod File</label>
            <input 
              type="file" 
              onChange={(e) => setModFile(e.target.files?.[0] || null)}
              className="w-full px-4 py-2 border rounded"
              accept=".zip,.rar,.7z"
              required 
            />
          </div>
        )}

        <button 
          type="submit" 
          className="w-full bg-primary text-primary-foreground py-2 rounded hover:bg-primary/90 transition"
        >
          Submit Mod
        </button>
      </Form>
    </div>
  );
}
