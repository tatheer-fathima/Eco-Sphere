// // import React, { useEffect } from 'react';
// // import HouseholdForm from '../components/HouseholdForm';
// // import BusinessForm from '../components/BusinessForm';
// // import { useState } from 'react';
// // import axios from 'axios';

// // function Calculator() {

// //   const [userType, setUserType] = useState('');

// //   useEffect(() => {
// //     // Fetch user type upon login
// //     const fetchUserType = async () => {
// //       try {
// //         const response = await axios.get('/api/auth/user-type', { withCredentials: true });
// //         console.log('User type response:', response.data.type);
// //         setUserType(response.data.type); // Set userType with response.data.type
// //       } catch (error) {
// //         console.error('Error fetching user type:', error);
// //       }
// //     };
  
// //     fetchUserType();
// //   }, []);

// //   /*useEffect(() => {
// //     // Fetch user type upon login
// //     const fetchUserType = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:3001/user-type', { withCredentials: true });
// //         console.log('User type response:', response.data.type);
// //         setUserType(response.data.type); // Fix: Set userType with response.data.type
// //         console.log('User type:', userType);
// //       } catch (error) {
// //         console.error('Error fetching user type:', error);
// //       }
// //     };

// //     fetchUserType();
// //   }, []);

// //   console.log('User type:', userType); // Log the userType to check its value

// //   // Render the appropriate component based on the user type
// //   const renderForm = () => {
// //     switch (userType) {
// //       case 'business':
// //         return <BusinessForm />;
// //       case 'household':
// //         return <HouseholdForm />;
// //       default:
// //         return null;
// //     }
// //   }; */

// //   return (
// //     <div className='flex-grow'>
// //     {userType === 'Business' ? <BusinessForm /> : <HouseholdForm />}
// //   </div>
// //   );
// // };

// // export default Calculator;

// // /*import React, { useEffect } from 'react';
// // import HouseholdForm from '../components/HouseholdForm';
// // import BusinessForm from '../components/BusinessForm';
// // import { useState } from 'react';
// // import axios from 'axios';

// // function Calculator() {

// //   const [userType, setUserType] = useState('');

// //   useEffect(() => {
// //     // Fetch user type upon login
// //     const fetchUserType = async () => {
// //       try {
// //         const response = await axios.get('http://localhost:3001/user-type', { withCredentials: true });
// //         console.log('User type response:', response.data.type);
// //         setUserType(response.data.type); // Fix: Set userType with response.data.type
// //       } catch (error) {
// //         console.error('Error fetching user type:', error);
// //       }
// //     };

// //     fetchUserType();
// //   }, []);

// //   console.log('User type:', userType); // Log the userType to check its value

// //   return (
// //     <div>
// //       {userType === 'business' ? <BusinessForm /> : userType === 'household' ? <HouseholdForm /> : null}
// //     </div>
// //   );
// // };

// // export default Calculator;*/
// import React, { useEffect, useState } from 'react';
// import HouseholdForm from '../components/HouseholdForm';
// import BusinessForm from '../components/BusinessForm';
// import { getAuth } from 'firebase/auth';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { app } from '../firebase';  // Assuming you have initialized Firebase in a firebase.js file

// function Calculator() {
//   const [userType, setUserType] = useState(null); // Initialize as null for loading state
//   const [loading, setLoading] = useState(true);  // Flag to indicate loading state
//   const [error, setError] = useState(null); // Error state

//   useEffect(() => {
//     // Initialize Firebase Auth and Firestore
//     const auth = getAuth(app); // Firebase Auth instance
//     const db = getFirestore(app); // Firestore instance

//     const fetchUserType = async () => {
//       try {
//         const user = auth.currentUser;
//         if (user) {
//           // Query Firestore to get userType
//           const userRef = doc(db, 'users', user.uid); // Assuming users collection
//           const docSnap = await getDoc(userRef);

//           if (docSnap.exists()) {
//             // Assuming the document has a 'type' field
//             const userType = docSnap.data().type;
//             console.log('User type:', userType);
//             setUserType(userType); // Set userType from Firestore data
//           } else {
//             console.error('No such document!');
//             setError('User type not found in Firestore.');
//           }
//         } else {
//           setError('No user is logged in.');
//         }
//       } catch (error) {
//         console.error('Error fetching user type:', error);
//         setError('Failed to fetch user type. Please try again later.');
//       } finally {
//         setLoading(false); // Set loading to false after the fetch attempt
//       }
//     };

//     fetchUserType();
//   }, []);

//   if (loading) {
//     return <div>Loading...</div>; // Show loading state
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error message if fetching fails
//   }

//   // Render the appropriate form based on user type
//   return (
//     <div className='flex-grow'>
//       {userType === 'business' ? <BusinessForm /> : userType === 'household' ? <HouseholdForm /> : null}
//     </div>
//   );
// }

// export default Calculator;


import React, { useState, useEffect } from 'react';
import HouseholdForm from '../components/HouseholdForm';
import BusinessForm from '../components/BusinessForm';
import { auth } from '../firebase';
import { onAuthStateChanged } from 'firebase/auth';

function Calculator() {
  const [userType, setUserType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Get the ID token to check for custom claims
          const idToken = await user.getIdTokenResult();
          const role = idToken.claims.role || 'household'; // Default role
          setUserType(role);
        } catch (error) {
          console.error("Error getting user role:", error);
          setUserType('household'); // Fallback
        }
      } else {
        setUserType('');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex-grow'>
      {userType === 'business' ? <BusinessForm /> : <HouseholdForm />}
    </div>
  );
}

export default Calculator;