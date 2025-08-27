import { useState } from "react";

export default function ProductImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-40 bg-gray-200 rounded-md mb-3 relative overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover rounded-md transition-opacity duration-500 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
