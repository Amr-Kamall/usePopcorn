import React from "react";
import { Rating } from "react-simple-star-rating";

function StarRating({ userRating, setUserRating }) {
  const handleRating = (rate) => {
    setUserRating(rate);
  };
  console.log(userRating);
  return (
    <div
      style={{
        direction: "ltr",
        fontFamily: "sans-serif",
        touchAction: "none",
      }}
    >
      <Rating
        fillColorArray={[
          "#f14f45",
          "#f14f45",
          "#f16c45",
          "#f17a45",
          "#f18845",
          "#f19745",
          "#f1b345",
          "#f1c245",
          "#f1d045",
          "#f1de45",
        ]}
        size={23}
        iconsCount={10}
        onClick={handleRating}
        initialValue={userRating}
        // showTooltip
        // tooltipArray={[
        //   "Terrible",
        //   "Terrible+",
        //   "Bad",
        //   "Bad+",
        //   "Average",
        //   "Average+",
        //   "Great",
        //   "Great+",
        //   "Awesome",
        //   "Awesome+",
        // ]}
        transition
      />
    </div>
  );
}

export default StarRating;
