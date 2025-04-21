// // // import React from 'react';

// // // const Information = () => {
// // //     return (
// // //         <div className="mx-auto flex-grow py-24 max-w-screen-xl p-6 md:px-10 lg:px-20">
// // //             <div className='text-4xl md:text-6xl font-extrabold text-green-500 pb-10 text-center '>Information</div>
// // //             <section className="mb-12">
// // //                 <h2 className="text-2xl md:text-3xl font-bold mb-4">What is Carbon Footprint?</h2>
// // //                 <h1 className="list-disc list-inside text-gray-700 mb-4">
// // //                     <p>It represents the total amount of greenhouse gases, particularly carbon dioxide, that your business is directly or indirectly responsible for emitting into the atmosphere.</p>
// // //                     <p>Every action that releases carbon leaves a mark on the environment, similar to an actual footprint.</p>
// // //                 </h1>
// // //             </section>
// // //             <section className="mb-12">
// // //                 <h2 className="text-2xl md:text-3xl font-bold mb-4">Why You Need to Calculate It?</h2>
// // //                 <ul className="list-disc list-inside text-gray-700 mb-4">
// // //                 <p><li>Understanding and reducing your carbon footprint is essential for sustainable business practices.</li></p>
// // //                 <p><li>It's not only an ethical responsibility but also a strategic move for enhancing brand reputation and resilience.</li></p>
// // //                 <p>  <li>Consumers and investors are increasingly focusing on environmentally conscious businesses.</li></p>
// // //                 </ul>
// // //             </section>
// // //             <section className="mb-12">
// // //                 <h2 className="text-2xl md:text-3xl font-bold mb-4">What Indian Government Says?</h2>
// // //                 <ul className="list-disc list-inside text-gray-700 mb-4">
// // //                     <p><li>The Government of India has set ambitious goals for carbon reduction and sustainable development.</li></p>
// // //                     <p> <li>India plays a crucial role in the global carbon reduction effort due to its diverse industrial landscape and rapidly growing economy.</li></p>
// // //                 </ul>
// // //             </section>
// // //             <section className="mb-12">
// // //                 <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Goals</h2>
                
// // //                 <ul className="list-disc list-inside text-gray-700 mb-4">
// // //                     <p> <li>Facilitating Accurate Carbon Calculations</li> </p>
// // //                     <p> <li>Aligning with National and Global Targets</li>  </p>
// // //                     <p><li>Empowering Sustainable Decision-Making</li></p>
// // //                     <p><li>Continuous Improvement</li></p>
// // //                 </ul>
                
// // //             </section>
// // //             <section className="mb-12">
// // //                 <h2 className="text-2xl md:text-3xl font-bold mb-4">Get Started with Eco Sphere</h2>
// // //                 <p className="text-gray-700 mb-4">
// // //                     Take the first step towards a sustainable future with Eco Sphere. Empower your business to make informed decisions, reduce your carbon footprint, and contribute to a greener and more resilient world.
// // //                 </p>
// // //                 <a href='#'><button className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600">Get Started with Eco Sphere</button></a>
// // //             </section>
// // //         </div>
// // //     );
// // // }

// // // export default Information;
// // import React from 'react';

// // const Information = () => {
// //     return (
// //         <div className="mx-auto flex-grow max-w-screen-xl py-12 p-6 md:px-10 lg:px-20">
// //             <h1 className='text-4xl md:text-6xl font-extrabold text-green-500 dark:text-green-400 pb-10 text-center'>
// //                 Information
// //             </h1>

// //             {/* Reusable Card */}
// //             {[
// //                 {
// //                     title: "What is Carbon Footprint?",
// //                     content: (
// //                         <>
// //                             <p>It represents the total amount of greenhouse gases, particularly carbon dioxide, that your business is directly or indirectly responsible for emitting into the atmosphere.</p>
// //                             <p>Every action that releases carbon leaves a mark on the environment, similar to an actual footprint.</p>
// //                         </>
// //                     )
// //                 },
// //                 {
// //                     title: "Why You Need to Calculate It?",
// //                     content: (
// //                         <ul className="list-disc list-inside space-y-2">
// //                             <li>Understanding and reducing your carbon footprint is essential for sustainable business practices.</li>
// //                             <li>It's not only an ethical responsibility but also a strategic move for enhancing brand reputation and resilience.</li>
// //                             <li>Consumers and investors are increasingly focusing on environmentally conscious businesses.</li>
// //                         </ul>
// //                     )
// //                 },
// //                 {
// //                     title: "What Indian Government Says?",
// //                     content: (
// //                         <ul className="list-disc list-inside space-y-2">
// //                             <li>The Government of India has set ambitious goals for carbon reduction and sustainable development.</li>
// //                             <li>India plays a crucial role in the global carbon reduction effort due to its diverse industrial landscape and rapidly growing economy.</li>
// //                         </ul>
// //                     )
// //                 },
// //                 {
// //                     title: "Our Goals",
// //                     content: (
// //                         <ul className="list-disc list-inside space-y-2">
// //                             <li>Facilitating Accurate Carbon Calculations</li>
// //                             <li>Aligning with National and Global Targets</li>
// //                             <li>Empowering Sustainable Decision-Making</li>
// //                             <li>Continuous Improvement</li>
// //                         </ul>
// //                     )
// //                 }
// //             ].map((card, idx) => (
// //                 <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-10 transition duration-300 hover:shadow-2xl">
// //                     <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">{card.title}</h2>
// //                     <div className="text-gray-700 dark:text-gray-300 space-y-3">{card.content}</div>
// //                 </div>
// //             ))}

// //             {/* Final CTA Card */}
// //             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 mb-10 text-center transition duration-300 hover:shadow-2xl">
// //                 <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 dark:text-white">
// //                     Get Started with Eco Sphere
// //                 </h2>
// //                 <p className="text-gray-700 dark:text-gray-300 mb-6">
// //                     Take the first step towards a sustainable future with Eco Sphere. Empower your business to make informed decisions, reduce your carbon footprint, and contribute to a greener and more resilient world.
// //                 </p>
// //                 <a href="#">
// //                     <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-full font-semibold transition duration-300">
// //                         Get Started
// //                     </button>
// //                 </a>
// //             </div>
// //         </div>
// //     );
// // };

// // export default Information;
// import React from 'react';

// const Information = () => {
//     return (
//         <div className="mx-auto flex-grow py-20 max-w-screen-xl px-8 md:px-16 lg:px-32">
//             <h1 className="text-4xl md:text-6xl font-extrabold text-green-500 dark:text-green-400 pb-16 text-center">
//                 Information
//             </h1>

//             {/* Grid Wrapper */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//                 {/* Card 1 */}
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 text-center">
//                     <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
//                         What is Carbon Footprint?
//                     </h2>
//                     <p className="text-gray-700 dark:text-gray-300 mb-4">
//                         It represents the total amount of greenhouse gases, particularly carbon dioxide, that your business is directly or indirectly responsible for emitting into the atmosphere.
//                     </p>
//                     <p className="text-gray-700 dark:text-gray-300">
//                         Every action that releases carbon leaves a mark on the environment, similar to an actual footprint.
//                     </p>
//                 </div>

//                 {/* Card 2 */}
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 text-center">
//                     <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
//                         Why You Need to Calculate It?
//                     </h2>
//                     <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3 text-left inline-block">
//                         <li>Understanding and reducing your carbon footprint is essential for sustainable business practices.</li>
//                         <li>It's not only an ethical responsibility but also a strategic move for enhancing brand reputation and resilience.</li>
//                         <li>Consumers and investors are increasingly focusing on environmentally conscious businesses.</li>
//                     </ul>
//                 </div>

//                 {/* Card 3 */}
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 text-center">
//                     <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
//                         What Indian Government Says?
//                     </h2>
//                     <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3 text-left inline-block">
//                         <li>The Government of India has set ambitious goals for carbon reduction and sustainable development.</li>
//                         <li>India plays a crucial role in the global carbon reduction effort due to its diverse industrial landscape and rapidly growing economy.</li>
//                     </ul>
//                 </div>

//                 {/* Card 4 */}
//                 <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 text-center">
//                     <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
//                         Our Goals
//                     </h2>
//                     <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3 text-left inline-block">
//                         <li>Facilitating Accurate Carbon Calculations</li>
//                         <li>Aligning with National and Global Targets</li>
//                         <li>Empowering Sustainable Decision-Making</li>
//                         <li>Continuous Improvement</li>
//                     </ul>
//                 </div>
//             </div>

//         </div>
//     );
// };

// export default Information;
import React from 'react';

const Information = () => {
    return (
        <div className="mx-auto flex-grow pt-20 pb-40 max-w-screen-xl px-8 md:px-16 lg:px-32">
            <h1 className="text-4xl md:text-6xl font-extrabold text-green-500 dark:text-green-400 pb-20 mb-20 text-center">
                Information
            </h1>

            {/* Grid Wrapper with top margin */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
                {/* Card 1 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                        What is Carbon Footprint?
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                        It represents the total amount of greenhouse gases, particularly carbon dioxide, that your business is directly or indirectly responsible for emitting into the atmosphere.
                    </p>
                    <p className="text-gray-700 dark:text-gray-300">
                        Every action that releases carbon leaves a mark on the environment, similar to an actual footprint.
                    </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                        Why You Need to Calculate It?
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3 text-left inline-block">
                        <li>Understanding and reducing your carbon footprint is essential for sustainable business practices.</li>
                        <li>It's not only an ethical responsibility but also a strategic move for enhancing brand reputation and resilience.</li>
                        <li>Consumers and investors are increasingly focusing on environmentally conscious businesses.</li>
                    </ul>
                </div>

                {/* Card 3 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                        What Indian Government Says?
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3 text-left inline-block">
                        <li>The Government of India has set ambitious goals for carbon reduction and sustainable development.</li>
                        <li>India plays a crucial role in the global carbon reduction effort due to its diverse industrial landscape and rapidly growing economy.</li>
                    </ul>
                </div>

                {/* Card 4 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-10 text-center">
                    <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-800 dark:text-white">
                        Our Goals
                    </h2>
                    <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-3 text-left inline-block">
                        <li>Facilitating Accurate Carbon Calculations</li>
                        <li>Aligning with National and Global Targets</li>
                        <li>Empowering Sustainable Decision-Making</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Information;
