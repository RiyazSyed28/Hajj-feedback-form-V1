export default function Contact() {
  return (
    <section className="py-24 bg-green-800 text-white ">

      <div className="max-w-7xl mx-auto px-6">

        <div className="grid lg:grid-cols-2 gap-12">

          <div>

            <h2 className="text-4xl font-bold mb-6">
              Contact Us
            </h2>

            <p className="mb-4">
              Karnataka State Haj Committee
            </p>

            <p>Bengaluru, Karnataka</p>

            <p className="mt-2">
              Email: info@hajcommittee.in
            </p>

            <p>
              Phone: +91 XXXXX XXXXX
            </p>

          </div>

          <div>

            <form className=" bg-amber-50 p-7 border rounded-2xl space-y-5">

              <input
                className="w-full rounded-lg p-4 text-black border-b-black"
                placeholder="Your Name"
              />

              <input
                className="w-full rounded-lg p-4 text-black"
                placeholder="Email"
              />

              <textarea
                rows="5"
                className="w-full rounded-lg p-4 text-black"
                placeholder="Message"
              />

              <button
                className="bg-yellow-400 text-green-900 px-8 py-3 rounded-lg font-semibold"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}