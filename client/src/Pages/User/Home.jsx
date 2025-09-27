import { useEffect } from "react";
import portrait from "../../assets/portrait.jpg";
import { NavLink } from "react-router-dom";
import { data } from "../data.js";

function Home() {
  useEffect(() => {
    document.title = "Home | Deepak Bhanari Portfolio";
  }, []);

  return (
    <main className="min-h-screen w-screen flex p-12 flex-col gap-12 items-center justify-around bg-primary dark:bg-bg  px-4 sm:px-8">
      {/* Profile Image */}
      <div>
        <img
          src={portrait}
          alt="Deepak Bhanari Portrait"
          className="h-60 w-60 rounded-full bg-white dark:bg-card object-cover shadow-lg transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Heading + About */}
      <div className="flex flex-col gap-6 items-center text-center max-w-3xl">
        <h1 className="font-head font-bold text-3xl sm:text-4xl md:text-5xl text-black dark:text-primary leading-snug">
          I do code and make content{" "}
          <span className="bg-red-700 bg-clip-text text-transparent text-4xl sm:text-5xl">
            about it!
          </span>
        </h1>

        <p className="font-main font-medium text-lg sm:text-xl text-secondary px-4">
          I am a passionate BCA student skilled in web development, coding, and
          creating digital content. I enjoy building projects, learning new
          technologies, and turning ideas into practical solutions.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center">
        <NavLink
          to="/contact"
          className="px-6 py-3 sm:px-8 sm:py-4 text-md sm:text-lg md:text-xl font-semibold bg-black text-primary rounded-full hover:bg-[--color-custom-blue] hover:text-black transition-colors duration-300 dark:bg-primary dark:text-black"
        >
          Get In Touch
        </NavLink>
        <NavLink
          to="/contact"
          className="px-6 py-3 sm:px-8 sm:py-4 text-md sm:text-lg md:text-xl font-semibold border-2 border-black rounded-full hover:border-[--color-custom-blue] hover:text-white transition-colors duration-300 dark:border-primary dark:text-primary"
        >
          Download CV
        </NavLink>
      </div>

      {/* Education Section */}
      <h1 className="text-center text-custom-blue text-3xl font-bold text-shadow-2xl">
        EDUCATION
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full justify-items-center mb-12">
        {data.map((edu, index) => (
          <EducationCard key={index} {...edu} />
        ))}
      </div>
    </main>
  );
}

export default Home;

function EducationCard({ img, title, course, result, description }) {
  return (
    <section className="h-auto w-80 bg-primary dark:bg-card p-4 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105">
      <img
        src={img}
        alt={`${title} Logo`}
        className="w-full h-40 object-cover rounded-2xl shadow-md mb-2"
      />
      <div className="text-center">
        <h2 className="font-head font-bold text-lg sm:text-xl text-bg dark:text-white">
          {title}
        </h2>
        <p className="font-main dark:text-secondary text-card">{course}</p>
        <span className="font-main text-sm text-green-600 block my-1">
          {result}
        </span>
        <dd className="font-main text-justify tracking-normal whitespace-normal text-secondary text-sm">
          {description}
        </dd>
      </div>
    </section>
  );
}
