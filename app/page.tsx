"use client";
import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(URL.createObjectURL(file));
  };

  return (
    <main className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-semibold mb-4">opravfotku.cz</h1>
      <p className="text-gray-500 mb-8 text-center">
        Oprav staré nebo poškozené fotky pomocí AI
      </p>

      <label className="cursor-pointer">
        <div className="bg-black text-white px-8 py-4 rounded-2xl mb-6">
          📤 Nahrát fotografii
        </div>
        <input type="file" className="hidden" onChange={handleUpload} />
      </label>

      {image && (
        <img
          src={image}
          className="w-[300px] h-[200px] object-cover rounded-xl"
        />
      )}
    </main>
  );
}