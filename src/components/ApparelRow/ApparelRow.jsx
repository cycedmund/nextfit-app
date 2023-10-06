import debug from "debug";

const log = debug("nextfit:src:components:ApparelRow");

function ApparelRow({ category, apparel }) {
  const categorizedApparel = apparel.filter(
    (item) => item.mainCategory === category
  );
  log(categorizedApparel);

  return (
    <div>
      <header className="mx-4 font-inter font-thin text-2xl">{category}</header>
      <div className="grid grid-cols-5 gap-2 border-2 p-6 m-4">
        {categorizedApparel.map((item) => (
          <article className="border-white" key={item._id}>
            <div className="items-center bg-stone-400 p-2 rounded-lg shadow md:flex-row md:max-w-xl">
              <img
                className="h-auto max-w-full rounded-lg object-cover"
                src={item.imageURL}
                alt={item.subCategory}
              />
              <div className="flex flex-col justify-between p-2 leading-normal">
                <h5 className="text-lg mb-2 tracking-tight text-gray-900">
                  {item.subCategory}
                </h5>
                <p className="text-sm text-zinc-500">Fit: {item.fit}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ApparelRow;
