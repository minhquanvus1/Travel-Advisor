// import React from "react";

// const RatingStars = ({ rating, width, height }) => {
//   let fullStars = 0;
//   let halfStars = 0;
//   let emptyStars = 0;

//   if (rating !== undefined && rating >= 0 && rating <= 5) {
//     for (let i = 0; i < 5; i++) {
//       if (rating >= 1) {
//         fullStars++;
//         rating--;
//       } else if (rating === 0.5) {
//         halfStars++;
//         rating -= 0.5;
//       } else if (rating === 0) {
//         emptyStars++;
//       } else {
//         break;
//       }
//     }
//   } else {
//     console.error("Invalid rating value");
//     console.log("rating: ", typeof rating);
//     console.log("rating: ", rating);
//     emptyStars = 5;
//   }
//   return (
//     <div
//       style={{
//         width: width,
//         height: height,
//         // display: "flex",
//         // alignItems: "center",
//         display: "grid",
//         gridAutoColumns: "auto",
//         gridTemplateColumns: "repeat(5, 1fr)",
//         alignItems: "center",
//       }}
//     >
//       {Array.from({ length: fullStars }).map((_, i) => (
//         <svg
//           key={i}
//           style={{ marginRight: "2px" }}
//           //   width={width}
//           //   height={height}
//           className="rating-stars"
//           viewBox="0 0 24 24"
//           aria-labelledby=":lithium-r1p:"
//         >
//           <title id=":lithium-r1p:"></title>
//           <path
//             d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
//             transform=""
//           ></path>
//         </svg>
//       ))}

//       {Array.from({ length: halfStars }).map((_, i) => (
//         <svg
//           key={i}
//           className="rating-stars"
//           viewBox="0 0 24 24"
//           style={{ marginRight: "2px" }}
//           aria-labelledby=":lithium-r1p:"
//         >
//           <title id=":lithium-r1p:"></title>
//           <path
//             d="M 12 0C5.389 0 0 5.389 0 12c0 6.62 5.389 12 12 12 6.62 0 12-5.379 12-12S18.621 0 12 0zm0 2a9.984 9.984 0 0110 10 9.976 9.976 0 01-10 10z"
//             // transform="translate(78 0)"
//           ></path>
//         </svg>
//       ))}

//       {Array.from({ length: emptyStars }).map((_, i) => (
//         <svg
//           className="rating-stars"
//           viewBox="0 0 24 24"
//           style={{ marginRight: "2px" }}
//           aria-labelledby=":lithium-r1p:"
//         >
//           <title id=":lithium-r1p:"></title>
//           <path
//             d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12zm0 2a9.983 9.983 0 019.995 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2z"
//             // transform="translate(104 0)"
//           ></path>
//         </svg>
//       ))}
//     </div>
//   );
// };

// export default RatingStars;

import React from "react";

const RatingStars = ({ rating, width, height }) => {
  let fullStars = 0;
  let halfStars = 0;
  let emptyStars = 0;

  if (rating !== undefined && rating >= 0 && rating <= 5) {
    for (let i = 0; i < 5; i++) {
      if (rating >= 1) {
        fullStars++;
        rating--;
      } else if (rating === 0.5) {
        halfStars++;
        rating -= 0.5;
      } else if (rating === 0) {
        emptyStars++;
      } else {
        break;
      }
    }
  } else {
    console.error("Invalid rating value");
    console.log("rating: ", typeof rating);
    console.log("rating: ", rating);
    emptyStars = 5;
  }
  return (
    <svg
      className="rating-stars"
      viewBox={`0 0 ${fullStars * 28 + halfStars * 28 + emptyStars * 28} 24`}
      width={width}
      height={height}
      style={{ display: "inline-block" }}
    >
      {Array.from({ length: fullStars }).map((_, i) => (
        <path
          key={`full-${i}`}
          d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"
          transform={`translate(${i * 28}, 0)`}
        ></path>
      ))}

      {Array.from({ length: halfStars }).map((_, i) => (
        <path
          key={`half-${i}`}
          d="M 12 0C5.389 0 0 5.389 0 12c0 6.62 5.389 12 12 12 6.62 0 12-5.379 12-12S18.621 0 12 0zm0 2a9.984 9.984 0 0110 10 9.976 9.976 0 01-10 10z"
          transform={`translate(${(fullStars + i) * 28}, 0)`}
        ></path>
      ))}

      {Array.from({ length: emptyStars }).map((_, i) => (
        <path
          key={`empty-${i}`}
          d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12zm0 2a9.983 9.983 0 019.995 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2z"
          transform={`translate(${(fullStars + halfStars + i) * 28}, 0)`}
        ></path>
      ))}
    </svg>
  );
};

export default RatingStars;

// import React from "react";

// const StarsReview = ({ rating, width, height }) => {
//   let fullStars = 0;
//   let halfStars = 0;
//   let emptyStars = 0;

//   if (rating !== undefined && rating >= 0 && rating <= 5) {
//     for (let i = 0; i < 5; i++) {
//       if (rating >= 1) {
//         fullStars++;
//         rating--;
//       } else if (rating === 0.5) {
//         halfStars++;
//         rating -= 0.5;
//       } else if (rating === 0) {
//         emptyStars++;
//       } else {
//         break;
//       }
//     }
//   } else {
//     console.error("Invalid rating value");
//     console.log("rating: ", typeof rating);
//     console.log("rating: ", rating);
//     emptyStars = 5;
//   }
//   return (
//     <div
//       style={{
//         display: "flex",
//         alignItems: "center",
//         width: width,
//         height: height,
//       }}
//     >
//       {Array.from({ length: fullStars }).map((_, i) => (
//         <svg
//           key={`full-${i}`}
//           className="rating-stars"
//           viewBox="0 0 24 24"
//           //   width={width}
//           //   height={height}
//           style={{ marginRight: "2px" }}
//         >
//           <path d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12z"></path>
//         </svg>
//       ))}

//       {Array.from({ length: halfStars }).map((_, i) => (
//         <svg
//           key={`half-${i}`}
//           className="rating-stars"
//           viewBox="0 0 24 24"
//           //   width={width}
//           //   height={height}
//           style={{ marginRight: "2px" }}
//         >
//           <path d="M 12 0C5.389 0 0 5.389 0 12c0 6.62 5.389 12 12 12 6.62 0 12-5.379 12-12S18.621 0 12 0zm0 2a9.984 9.984 0 0110 10 9.976 9.976 0 01-10 10z"></path>
//         </svg>
//       ))}

//       {Array.from({ length: emptyStars }).map((_, i) => (
//         <svg
//           key={`empty-${i}`}
//           className="rating-stars"
//           viewBox="0 0 24 24"
//           //   width={width}
//           //   height={height}
//           style={{ marginRight: "2px" }}
//         >
//           <path d="M 12 0C5.388 0 0 5.388 0 12s5.388 12 12 12 12-5.38 12-12c0-6.612-5.38-12-12-12zm0 2a9.983 9.983 0 019.995 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2z"></path>
//         </svg>
//       ))}
//     </div>
//   );
// };

// export default StarsReview;
