export const LOOKBOOK_DATA = [
  {
    id: 1,
    image: "/lookbook_1.png",
    hotspots: [
      {
        id: "h1",
        x: 50, // Top center for the Hoodie
        y: 50,
        product: {
          id: 1,
          name: "HEAVYWEIGHT HOODIE // 001",
          price: 4999,
          slug: "heavyweight-hoodie-001",
          sizes: ["M", "L", "XL"],
          images: ["/product_hoodie_1.png"]
        }
      }
    ]
  },
  {
    id: 2,
    image: "/lookbook_2.png",
    hotspots: [
      {
        id: "h2",
        x: 45, // Top of the Cargo Pants
        y: 65,
        product: {
          id: 4,
          name: "CARGO PANTS // V2",
          price: 5999,
          slug: "cargo-pants-v2",
          sizes: ["30", "32", "34"],
          images: ["/product_pants_1.png"]
        }
      }
    ]
  },
  {
    id: 3,
    image: "/lookbook_3.png",
    hotspots: [
      {
        id: "h3",
        x: 50, // Top of the Boxy Tee
        y: 40,
        product: {
          id: 2,
          name: "BOXY TEE // CORE",
          price: 2499,
          slug: "boxy-tee-core",
          sizes: ["S", "M", "L"],
          images: ["/product_tee_1.png"]
        }
      },
      {
        id: "h4",
        x: 60, // Positioned for Utility Bag
        y: 60,
        product: {
          id: 5,
          name: "UTILITY BAG // 001",
          price: 3499,
          slug: "utility-bag-001",
          sizes: ["OS"],
          images: ["/product_bag_1.png"]
        }
      }
    ]
  }
];
