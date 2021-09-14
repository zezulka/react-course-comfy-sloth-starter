import React from "react";
import styled from "styled-components";
import { star_icons } from "../utils/constants";

const Stars = ({ stars, reviews }) => {
  return (
    <Wrapper>
      <div className="stars">
        <span>{star_icons[halfStarCount(stars)]}</span>
      </div>
      <p className="reviews">({reviews} customer reviews)</p>
    </Wrapper>
  );
};

function halfStarCount(stars) {
  return Math.floor(stars / 0.5);
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`;
export default Stars;
