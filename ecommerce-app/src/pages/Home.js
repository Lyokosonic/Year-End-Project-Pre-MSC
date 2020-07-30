import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Rating from '../components/Rating';
import { listProducts } from '../redux/actions/productActions';

const Home = (props) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const category = props.match.params.id ? props.match.params.id : '';
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts(category, searchKeyword, sortOrder));
    return () => {
    };
  }, [dispatch, category, searchKeyword, sortOrder]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  const sortHandler = (e) => {
    setSortOrder(e.target.value);
    dispatch(listProducts(category, searchKeyword, sortOrder));
  };

  return (
    <>
      {
        category && (
          <h2>{category}</h2>
        )
      }
      <ul className="filter">
        <li>
          <form onSubmit={submitHandler}>
            <Box component="div" display="inline">
              <InputBase
                placeholder="Search…"
                name="searchKeyword"
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </Box>
            <Box component="div" display="inline">
              <Button
                type="submit"
                size="small"
                className="button"
                variant="contained"
              >
                Search
              </Button>
            </Box>
          </form>
        </li>
        <li>
          <Box component="div" display="inline">
            <Typography component="h4" variant="h5">
              Sort By
            </Typography>
          </Box>
          <Box component="div" display="inline">
            <Typography component="h4" variant="h5">
              {' '}
              <select name="sortOrder" onChange={sortHandler}>
                <option value="">Newest</option>
                <option value="lowest">Lowest</option>
                <option value="highest">Highest</option>
              </select>
            </Typography>
          </Box>
        </li>
      </ul>
      {
        loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <ul className="products">
            {
              products.length > 0 ? (
                Array.from(products).map((product) => (
                  <li key={product._id}>
                    <div className="product">
                      <Link href={`/product/${product._id}`}>
                        <img className="product-image" src={product.image} alt="product" />
                      </Link>
                      <div className="product-name">
                        <Link href={`/product/${product._id}`}>{product.name}</Link>
                      </div>
                      <Typography className="product-brand" component="h2" variant="h6">
                        {product.brand}
                      </Typography>
                      <Typography className="product-price" component="h2" variant="p">
                        ${product.price}
                      </Typography>
                      <Typography className="product-rating" component="h2" variant="p">
                        <Rating
                          value={product.rating}
                          text={`${product.numReviews} reviews`}
                        />
                      </Typography>
                    </div>
                  </li>
                ))
              ) : (
                <Typography className="product-rating" component="h2" variant="p">
                  No record found
                </Typography>
              )
            }
          </ul>
        )
      }
    </>
  );
};

export default Home;
