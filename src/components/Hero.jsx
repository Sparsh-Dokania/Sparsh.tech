export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center bg-gradient-to-b from-blue-50 to-white"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900">
        Hi, I'm <span className="text-blue-600">Sparsh</span> 👋
      </h1>
      <p className="mt-6 text-lg md:text-2xl text-gray-600 max-w-xl">
        A passionate developer crafting creative digital experiences with
        modern web technologies.
      </p>
      <a
        href="#projects"
        className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        See My Work
      </a>
    </section>
  );
}
