// import React from "react";
// import { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// function BelowHero() {
//   useEffect(()=>{
//     AOS.init({
//       duration: 1000,
//     })
//   })
//   return (
//     <div>
//       <div className="flex bg-gray-200 bg-opacity-50 flex-col justify-center items-center space-y-8 py-28 md:py-40">
//         <h1 className="text-2xl md:text-4xl font-Rubik" data-aos="fade-up">What is Carbon Footprint?</h1>
//         <p className={`text-slate-600 text-base m-2 md:text-xl text-center font-Rubik `} data-aos="fade-up" >
//         Just like an actual footprint it is a mark you leave upon the environment <br />(not with your shoes 😅) but with every action that releases carbon.         
//         </p>
//       </div>
//     </div>
//   );
// }

// export default BelowHero;
import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function BelowHero() {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="dark:bg-gray-900"> {/* Added dark background for the container */}
      <div className="flex bg-gray-200 dark:bg-gray-800 bg-opacity-50 dark:bg-opacity-70 flex-col justify-center items-center space-y-8 py-28 md:py-40">
        <h1 
          className="text-2xl md:text-4xl font-Rubik text-gray-900 dark:text-white" 
          data-aos="fade-up"
        >
          What is Carbon Footprint?
        </h1>
        <p
          className="text-gray-700 dark:text-gray-300 text-base m-2 md:text-xl text-center font-Rubik"
          data-aos="fade-up"
        >
          Just like an actual footprint it is a mark you leave upon the environment <br />
          (not with your shoes 😅) but with every action that releases carbon.
        </p>
      </div>
    </div>
  );
}

export default BelowHero;