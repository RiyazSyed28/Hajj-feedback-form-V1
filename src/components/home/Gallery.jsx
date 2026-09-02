export default function Gallery() {

  const images = [
  "/img1.jpeg",
  "/img2.jpeg",
  "/img3.jpeg",
  "/img4.jpeg",
];

  return (
    <section className="py-24 bg-gray-100">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-center text-4xl font-bold text-green-800 mb-16">
          Gallery
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {images.map((img, index) => (

            <img
              key={index}
              src={`${img}?auto=format&fit=crop&w=700&q=80`}
              className="rounded-xl shadow-lg hover:scale-105 duration-300"
            />

          ))}

        </div>

      </div>

    </section>
  );
}