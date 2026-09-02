import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1512632578888-169bbbc64f33?q=80&w=1600')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <div className="max-w-4xl text-white">
          <h1 className="mb-6 text-5xl font-bold md:text-7xl">
            Karnataka State Haj Committee
          </h1>

          <p className="mb-8 text-lg md:text-2xl">
            Serving pilgrims with guidance, training, and continuous
            improvement through structured Hajj feedback.
          </p>

          <Link
            to="/feedback"
            className="rounded-full bg-yellow-500 px-8 py-4 text-lg font-semibold text-green-900 transition hover:bg-yellow-400"
          >
            Submit Feedback
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;