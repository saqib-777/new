import React from 'react';

const Hero = () => {
  return (
    <section className="bg-blue-600 text-white py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to Rescue The Voiceless</h1>
      <p className="text-lg max-w-2xl mx-auto">
        Join us in making a difference for stray animals. Adopt, volunteer, or donate today!
      </p>
      <div className="mt-6 flex justify-center space-x-4">
        <a
          href="/adopt"
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-md text-lg font-semibold transition"
        >
          Adopt Now
        </a>
        <a
          href="/donate"
          className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-md text-lg font-semibold transition"
        >
          Donate
        </a>
      </div>
    </section>
  );
};

export default Hero;
