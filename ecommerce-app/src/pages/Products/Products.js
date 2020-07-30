import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, listProducts, saveProduct } from '../../redux/actions/productActions';

const Products = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [description, setDescription] = useState('');

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  const productSave = useSelector((state) => state.productSave);
  const { loading: loadingSave, success: successSave, error: errorSave } = productSave;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setFormVisible(false);
    }
    dispatch(listProducts());
    return () => {
    };
  }, [dispatch, successSave, successDelete]);

  const openModal = (product) => {
    setFormVisible(true);
    setId(product._id);
    setName(product.name);
    setImage(product.image);
    setBrand(product.brand);
    setPrice(product.price);
    setCategory(product.category);
    setCountInStock(product.countInStock);
    setDescription(product.description);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveProduct({
      _id: id,
      name,
      image,
      brand,
      price,
      category,
      countInStock,
      description,
    }));
  };

  const deleteHandler = (product) => {
    dispatch(deleteProduct(product._id));
  };

  return (
    <div className="content content-margined">
      <div className="product-header">
        <Typography component="h3" variant="h3">
          Products
        </Typography>
        <Button
          type="button"
          variant="contained"
          className="button primary"
          onClick={() => openModal({})}
        >
          Create Product
        </Button>
      </div>
      {
        formVisible && (
          <div className="form">
            <form onSubmit={(e) => submitHandler(e)}>
              <ul className="form-container">
                <li>
                  <Typography component="h2" variant="h3">
                    Create Product
                  </Typography>
                </li>
                <li>
                  { loadingSave && <div>Loading...</div> }
                  { errorSave && <div>{errorSave}</div> }
                </li>
                <li>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </li>
                <li>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="image"
                    label="image"
                    type="text"
                    name="image"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                  />
                </li>
                <li>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="brand"
                    label="Brand"
                    type="text"
                    name="brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </li>
                <li>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="price"
                    label="Price"
                    type="text"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </li>
                <li>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="category"
                    label="Category"
                    type="text"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </li>
                <li>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="countInStock"
                    label="Count in Stock"
                    type="text"
                    name="countInStock"
                    value={countInStock}
                    onChange={(e) => setCountInStock(e.target.value)}
                  />
                </li>
                <li>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="Description"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </li>
                <li>
                  <Button
                    type="submit"
                    variant="contained"
                    className="button primary"
                  >
                    {id ? 'Update' : 'Create'}
                  </Button>
                </li>
                <li>
                  <Button
                    type="button"
                    variant="contained"
                    className="button secondary"
                    onClick={() => setFormVisible(false)}
                  >
                    Back
                  </Button>
                </li>
              </ul>
            </form>
          </div>
        )
      }
      <div className="product-list">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Action</th>
            </tr>
          </thead>
          {
            products.length <= 0 ? (
              <div>No record found</div>
            ) : (
              <tbody>
                {
                  products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>{product.name}</td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <Button
                          type="button"
                          variant="contained"
                          className="button"
                          onClick={() => openModal(product)}
                        >
                          Edit
                        </Button>
                        {' '}
                        <Button
                          type="button"
                          variant="contained"
                          className="button"
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            )
          }
        </table>
      </div>
    </div>
  );
};

export default Products;
