// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { getDataFilter } from '../redux/data/data.action';

// let filterPayload = {
//     page: 1,
//     limit: "",
//     ageL: 100,
//     ageR: 0,
//     country: "",
//     gender: "",
//     name: "",
//     age: "",
//     sortAge: "",
// };
// export default function Mapping() {
//     const dispatch = useDispatch();

//     const { list } = useSelector((store) => store.data);
//     console.log('list:', list.countryL);

//     useEffect(() => {
//         dispatch(getDataFilter(filterPayload));
//     }, [])
//     const employee = {
//         id: 1,
//         name: 'Bobby Hadz',
//         salary: 100,
//     };
//     return (
//         <div>
//             {/* 👇️ iterate object KEYS */}
//             {list && Object.keys(list.countryL).map((key, index) => {
//                 return (
//                     <div key={index}>
//                         <h2>
//                             {key}: {list.countryL[key]}
//                         </h2>

//                         <hr />
//                     </div>
//                 );
//             })}

//             <br />
//             <br />
//             <br />

//             {/* 👇️ iterate object VALUES */}
//             {Object.values(employee).map((value, index) => {
//                 return (
//                     <div key={index}>
//                         <h2>{value}</h2>

//                         <hr />
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }
