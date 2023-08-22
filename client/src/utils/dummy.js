import banner2 from "../assets/userImages/banner1.png"; 
import banner3 from "../assets/userImages/banner2.avif";

export const dummySlides = [
  {
    id: 1,
    title: "VICTORY AWAITS",
    description: "Your premier sports destination",
    image:'https://wallpaperaccess.com/full/1767861.jpg',
  },
  {
    id: 2,
    title: "GAME ON",
    description: "Get Ready for Non-Stop Sports Excitement!",
    image:'https://wallpaperaccess.com/full/1767847.jpg',
  },
  {
    id: 3,
    title: "GAME ON",
    description: "Get Ready for Non-Stop Sports Excitement!",
    image:'https://wallpaperaccess.com/full/1767861.jpg',
  },
];

// bg-cover bg-center h-64 bg-[url('/UserImages/banner1.png')]

// import { useEffect, useRef } from 'react';
// import mapboxgl from 'mapbox-gl';
// import 'mapbox-gl/dist/mapbox-gl.css'; 
// import axios from 'axios';

// function viewMap(turfLongitude,turfLatitude,userLongitude,userLatitude) {
//   const startLatitude = parseFloat(turfLatitude);
//   const startLongitude = parseFloat(turfLongitude);
//   const endLatitude = parseFloat(userLatitude);
//   const endLongitude = parseFloat(userLongitude);

//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     mapboxgl.accessToken = 'pk.eyJ1Ijoieml5YWR1IiwiYSI6ImNsa2tyb3hycjBmMHQza28zY2JyeGE5bXEifQ.uK6EfNoLf37b1K6oFdjFJw';

//     const map = new mapboxgl.Map({
//       container: mapContainerRef.current,
//       style: 'mapbox://styles/mapbox/streets-v10',
//       center: [startLongitude, startLatitude],
//       zoom: 10,
//     });

//     let selectedRouteIndex = 0; // Index of the currently selected route, default to 0 (main route)
//     let routes = []; // Array to store all route data

//     // Add markers for the starting and ending points
//     new mapboxgl.Marker().setLngLat([startLongitude, startLatitude]).addTo(map);
//     new mapboxgl.Marker().setLngLat([endLongitude, endLatitude]).addTo(map);

//     // Fetch the route data and show the route on the map
//     const fetchRouteData = () => {
//       axios
//         .get(
//           `https://api.mapbox.com/directions/v5/mapbox/driving/${startLongitude},${startLatitude};${endLongitude},${endLatitude}`,
//           {
//             params: {
//               access_token: mapboxgl.accessToken,
//               geometries: 'geojson',
//               overview: 'full',
//               alternatives: true,
//             },
//           }
//         )
//         .then((response) => {
//           routes = response.data.routes;
//           const routeData = routes[selectedRouteIndex].geometry;

//           if (map.getSource('route')) {
//             // If the source 'route' already exists, update the data
//             map.getSource('route').setData(routeData);
//           } else {
//             // If the source 'route' doesn't exist, add a new source and layer
//             map.on('load', () => {
//               map.addSource('route', {
//                 type: 'geojson',
//                 data: {
//                   type: 'Feature',
//                   properties: {},
//                   geometry: routeData,
//                 },
//               });

//               map.addLayer({
//                 id: 'route',
//                 type: 'line',
//                 source: 'route',
//                 layout: {
//                   'line-join': 'round',
//                   'line-cap': 'round',
//                 },
//                 paint: {
//                   'line-color': '#339FFF',
//                   'line-width': 6,
//                 },
//               });
//             });
//           }
//         })
//         .catch((error) => {
//           console.error('Error fetching route:', error);
//         });
//     };

//     // Fetch the initial route data
//     fetchRouteData();

//     // Event listener for map click
//     map.on('click', (e) => {
//       const clickedPoint = e.lngLat;

//       // Find the closest route to the clicked point
//       let minDistance = Infinity;
//       let closestRouteIndex = 0;

//       routes.forEach((route, index) => {
//         const routeGeometry = route.geometry;
//         const routeCoordinates = routeGeometry.coordinates;

//         // Calculate the distance from the clicked point to each coordinate in the route
//         const distanceToRoute = routeCoordinates.reduce((minDist, coord) => {
//           const distance = clickedPoint.distanceTo(new mapboxgl.LngLat(coord[0], coord[1]));
//           return Math.min(minDist, distance);
//         }, Infinity);

//         // Keep track of the closest route
//         if (distanceToRoute < minDistance) {
//           minDistance = distanceToRoute;
//           closestRouteIndex = index;
//         }
//       });

//       // Only update the route if a different route is selected
//       if (closestRouteIndex !== selectedRouteIndex) {
//         selectedRouteIndex = closestRouteIndex;
//         const routeData = routes[selectedRouteIndex].geometry;
//         map.getSource('route').setData(routeData);
//       }
//     });

//     // Clean up the map instance when the component unmounts
//     return () => map.remove();
//   }, [startLongitude, startLatitude, endLongitude, endLatitude]);

//   return <div className='m-auto overflow-hidden w-3/4 md:h-96 sm:h-56 h-40 pb-4' ref={mapContainerRef} />;
// }

// export default viewMap;




// function ViewMap({ turfLongitude, turfLatitude, userLongitude, userLatitude }) {
//   const mapboxAccessToken =
//     "pk.eyJ1IjoidWp1YWwiLCJhIjoiY2xrdGFzN2V4MDg3MDNxcGNzanpvNm9zNiJ9.BcpaFJF6wn3SY2XJoRqDyA"; // Replace with your Mapbox access token

//   const mapContainerRef = useRef(null);
//   const map = useRef(null);