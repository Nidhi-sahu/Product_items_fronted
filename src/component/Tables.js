import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TablePaginationActions from './Pagination';
import Switch from '@mui/material/Switch';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { MdDeleteOutline } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { fetchProducts, editProduct, deleteProduct, addProduct, updateProductStatus } from '../redux/action/Product_action';
import { validateProductForm } from '../middleware/Validation';

export default function TableUi() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // State for add modal handling
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openAddModal, setOpenAddModal] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);

  // State for Add Product Form Fields
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [isRecommended, setIsRecommended] = useState('');
  const [isBestseller, setIsBestseller] = useState('');
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState({});

  // Fetch products when component mounts
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleSubmitAddProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      description,
      price,
      isRecommended: isRecommended === 'true',
      isBestseller: isBestseller === 'true',
      status
    };
    const validationErrors = validateProductForm(newProduct);

    if (Object.keys(validationErrors).length === 0) {
      dispatch(addProduct(newProduct));
      setOpenAddModal(false);
      // Clear the form fields
      setName('');
      setDescription('');
      setPrice('');
      setIsRecommended('');
      setIsBestseller('');
      setStatus('');
      setErrors({});
    } else {
      setErrors(validationErrors);
    }
  };

  const handleOpenEditModal = (product) => {
    setSelectedProduct(product);
    setName(product.name);
    setDescription(product.description);
    setOpenEditModal(true);
  };

  const handleSubmitEditProduct = (e) => {
    e.preventDefault();
    if (!selectedProduct) return; // Ensure selectedProduct is defined
    const updatedProduct = { name, description };
    dispatch(editProduct(selectedProduct._id, updatedProduct));
    setOpenEditModal(false);
  };

  //--------------toggle-----------------------------
  const handleToggleStatus = (id, currentStatus) => {
    const newStatus = currentStatus === 'available' ? 'unavailable' : 'available';
    dispatch(updateProductStatus(id, newStatus));
  };

  // Modal styling
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'center', padding: '0 16px' }}>
        <TableContainer
          component={Paper}
          sx={{
            width: '100%',
            maxWidth: '800px',
            margin: '0 auto',
            padding: '16px',
            marginTop: "30px",
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Fab color="primary" aria-label="add" style={{ marginLeft: "12px" }} onClick={() => setOpenAddModal(true)}>
            <AddIcon />
          </Fab>
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">IsRecommended</TableCell>
                <TableCell align="right">IsBestseller</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product) => (
                <TableRow key={product._id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell align="center">{product.description}</TableCell>
                  <TableCell align="right">{product.price}</TableCell>
                  <TableCell align="right">
                    <Switch checked={product.isRecommended} />
                  </TableCell>
                  <TableCell align="right"><Switch checked={product.isBestseller} /></TableCell>
                  <TableCell align="right">
                    {/* <Switch checked={product.status} /> */}
                    <Switch
                    
                    checked={product.status === 'available'} 
                  onChange={() => handleToggleStatus(product._id, product.status)} />


                  </TableCell>
                  <TableCell align="right">
                    <GoPencil onClick={() => handleOpenEditModal(product)} style={{ width: '18px', height: '18px' }} />
                    <MdDeleteOutline onClick={() => handleDelete(product._id)} style={{ width: '18px', height: '18px' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  rowsPerPageOptions={[3]}
                  colSpan={7}
                  count={products.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>

      {/* Edit Modal */}
      <Modal open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <Box sx={style}>
          <Typography variant="h6">Edit Product</Typography>
          <Form onSubmit={handleSubmitEditProduct}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Box>
      </Modal>

      {/* Add Modal */}
      <Modal open={openAddModal} onClose={() => setOpenAddModal(false)}>
        <Box sx={style}>
          <Typography variant="h6">Add Product</Typography>
          <Form onSubmit={handleSubmitAddProduct}>
            <Form.Group as={Row} className="mb-3">
              <Col xs={6}>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Title"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </Col>
              <Col xs={6}>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && <small className="text-danger">{errors.description}</small>}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col xs={6}>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {errors.price && <small className="text-danger">{errors.price}</small>}
              </Col>
              <Col xs={6}>
                <Form.Label>IsRecommended</Form.Label>
                <Form.Control as="select" value={isRecommended} onChange={(e) => setIsRecommended(e.target.value)}>
                <option value="" disabled hidden>Select</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Control>
                {errors.isRecommended && <div style={{ color: 'red' }}>{errors.isRecommended}</div>}
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Col xs={6}>
                <Form.Label>IsBestseller</Form.Label>
                <Form.Control as="select" value={isBestseller} onChange={(e) => setIsBestseller(e.target.value)}>
                <option value="" disabled hidden>Select</option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Control>
                {errors.isBestseller && <div style={{ color: 'red' }}>{errors.isBestseller}</div>}
              </Col>
              <Col xs={6}>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter 'available' or 'unavailable'"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
                {errors.status && <small className="text-danger">{errors.status}</small>}
              </Col>
            </Form.Group>
            <Button variant="primary" type="submit">Submit</Button>
          </Form>
        </Box>
      </Modal>
    </>
  );
}

