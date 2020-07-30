const sortOrderProduct = (req) => {
  if (req.query.sortOrder) {
    if (req.query.sortOrder === 'lowest') {
      return { price: 1 };
    }
    return { price: -1 };
  }
  return { _id: -1 };
};

export { sortOrderProduct };
