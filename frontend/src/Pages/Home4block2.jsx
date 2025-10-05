import React from "react";

const products = [
  {
    id: 1,
    name: "Auto Accessories",
    color: "Black",
    price: "59",
    href: "#",
    imageSrc:
      "https://rukminim3.flixcart.com/image/228/228/xif0q/shopsy-sandal/g/h/8/7-fz-133-gr-40-heighten-green-original-imah4femfhgzvxha.jpeg?q=60",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 2,
    name: "Travel Bags",
    color: "Aspen White",
    price: "150",
    href: "#",
    imageSrc:
"https://rukminim3.flixcart.com/image/228/228/xif0q/shopsy-watch/w/l/c/1-db-329-coper-silver-jmh-enterprise-women-original-imahebyemyukvmvz.jpeg?q=60",
    imageAlt: "Front of men's Basic Tee in white.",
  },
  {
    id: 3,
    name: "Men's T shirt",
    color: "Charcoal",
    price: "56",
    href: "#",
    imageSrc:
      "https://rukminim3.flixcart.com/image/228/228/xif0q/watch/x/h/e/-original-imahfspuccrypye6.jpeg?q=60",
    imageAlt: "Front of men's Basic Tee in dark gray.",
  },
  {
    id: 4,
    name: "School Bags",
    color: "Iso Dots",
    price: "106",
    href: "#",
    imageSrc:
      "https://rukminim3.flixcart.com/image/228/228/xif0q/diaper/f/k/3/-original-imah6qrerbgzherk.jpeg?q=60",
    imageAlt:
      "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
  },

  {
    id: 5,
    name: "Women's Top ",
    color: "Iso Dots",
    price: "100",
    href: "#",
    imageSrc:
      "https://rukminim3.flixcart.com/image/228/228/xif0q/speaker/soundbar/u/b/g/firebar-12-2-infire-original-imah9kd9n8v5tfhp.jpeg?q=60",
    imageAlt:
      "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
  },
  {
    id: 6,
    name: "Audio Best Sellers",
    color: "Iso Dots",
    price: "190",
    href: "#",
    imageSrc:
      "https://rukminim3.flixcart.com/image/228/228/xif0q/bedsheet/r/d/v/mr1001-1-mr1001-flat-manshar-original-imah7pejkvggqhwe.jpeg?q=60",
    imageAlt:
      "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
  },
];

const Home4block2 = () => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-2 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">

        <div className="mt-6 grid grid-cols-3 gap-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="aspect-square  w-full border  rounded-md bg-white object-contain group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4">
                <div className="text-center">
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href}>
                      <span aria-hidden="true" className="absolute inset-0"></span>
                      {product.name}
                    </a>
                  </h3>
                  <p className="text-sm font-medium text-gray-900">
                  From ₹{product.price}
                </p>
                </div>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home4block2;
