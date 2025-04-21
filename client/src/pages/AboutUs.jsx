
// // import React from 'react';
// // import adarsh from '../assets/adarsh.png'
// // import shivam from '../assets/shivam.jpg'



// // const AboutUs = () => {
    
// //     return (
// //         <div className="mx-auto flex-grow max-w-screen-xl py-24 p-6 md:px-10 lg:px-20">
// //         <div className='text-4xl md:text-6xl font-extrabold text-green-500 pb-10 text-center '>About Us</div>
// //             <section className="mb-12">
// //                 <h2 className="text-2xl md:text-3xl font-bold mb-4">About Eco Sphere</h2>
// //                 <p className="text-gray-700 mb-4">
// //                     Eco Sphere is a platform dedicated to helping individuals and businesses calculate and reduce their carbon footprint. We provide tools and resources to promote sustainability and environmental consciousness in everyday practices.
// //                 </p>
// //             </section>
// //             <section className="mb-12">
// //                 <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Mission</h2>
// //                 <p className="text-gray-700 mb-4">
// //                     Our mission at Eco Sphere is to empower people and organizations to make informed decisions that contribute to a greener and more sustainable world. We believe in the importance of environmental stewardship and strive to make a positive impact on the planet.
// //                 </p>
// //             </section>
// //             <section className="mb-12">
// //                 <h2 className="text-2xl  md:text-3xl font-bold mb-4">Meet the Founders</h2>
// //                 <div className="flex items-center mb-6">
// //                     {/*<img src={adarsh} className="w-24 h-22 rounded-full" alt="Adarsh Singh" />*/}
// //                     <div className="ml-4">
// //                         <h3 className="text-xl font-semibold">Vagu Sai Lakshmi Raj</h3>
// //                     </div>
// //                 </div>
// //                 <div className="flex items-center">
// //                     {/*<img src={shivam} className="w-24 h-22 rounded-full" alt="Shivam Verma" />*/}
// //                     <div className="ml-4">
// //                         <h3 className="text-xl font-semibold">Tatheer Fathima</h3>
                
// //                     </div>
// //                 </div>
// //             </section>
// //         </div>
// //     );
// // }

// // export default AboutUs;
// import React from 'react';
// import adarsh from '../assets/adarsh.png';
// import shivam from '../assets/shivam.jpg';

// const AboutUs = () => {
//     return (
//         <div className="mx-auto flex-grow max-w-screen-xl py-12 p-6 md:px-10 lg:px-20">
//             {/* Main Title */}
//             <h1 className='text-4xl md:text-6xl font-extrabold text-green-500 pb-10 text-center'>About Us</h1>
            
//             {/* About Eco Sphere Card */}
//             <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-aos="fade-up">
//                 <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">About Eco Sphere</h2>
//                 <p className="text-gray-700 mb-4">
//                     Eco Sphere is a platform dedicated to helping individuals and businesses calculate and reduce their carbon footprint. We provide tools and resources to promote sustainability and environmental consciousness in everyday practices.
//                 </p>
//             </div>

//             {/* Mission Card */}
//             <div className="bg-white rounded-lg shadow-md p-6 mb-8" data-aos="fade-up" data-aos-delay="100">
//                 <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
//                 <p className="text-gray-700 mb-4">
//                     Our mission at Eco Sphere is to empower people and organizations to make informed decisions that contribute to a greener and more sustainable world. We believe in the importance of environmental stewardship and strive to make a positive impact on the planet.
//                 </p>
//             </div>

//             {/* Founders Section */}
//             <div className="bg-white rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="200">
//                 <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800">Meet the Founders</h2>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                     {/* Founder 1 */}
//                     <div className="flex flex-col md:flex-row items-center space-x-4">
//                         <img 
//                             src={adarsh} 
//                             className="w-32 h-32 rounded-full object-cover border-4 border-green-100" 
//                             alt="Vagu Sai Lakshmi Raj" 
//                         />
//                         <div className="mt-4 md:mt-0 text-center md:text-left">
//                             <h3 className="text-xl font-semibold text-gray-800">Vagu Sai Lakshmi Raj</h3>
//                             <p className="text-gray-600">Co-Founder & CEO</p>
//                         </div>
//                     </div>

//                     {/* Founder 2 */}
//                     <div className="flex flex-col md:flex-row items-center space-x-4">
//                         <img 
//                             src={shivam} 
//                             className="w-32 h-32 rounded-full object-cover border-4 border-green-100" 
//                             alt="Tatheer Fathima" 
//                         />
//                         <div className="mt-4 md:mt-0 text-center md:text-left">
//                             <h3 className="text-xl font-semibold text-gray-800">Tatheer Fathima</h3>
//                             <p className="text-gray-600">Co-Founder & CTO</p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AboutUs;
import React from 'react';
import fathima from '../assets/fathima.jpg';
import lakshmi from '../assets/lakshmi.jpg';

const AboutUs = () => {
    return (
        <div className="mx-auto flex-grow max-w-screen-xl py-12 p-6 md:px-10 lg:px-20">
            {/* Main Title */}
            <h1 className='text-4xl md:text-6xl font-extrabold text-green-500 dark:text-green-400 pb-10 text-center'>About Us</h1>
            
            {/* Information Cards - Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {/* About Eco Sphere Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-aos="fade-up">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">About Eco Sphere</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        Eco Sphere is a platform dedicated to helping individuals and businesses calculate and reduce their carbon footprint. We provide tools and resources to promote sustainability and environmental consciousness in everyday practices.
                    </p>
                </div>

                {/* Mission Card */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6" data-aos="fade-up" data-aos-delay="100">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">Our Mission</h2>
                    <p className="text-gray-700 dark:text-gray-300">
                        Our mission is to empower people and organizations to make informed decisions that contribute to a greener and more sustainable world. We believe in environmental stewardship and strive to make a positive impact.
                    </p>
                </div>
            </div>

            {/* Founders Section - Side by Side */}
            {/* Founders Section - Compact Side by Side */}
<div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12" data-aos="fade-up">
    <h2 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-white">Meet the Founders</h2>
    
    <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        {/* Founder 1 */}
        <div className="flex flex-col items-center text-center">
        <img 
  src={lakshmi} 
  style={{ width: '300px', height: '300px' }} 
  className="rounded-full object-cover border-2 border-green-100 dark:border-green-800 mb-2" 
  alt="Vagu Sai Lakshmi Raj"
/>

            <h3 className="text-md font-medium text-gray-800 dark:text-white">Vagu Sai Lakshmi Raj</h3>
            
        </div>

        {/* Founder 2 */}
        <div className="flex flex-col items-center text-center">
        <img 
  src={fathima} 
  style={{ width: '300px', height: '300px' }} 
  className="rounded-full object-cover border-2 border-green-100 dark:border-green-800 mb-2" 
  alt="Vagu Sai Lakshmi Raj"
/>

            <h3 className="text-md font-medium text-gray-800 dark:text-white">Tatheer Fathima</h3>
           
        </div>
    </div>
</div>
        </div>
    );
}

export default AboutUs;