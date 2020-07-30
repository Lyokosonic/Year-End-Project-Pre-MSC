import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../../components/Rating';
import { PRODUCT_REVIEW_SAVE_RESET } from '../../constants/productConstants';
import { detailsProduct, saveProductReview } from '../../redux/actions/productActions';

const Product = (props) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const productDetails = useSelector((state) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const productReviewSave = useSelector((state) => state.productReviewSave);
  const { success: productSaveSuccess } = productReviewSave;

  const dispatch = useDispatch();

  useEffect(() => {
    if (productSaveSuccess) {
      alert('Review submitted successfully.');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_REVIEW_SAVE_RESET });
    }
    dispatch(detailsProduct(props.match.params.id));
    return () => {
    };
  }, [dispatch, props, productSaveSuccess]);

  const submitReviewHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveProductReview(props.match.params.id, {
        name: userInfo.name,
        rating,
        comment,
      }),
    );
  };

  const handleAddToCart = () => {
    props.history.push(`/cart/${props.match.params.id}?qty=${qty}`);
  };

  return (
    loading ? (
      <div>Loading...</div>
    ) : error ? (
      <div>{error}</div>
    ) : (
      !product ? (
        <div>Product Unavailable</div>
      ) : (
        <div>
          <div className="back-to-result">
            <Link href="/">Back to result</Link>
          </div>
          <div className="details">
            <div className="details-image">
              <img src={product.image} alt="product" />
            </div>
            <div className="details-info">
              <ul>
                <li>
                  <Typography component="h3" variant="h4">
                    {product.name}
                  </Typography>
                </li>
                <li>
                  <Typography component="h4" variant="h5">
                    {(Math.round(product.rating * 100) / 100).toFixed(2)}
                    {' '}
                    Stars (
                    {product.numReviews}
                    {' '}
                    Reviews)
                  </Typography>
                </li>
                <li>
                  <Typography component="h4" variant="h4">
                    Price:
                    {' '}
                    <b>
                      $
                      {product.price}
                    </b>
                  </Typography>
                </li>
                <li>
                  <Typography component="h4" variant="h5">
                    Description:
                    <div>
                      {product.description}
                    </div>
                  </Typography>
                </li>
              </ul>
            </div>
            <div className="details-action">
              <ul>
                <li>
                  <Typography component="h4" variant="h5">
                    Price: $
                    {product.price}
                  </Typography>
                </li>
                <li>
                  <Typography component="h3" variant="h5">
                    Status:
                    {' '}
                    {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                  </Typography>
                </li>
                {
                  product.countInStock > 0 && (
                    <li>
                      Qty:
                      {' '}
                      <select value={qty} onChange={(event) => { setQty(event.target.value); }}>
                        {[...Array(product.countInStock).keys()].map((elem) => (
                          <option key={elem + 1} value={elem + 1}>{elem + 1}</option>
                        ))}
                      </select>
                    </li>
                  )
                }
                <li>
                  {
                    product.countInStock > 0 && (
                      <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        className="button primary"
                        onClick={handleAddToCart}
                      >
                        Add to Cart
                      </Button>
                    )
                  }
                </li>
              </ul>
            </div>
          </div>
          <div className="content-margined">
            <Typography component="h2" variant="h4">
              Reviews
            </Typography>

            {
              product.reviews && !product.reviews.length && (
                <Typography component="h3" variant="h5">
                  <div>There is no review</div>
                </Typography>
              )
            }
            <ul className="review" id="reviews">
              {
                product && Array.from(product.reviews).map((review) => (
                  <li key={review._id}>
                    <Typography component="h2" variant="h5">
                      {review.name}
                    </Typography>
                    <Typography component="h2" variant="h5">
                      <Rating value={review.rating} />
                    </Typography>
                    <Typography component="h2" variant="h5">
                      {review.createdAt.substring(0, 10)}
                    </Typography>
                    <Typography component="h2" variant="h5">
                      {review.comment}
                    </Typography>
                    <hr />
                  </li>
                ))
              }
              <li>
                <Typography component="h3" variant="h4">
                  Write a customer review
                </Typography>
                {
                  userInfo ? (
                    <form onSubmit={submitReviewHandler}>
                      <ul className="form-container">
                        <li>
                          <label htmlFor="rating">Rating</label>
                          <select
                            name="rating"
                            id="rating"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="1">1- Poor</option>
                            <option value="2">2- Fair</option>
                            <option value="3">3- Good</option>
                            <option value="4">4- Very Good</option>
                            <option value="5">5- Excelent</option>
                          </select>
                        </li>
                        <li>
                          <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="comment"
                            label="Comment"
                            type="comment"
                            name="comment"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          />
                        </li>
                        <li>
                          <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            className="button primary"
                          >
                            Submit
                          </Button>
                        </li>
                      </ul>
                    </form>
                  ) : (
                    <div>
                      Please <Link href="/signin">Sign-in</Link> to write a review.
                    </div>
                  )
                }
              </li>
            </ul>
          </div>
        </div>
      )
    )
  );
};

export default Product;
