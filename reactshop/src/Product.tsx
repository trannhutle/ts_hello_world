import * as React from "react";
import { IProduct, products } from "./ProductsData";
import Tabs from "./Tabs";
import withLoader from "./withLoader";

interface IProps {
  product?: IProduct;
  inBasket: boolean;
  onAddToBasket: () => void;
}

const Product: React.SFC<IProps> = (props) => {
  const handleAddClick = () => {
    props.onAddToBasket();
  };
  const product = props.product;
  if (!product) {
    return null;
  }
  return (
    <React.Fragment>
      <h1>{product.name}</h1>
      <Tabs>
        <Tabs.Tab
          name="Description"
          initialActive={true}
          heading={() => <b>Description</b>}
        >
          <b>{product.description}</b>
        </Tabs.Tab>
        <Tabs.Tab name="Reviews" heading={() => "Reviews"}>
          <ul className="product-review">
            {product.reviews.map((review) => (
              <li key={review.reviewer}>
                <i>"{review.comment}"</i> - {review.reviewer}
              </li>
            ))}
          </ul>
        </Tabs.Tab>
      </Tabs>
      <div className="page-container">
        <React.Fragment>
          {/* <h1>{product.name}</h1>
          <p>{product.description}</p>
          <div>
            <ul className="product-review">
              {product.reviews.map((review) => (
                <li key={review.reviewer} className="product-reviews-item">
                  <i>"{review.comment}"</i> - {review.reviewer}
                </li>
              ))}
            </ul>
          </div> */}

          <p className="product-price">
            {new Intl.NumberFormat("en-US", {
              currency: "USD",
              style: "currency",
            }).format(product.price)}
          </p>
          {!props.inBasket && (
            <button onClick={handleAddClick}>Add to basket</button>
          )}
        </React.Fragment>
      </div>
    </React.Fragment>
  );
};

export default withLoader(Product);
