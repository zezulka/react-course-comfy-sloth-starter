import React from "react";
import styled from "styled-components";
import { useFilterContext } from "../context/filter_context";
import { getUniqueValues, formatPrice } from "../utils/helpers";
import { FaCheck } from "react-icons/fa";

const Filters = () => {
  const {
    filters: {
      text,
      category,
      company,
      color,
      minPrice,
      price,
      maxPrice,
      shipping,
    },
    updateFilters,
    clearFilters,
    allProducts,
  } = useFilterContext();

  const categories = getUniqueValues(allProducts, "category");
  const companies = getUniqueValues(allProducts, "company");
  const colours = getUniqueValues(allProducts, "colors");

  return (
    <Wrapper>
      <div className="content">
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="form-control">
            <input
              type="text"
              name="text"
              placeholder="search"
              className="search-input"
              value={text}
              onChange={updateFilters}
            />
          </div>
          <div className="form-control">
            <h5>category</h5>
            <div>
              {categories.map((c) => (
                <button
                  type="button"
                  name="category"
                  className={`${category === c.toLowerCase() ? "active" : ""}`}
                  onClick={updateFilters}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="form-control">
            <h5>company</h5>
            <select name="company" value={company} onChange={updateFilters}>
              {companies.map((c) => (
                <option value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="form-control">
            <h5>colours</h5>
            <div className="colors">
              {colours.map((c) =>
                c !== "all" ? (
                  <button
                    name="color"
                    style={{ background: c }}
                    className={`color-btn ${color === c && "active"}`}
                    value={c}
                    onClick={updateFilters}
                  >
                    {color === c && <FaCheck />}
                  </button>
                ) : (
                  <button
                    name="color"
                    className={`all-btn ${color === c && "active"}`}
                    value={c}
                    onClick={updateFilters}
                  >
                    {c}
                  </button>
                )
              )}
            </div>
          </div>
          <div className="form-control">
            <h5>price</h5>
            <p className="price">{formatPrice(price)}</p>
            <input
              type="range"
              name="price"
              onChange={updateFilters}
              steps={logarithmicSteps(maxPrice)}
              min={minPrice}
              max={maxPrice}
              value={price}
              data-numeric
            />
          </div>
          <div className="form-control">
            <label htmlFor="shipping"> free shipping</label>
            <input
              type="checkbox"
              name="shipping"
              checked={shipping}
              onChange={updateFilters}
            />
          </div>
        </form>
        <button type="button" className="clear-btn" onClick={clearFilters}>
          Reset Filters
        </button>
      </div>
    </Wrapper>
  );
};

function logarithmicSteps(ceiling) {
  let values = [0];
  let currStep = 1;
  while (currStep < ceiling) {
    values.push(currStep);
    currStep *= 5;
  }
  values.push(ceiling);
  return values;
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`;

export default Filters;
