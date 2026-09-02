const steps = [
  "Registration",
  "Training",
  "Departure",
  "Makkah",
  "Mina",
  "Arafat",
  "Muzdalifah",
  "Madinah",
  "Return",
];

export default function Timeline() {
  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-green-800 mb-16">
          Hajj Journey Timeline
        </h2>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">

          {steps.map((step, index) => (

            <div
              key={index}
              className="bg-green-50 p-6 rounded-xl text-center shadow"
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-green-700 text-white flex items-center justify-center font-bold text-xl mb-4">
                {index + 1}
              </div>

              <h3 className="font-semibold">
                {step}
              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}