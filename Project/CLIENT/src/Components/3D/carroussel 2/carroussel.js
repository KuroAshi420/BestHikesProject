// import React from "react";
// // react component for creating beautiful carousel
// import Carousel from "react-slick";
// // material-ui components
// // @material-ui/icons
// import LocationOn from "@material-ui/icons/LocationOn";
// // core components
// import GridContainer from "components/Grid/GridContainer.js";
// import GridItem from "components/Grid/GridItem.js";
// import Card from "components/Card/Card.js";

// import image1 from "https://lh3.googleusercontent.com/proxy/jKumx5V0HdvJcyY3fd5OM_LXDQTE59orpg7AEIDvNrXUKom2-hGbFwfTvNKeB5K_Ft6YsYsSK2FnwbWIDa5sdvw6KROsR8gq3OE9mlQv0ugzoxJEmBkiSbbbVlu5FzmwUNJO_9r98n07GZg0KRg";
// import image2 from "https://lh3.googleusercontent.com/proxy/jKumx5V0HdvJcyY3fd5OM_LXDQTE59orpg7AEIDvNrXUKom2-hGbFwfTvNKeB5K_Ft6YsYsSK2FnwbWIDa5sdvw6KROsR8gq3OE9mlQv0ugzoxJEmBkiSbbbVlu5FzmwUNJO_9r98n07GZg0KRg";
// import image3 from "https://lh3.googleusercontent.com/proxy/jKumx5V0HdvJcyY3fd5OM_LXDQTE59orpg7AEIDvNrXUKom2-hGbFwfTvNKeB5K_Ft6YsYsSK2FnwbWIDa5sdvw6KROsR8gq3OE9mlQv0ugzoxJEmBkiSbbbVlu5FzmwUNJO_9r98n07GZg0KRg";

// export default function Carroussel2(){
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true
//   };
//   return (
//     <GridContainer>
//       <GridItem xs={12} sm={12} md={8}>
//         <Card>
//           <Carousel {...settings}>
//             <div>
//               <img
//                 src={image1}
//                 alt="First slide"
//                 className="slick-image"
//               />
//               <div className="slick-caption">
//                 <h4>
//                   <LocationOn className="slick-icons" />Yellowstone
//                   National Park, United States
//                 </h4>
//               </div>
//             </div>
//             <div>
//               <img
//                 src={image2}
//                 alt="Second slide"
//                 className="slick-image"
//               />
//               <div className="slick-caption">
//                 <h4>
//                   <LocationOn className="slick-icons" />Somewhere Beyond,
//                   United States
//                 </h4>
//               </div>
//             </div>
//             <div>
//               <img
//                 src={image3}
//                 alt="Third slide"
//                 className="slick-image"
//               />
//               <div className="slick-caption">
//                 <h4>
//                   <LocationOn className="slick-icons" />Yellowstone
//                   National Park, United States
//                 </h4>
//               </div>
//             </div>
//           </Carousel>
//         </Card>
//       </GridItem>
//     </GridContainer>
//   );
// }