import { HashLink as Link } from 'react-router-hash-link';

export default function HomeWardrobe({ apparel }) {
  const categoryImages = [
    {
      category: 'Top',
      image: '/assets/tops-category.jpg',
    },
    {
      category: 'Bottom',
      image: '/assets/bottoms-category.jpg',
    },
    {
      category: 'Outerwear',
      image: '/assets/outerwear-category.png',
    },
    {
      category: 'Overall',
      image: '/assets/overalls-category.png',
    },
  ];

  const categoryExists = (category) => {
  const exists = apparel.some((item) => item.mainCategory === category);
  return exists;
};

  return (
    <>
      <h1 className="ml-24 mt-4 text-2xl">My Wardrobe</h1>
      <div className="ml-24 mt-6 flex -mb-10">
        {categoryImages.map(({ category, image }, index) => (
          <div key={category} className="mr-4 text-center group relative">
            {categoryExists(category) ? (
              <Link to={`/wardrobe/#${category}`}>
                <div className="transform group-hover:scale-105">
                  <img
                    src={image}
                    alt={category}
                    className="inline cursor-pointer w-72 h-44 rounded object-cover"
                  />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div className="border border-black px-4 py-2 bg-black text-white text-base">
                      {category}{"s"}
                    </div>
                  </div>
                </div>
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </>
  );
}

