import { useState } from "react";

export default function ProductImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-16 h-16 bg-gray-100 rounded-md relative overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
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
