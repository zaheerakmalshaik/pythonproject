import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Typography
} from "@mui/material";

import { Edit, Delete, Add } from "@mui/icons-material";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: "",
    quantity: ""
  });

  const loadProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleOpen = (product = null) => {
    if (product) {
      setForm(product);
      setEditingId(product.id);
    } else {
      setForm({ name: "", desc: "", price: "", quantity: "" });
      setEditingId(null);
    }
    setOpen(true);
  };

  const handleSave = async () => {
    const payload = {
      name: form.name,
      desc: form.desc,
      price: Number(form.price),
      quantity: Number(form.quantity)
    };

    if (editingId) {
      await fetch(`${API_URL}/product/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } else {
      await fetch(`${API_URL}/product`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }

    setOpen(false);
    loadProducts();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/product/${id}`, {
      method: "DELETE"
    });
    loadProducts();
  };

  return (
    <Container sx={{ marginTop: 5 }}>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>

      <Button
        variant="contained"
        startIcon={<Add />}
        sx={{ marginBottom: 2 }}
        onClick={() => handleOpen()}
      >
        Add Product
      </Button>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.desc}</TableCell>
                <TableCell>{p.price}</TableCell>
                <TableCell>{p.quantity}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleOpen(p)}>
                    <Edit />
                  </IconButton>
                  <IconButton color="error" onClick={() => handleDelete(p.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          {editingId ? "Update Product" : "Add Product"}
        </DialogTitle>

        <DialogContent>
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Description"
            fullWidth
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Price"
            type="number"
            fullWidth
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />

          <TextField
            margin="dense"
            label="Quantity"
            type="number"
            fullWidth
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
