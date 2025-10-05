import React from "react";

const products = [
  {
    id: 1,
    name: "Auto Accessories",
    color: "Black",
    price: "59",
    href: "#",
    imageSrc:
      "https://rukminim3.flixcart.com/image/228/228/xif0q/vehicle-lubricant/6/y/m/300-bike-chain-lubricant-and-chain-cleaner-spray-with-cleaning-original-imahe6uhayjvzqdf.jpeg?q=60",
    imageAlt: "Front of men's Basic Tee in black.",
  },
  {
    id: 2,
    name: "Travel Bags",
    color: "Aspen White",
    price: "150",
    href: "#",
    imageSrc:
      "https://rukminim3.flixcart.com/image/228/228/xif0q/duffel-bag/a/2/c/20-derben-turq-polyester-cabin-size-luggage-duffle-strolley-bag-original-imagbx23hfywe34c.jpeg?q=60",
    imageAlt: "Front of men's Basic Tee in white.",
  },
  {
    id: 3,
    name: "Men's T shirt",
    color: "Charcoal",
    price: "56",
    href: "#",
    imageSrc:
      "https://rukminim3.flixcart.com/image/228/228/xif0q/shopsy-t-shirt/u/x/q/m-rm-polo-004-aksa-original-imah6h3jxeyueunv.jpeg?q=60",
    imageAlt: "Front of men's Basic Tee in dark gray.",
  },
  {
    id: 4,
    name: "School Bags",
    color: "Iso Dots",
    price: "106",
    href: "#",
    imageSrc:
      "https://rukminim3.flixcart.com/image/228/228/xif0q/shopsy-bag/m/3/5/41-kids-disney-princes-s-school-backpack-bag-for-baby-girls-boys-original-imahfhpqw6g9hf3d.jpeg?q=60",
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
      "https://rukminim3.flixcart.com/image/228/228/xif0q/top/3/v/x/xl-1-won1153-womenishkurti-original-imahckxtyfssfgsx.jpeg?q=60",
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
      "https://rukminim3.flixcart.com/image/228/228/xif0q/shopsy-headphone/5/7/u/bluetooth-yes-anc-true-wireless-active-bluetooth-headphones-original-imahb2drfkemutua.jpeg?q=60",
    imageAlt:
      "Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube.",
  },
];

const Home4block = () => {
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

export default Home4block;
