// export const navigation = {
//     categories: [
//       {
//         id: 'women',
//         name: 'Women',
//         featured: [
//           {
//             name: 'New Arrivals',
//             href: '/',
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
//             imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
//           },
//           {
//             name: 'Basic Tees',
//             href: '/',
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
//             imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
//           },
//         ],
//         sections: [
//           {
//             id: 'clothing',
//             name: 'Clothing',
//             items: [
//               { name: 'Tops', id:"top", href: `{women/clothing/tops}` },
//               { name: 'Dresses', id:"women_dress", href: '#' },
//               { name: 'Women Jeans', id: 'women_jeans' },
//               { name: 'Lengha Choli', id: 'lengha_choli' },
//               { name: 'Sweaters', id: 'sweater' },
//               { name: 'T-Shirts', id: 't-shirt' },
//               { name: 'Jackets', id: 'jacket' },
//               { name: 'Gouns', id: 'gouns' },
//               { name: 'Sarees', id: 'saree' },
//               { name: 'Kurtas', id: 'kurtas' },
//             ],
//           },
//           {
//             id: 'accessories',
//             name: 'Accessories',
//             items: [
//               { name: 'Watches', id: 'watch' },
//               { name: 'Wallets', id: 'wallet' },
//               { name: 'Bags', id: 'bag' },
//               { name: 'Sunglasses', id: 'sunglasse' },
//               { name: 'Hats', id: 'hat' },
//               { name: 'Belts', id: 'belt' },
//             ],
//           },
//           {
//             id: 'brands',
//             name: 'Brands',
//             items: [
//               { name: 'Full Nelson', id: '#' },
//               { name: 'My Way', id: '#' },
//               { name: 'Re-Arranged', id: '#' },
//               { name: 'Counterfeit', id: '#' },
//               { name: 'Significant Other', id: '#' },
//             ],
//           },
//         ],
//       },
//       {
//         id: 'men',
//         name: 'Men',
//         featured: [
//           {
//             name: 'New Arrivals',
//             id: '#',
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
//             imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
//           },
//           {
//             name: 'Artwork Tees',
//             id: '#',
//             imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-06.jpg',
//             imageAlt:
//               'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
//           },
//         ],
//         sections: [
//           {
//             id: 'clothing',
//             name: 'Clothing',
//             items: [
//               { name: 'Mens Kurtas', id: 'mens_kurta' },
//               { name: 'Shirt', id: 'shirt' },
//               { name: 'Men Jeans', id: 'men_jeans' },
//               { name: 'Sweaters', id: '#' },
//               { name: 'T-Shirts', id: 't-shirt' },
//               { name: 'Jackets', id: '#' },
//               { name: 'Activewear', id: '#' },

//             ],
//           },
//           {
//             id: 'accessories',
//             name: 'Accessories',
//             items: [
//               { name: 'Watches', id: '#' },
//               { name: 'Wallets', id: '#' },
//               { name: 'Bags', id: '#' },
//               { name: 'Sunglasses', id: '#' },
//               { name: 'Hats', id: '#' },
//               { name: 'Belts', id: '#' },
//             ],
//           },
//           {
//             id: 'brands',
//             name: 'Brands',
//             items: [
//               { name: 'Re-Arranged', id: '#' },
//               { name: 'Counterfeit', id: '#' },
//               { name: 'Full Nelson', id: '#' },
//               { name: 'My Way', id: '#' },
//             ],
//           },
//         ],
//       },
//     ],
//     pages: [
//       { name: 'Company', id: '/' },
//       { name: 'Stores', id: '/' },
//     ],
//   }

export const navigation = {
  categories: [
    {
      id: 'clothing',
      name: 'Clothing',
      featured: [
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-01.jpg',
          imageAlt: 'Models wearing latest arrivals.',
        },
        {
          name: 'Ethnic Styles',
          href: '/',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/mega-menu-category-02.jpg',
          imageAlt: 'Ethnic clothing collection.',
        },
      ],
      sections: [
        {
          id: 'women_clothing',
          name: 'Women Accessories',
          items: [
            { name: 'Tops', id: 'top', href: '/clothing/women/tops' },
            { name: 'Dresses', id: 'women_dress', href: '/clothing/women/dresses' },
            { name: 'Women Jeans', id: 'women_jeans', href: '/clothing/women/jeans' },
            { name: 'Lehenga Choli', id: 'lehenga_choli', href: '/clothing/women/lehenga-choli' },
            { name: 'Sweaters', id: 'sweater', href: '/clothing/women/sweaters' },
            { name: 'T-Shirts', id: 'tshirt', href: '/clothing/women/t-shirts' },
            { name: 'Jackets', id: 'jacket', href: '/clothing/women/jackets' },
            { name: 'Gowns', id: 'gowns', href: '/clothing/women/gowns' },
            { name: 'Sarees', id: 'saree', href: '/clothing/women/sarees' },
            { name: 'Kurtas', id: 'kurtas', href: '/clothing/women/kurtas' },
          ],
        },
        {
          id: 'men_clothing',
          name: 'Men Accessories',
          items: [
            { name: 'Shirts', id: 'shirts', href: '/clothing/men/shirts' },
            { name: 'T-Shirts', id: 'tshirts', href: '/clothing/men/t-shirts' },
            { name: 'Jeans', id: 'jeans', href: '/clothing/men/jeans' },
            { name: 'Trousers', id: 'trousers', href: '/clothing/men/trousers' },
            { name: 'Sweaters', id: 'sweaters', href: '/clothing/men/sweaters' },
            { name: 'Jackets', id: 'jackets', href: '/clothing/men/jackets' },
            { name: 'Blazers', id: 'blazers', href: '/clothing/men/blazers' },
            { name: 'Kurta Pajama', id: 'kurta_pajama', href: '/clothing/men/kurta-pajama' },
            { name: 'Suits', id: 'suits', href: '/clothing/men/suits' },
            { name: 'Shorts', id: 'shorts', href: '/clothing/men/shorts' },
          ]

        },
        {
          id: 'kids_clothing',
          name: 'Kids Clothing',
          items: [
            { name: 'T-Shirts', id: 'kids_tshirts', href: '/clothing/kids/t-shirts' },
            { name: 'Shirts', id: 'kids_shirts', href: '/clothing/kids/shirts' },
            { name: 'Jeans', id: 'kids_jeans', href: '/clothing/kids/jeans' },
            { name: 'Shorts', id: 'kids_shorts', href: '/clothing/kids/shorts' },
            { name: 'Dresses (Girls)', id: 'kids_dresses', href: '/clothing/kids/dresses' },
            { name: 'Skirts', id: 'kids_skirts', href: '/clothing/kids/skirts' },
            { name: 'Sweaters', id: 'kids_sweaters', href: '/clothing/kids/sweaters' },
            { name: 'Jackets', id: 'kids_jackets', href: '/clothing/kids/jackets' },
            { name: 'Ethnic Wear', id: 'kids_ethnic', href: '/clothing/kids/ethnic-wear' },
            { name: 'Nightwear', id: 'kids_nightwear', href: '/clothing/kids/nightwear' },
          ]

        },

      ],
    },
    {
      id: 'footwear',
      name: 'Footwear',
      featured: [
        {
          name: 'Latest Sneakers',
          href: '/footwear/sneakers',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-04-detail-product-shot-01.jpg',
          imageAlt: 'Trendy sneakers for casual wear.',
        },
        {
          name: 'Formal Shoes',
          href: '/footwear/formal',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-02-image-card-01.jpg',
          imageAlt: 'Elegant formal leather shoes.',
        },
      ],
      sections: [
        {
          id: 'types',
          name: 'Types',
          items: [
            { name: 'Sneakers', id: 'sneakers', href: '/footwear/sneakers' },
            { name: 'Casual Shoes', id: 'casual', href: '/footwear/casual' },
            { name: 'Formal Shoes', id: 'formal', href: '/footwear/formal' },
            { name: 'Sandals & Floaters', id: 'sandals', href: '/footwear/sandals' },
            { name: 'Flip Flops', id: 'flipflops', href: '/footwear/flip-flops' },
            { name: 'Sports Shoes', id: 'sports', href: '/footwear/sports' },
            { name: 'Boots', id: 'boots', href: '/footwear/boots' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Nike', id: 'nike', href: '/footwear/brand/nike' },
            { name: 'Adidas', id: 'adidas', href: '/footwear/brand/adidas' },
            { name: 'Puma', id: 'puma', href: '/footwear/brand/puma' },
            { name: 'Bata', id: 'bata', href: '/footwear/brand/bata' },
            { name: 'Woodland', id: 'woodland', href: '/footwear/brand/woodland' },
          ],
        },
      ],
    }
, 
{
  id: 'home_kitchen',
  name: 'Home & Kitchen',
  featured: [
    {
      name: 'Modern Home Decor',
      href: '/home-kitchen/home-decor',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
      imageAlt: 'Beautifully decorated modern living room interior.',
    },
    {
      name: 'Essential Utilities',
      href: '/home-kitchen/household-utilities',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Useful home and kitchen tools neatly arranged on a counter.',
    },
  ],
  sections: [
    {
      id: 'home_decor',
      name: 'Home Decor',
      items: [
        { name: 'Wall Art & Paintings', id: 'wall_art', href: '/home-kitchen/home-decor/wall-art' },
        { name: 'Vases & Planters', id: 'vases_planters', href: '/home-kitchen/home-decor/vases-planters' },
        { name: 'Candles & Fragrances', id: 'candles_fragrances', href: '/home-kitchen/home-decor/candles-fragrances' },
        { name: 'Decorative Lights', id: 'decorative_lights', href: '/home-kitchen/home-decor/lights' },
        { name: 'Clocks & Mirrors', id: 'clocks_mirrors', href: '/home-kitchen/home-decor/clocks-mirrors' },
      ],
    },
    {
      id: 'kitchen_dining',
      name: 'Kitchen & Dining',
      items: [
        { name: 'Cookware', id: 'cookware', href: '/home-kitchen/kitchen-dining/cookware' },
        { name: 'Dinnerware', id: 'dinnerware', href: '/home-kitchen/kitchen-dining/dinnerware' },
        { name: 'Glassware', id: 'glassware', href: '/home-kitchen/kitchen-dining/glassware' },
        { name: 'Cutlery', id: 'cutlery', href: '/home-kitchen/kitchen-dining/cutlery' },
        { name: 'Serveware', id: 'serveware', href: '/home-kitchen/kitchen-dining/serveware' },
      ],
    },
    {
      id: 'household_utilities',
      name: 'Household Utilities',
      items: [
        { name: 'Storage & Organizers', id: 'storage_organizers', href: '/home-kitchen/household-utilities/storage-organizers' },
        { name: 'Cleaning Supplies', id: 'cleaning_supplies', href: '/home-kitchen/household-utilities/cleaning-supplies' },
        { name: 'Laundry Essentials', id: 'laundry_essentials', href: '/home-kitchen/household-utilities/laundry' },
        { name: 'Home Tools & Hardware', id: 'home_tools', href: '/home-kitchen/household-utilities/tools' },
      ],
    },
    {
      id: 'furnishings',
      name: 'Furnishings',
      items: [
        { name: 'Bedsheets & Bedding', id: 'bedsheets', href: '/home-kitchen/furnishings/bedsheets' },
        { name: 'Curtains & Blinds', id: 'curtains', href: '/home-kitchen/furnishings/curtains' },
        { name: 'Cushions & Covers', id: 'cushions', href: '/home-kitchen/furnishings/cushions' },
        { name: 'Carpets & Rugs', id: 'carpets', href: '/home-kitchen/furnishings/carpets' },
      ],
    },
  ],
}
,
{
  id: 'electronics',
  name: 'Electronics',
  featured: [
    {
      name: 'Top Smartphones',
      href: '/electronics/mobiles',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-01-image-card-01.jpg',
      imageAlt: 'Latest smartphones collection.',
    },
    {
      name: 'Smart Wearables',
      href: '/electronics/wearables',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
      imageAlt: 'Smartwatches and fitness bands.',
    },
  ],
  sections: [
    {
      id: 'mobiles',
      name: 'Mobiles & Tablets',
      items: [
        { name: 'Smartphones', id: 'smartphones', href: '/electronics/mobiles' },
        { name: 'Tablets', id: 'tablets', href: '/electronics/tablets' },
        { name: 'Mobile Accessories', id: 'mobile_accessories', href: '/electronics/mobile-accessories' },
      ],
    },
    {
      id: 'laptops',
      name: 'Laptops & Computers',
      items: [
        { name: 'Laptops', id: 'laptops', href: '/electronics/laptops' },
        { name: 'Gaming Laptops', id: 'gaming_laptops', href: '/electronics/gaming-laptops' },
        { name: 'Monitors', id: 'monitors', href: '/electronics/monitors' },
        { name: 'Computer Accessories', id: 'computer_accessories', href: '/electronics/computer-accessories' },
      ],
    },
    {
      id: 'wearables',
      name: 'Wearables',
      items: [
        { name: 'Smartwatches', id: 'smartwatches', href: '/electronics/smartwatches' },
        { name: 'Headphones', id: 'headphones', href: '/electronics/headphones' },
        { name: 'Earbuds', id: 'earbuds', href: '/electronics/earbuds' },
        { name: 'Fitness Bands', id: 'fitness_bands', href: '/electronics/fitness-bands' },
      ],
    },
    {
      id: 'home_appliances',
      name: 'Home Appliances',
      items: [
        { name: 'Televisions', id: 'televisions', href: '/electronics/televisions' },
        { name: 'Speakers', id: 'speakers', href: '/electronics/speakers' },
        { name: 'Refrigerators', id: 'refrigerators', href: '/electronics/refrigerators' },
        { name: 'Washing Machines', id: 'washing_machines', href: '/electronics/washing-machines' },
      ],
    },
  ],
},
{
  id: 'beauty_wellness',
  name: 'Beauty & Wellness',
  featured: [
    {
      name: 'Skincare Essentials',
      href: '/beauty-wellness/skincare',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-01.jpg',
      imageAlt: 'Assorted skincare products.',
    },
    {
      name: 'Makeup Collection',
      href: '/beauty-wellness/makeup',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-02.jpg',
      imageAlt: 'Premium makeup essentials.',
    },
  ],
  sections: [
    {
      id: 'skincare',
      name: 'Skincare',
      items: [
        { name: 'Moisturizers', id: 'moisturizers', href: '/beauty-wellness/skincare/moisturizers' },
        { name: 'Face Wash', id: 'facewash', href: '/beauty-wellness/skincare/face-wash' },
        { name: 'Sunscreens', id: 'sunscreens', href: '/beauty-wellness/skincare/sunscreens' },
        { name: 'Serums', id: 'serums', href: '/beauty-wellness/skincare/serums' },
      ],
    },
    {
      id: 'makeup',
      name: 'Makeup',
      items: [
        { name: 'Lipsticks', id: 'lipsticks', href: '/beauty-wellness/makeup/lipsticks' },
        { name: 'Foundations', id: 'foundations', href: '/beauty-wellness/makeup/foundations' },
        { name: 'Eye Makeup', id: 'eye_makeup', href: '/beauty-wellness/makeup/eye-makeup' },
        { name: 'Nail Polish', id: 'nail_polish', href: '/beauty-wellness/makeup/nail-polish' },
      ],
    },
    {
      id: 'haircare',
      name: 'Haircare',
      items: [
        { name: 'Shampoos', id: 'shampoos', href: '/beauty-wellness/haircare/shampoos' },
        { name: 'Conditioners', id: 'conditioners', href: '/beauty-wellness/haircare/conditioners' },
        { name: 'Hair Oils', id: 'hair_oils', href: '/beauty-wellness/haircare/hair-oils' },
        { name: 'Hair Styling', id: 'hair_styling', href: '/beauty-wellness/haircare/hair-styling' },
      ],
    },
    {
      id: 'wellness',
      name: 'Wellness',
      items: [
        { name: 'Vitamins & Supplements', id: 'vitamins', href: '/beauty-wellness/wellness/vitamins' },
        { name: 'Ayurveda', id: 'ayurveda', href: '/beauty-wellness/wellness/ayurveda' },
        { name: 'Personal Hygiene', id: 'personal_hygiene', href: '/beauty-wellness/wellness/personal-hygiene' },
        { name: 'Health Devices', id: 'health_devices', href: '/beauty-wellness/wellness/health-devices' },
      ],
    },
  ],
},{
  id: 'accessories_more',
  name: 'Accessories & More',
  featured: [
    {
      name: 'Premium Watches',
      href: '/accessories/watches',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-03.jpg',
      imageAlt: 'Stylish men’s and women’s watches.',
    },
    {
      name: 'Trendy Bags',
      href: '/accessories/bags',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-page-05-related-product-04.jpg',
      imageAlt: 'Latest handbags and backpacks.',
    },
  ],
  sections: [
    {
      id: 'watches',
      name: 'Watches',
      items: [
        { name: 'Analog Watches', id: 'analog_watches', href: '/accessories/watches/analog' },
        { name: 'Digital Watches', id: 'digital_watches', href: '/accessories/watches/digital' },
        { name: 'Smartwatches', id: 'smartwatches', href: '/accessories/watches/smart' },
      ],
    },
    {
      id: 'bags_wallets',
      name: 'Bags & Wallets',
      items: [
        { name: 'Backpacks', id: 'backpacks', href: '/accessories/bags/backpacks' },
        { name: 'Handbags', id: 'handbags', href: '/accessories/bags/handbags' },
        { name: 'Wallets', id: 'wallets', href: '/accessories/bags/wallets' },
        { name: 'Clutches', id: 'clutches', href: '/accessories/bags/clutches' },
      ],
    },
    {
      id: 'jewellery',
      name: 'Jewellery',
      items: [
        { name: 'Earrings', id: 'earrings', href: '/accessories/jewellery/earrings' },
        { name: 'Necklaces', id: 'necklaces', href: '/accessories/jewellery/necklaces' },
        { name: 'Bracelets', id: 'bracelets', href: '/accessories/jewellery/bracelets' },
        { name: 'Rings', id: 'rings', href: '/accessories/jewellery/rings' },
      ],
    },
    {
      id: 'belts_sunglasses',
      name: 'Belts & Sunglasses',
      items: [
        { name: 'Belts', id: 'belts', href: '/accessories/belts' },
        { name: 'Sunglasses', id: 'sunglasses', href: '/accessories/sunglasses' },
        { name: 'Caps & Hats', id: 'caps_hats', href: '/accessories/caps-hats' },
        { name: 'Scarves & Stoles', id: 'scarves', href: '/accessories/scarves-stoles' },
      ],
    },
  ],
}



  ],
  pages: [
    { name: 'Company', id: '/' },
    { name: 'Stores', id: '/' },
  ],
};
