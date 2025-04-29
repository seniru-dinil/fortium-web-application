import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { getUsers, createUser, deleteUser, updateUser } from "../api/userApi";
import User from "../model/user.model";

const emptyUser: Omit<User, "createdAt" | "updatedAt"> = {
  id: 0,
  email: "",
  firstName: "",
  lastName: "",
  roles: "ROLE_EMPLOYEE",
  department: "IT",
};

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] =
    useState<Omit<User, "createdAt" | "updatedAt">>(emptyUser);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenDialog = (user?: User) => {
    if (user) {
      const { createdAt, updatedAt, ...rest } = user;
      setFormData(rest);
      setEditingEmail(user.email);
    } else {
      setFormData(emptyUser);
      setEditingEmail(null);
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setFormData(emptyUser);
    setEditingEmail(null);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    if (editingEmail) {
      await updateUser(editingEmail, formData);
    } else {
      await createUser(formData);
    }
    fetchUsers();
    handleCloseDialog();
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    fetchUsers();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        User Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => handleOpenDialog()}
      >
        Create User
      </Button>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Email</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.email}>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.roles}</TableCell>
                <TableCell>{user.department}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleOpenDialog(user)} size="small">
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(user.id)}
                    color="error"
                    size="small"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>{editingEmail ? "Edit User" : "Create User"}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleFormChange}
            fullWidth
            disabled={!!editingEmail}
          />
          <TextField
            margin="dense"
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleFormChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Role"
            name="roles"
            select
            value={formData.roles}
            onChange={handleFormChange}
            fullWidth
          >
            <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
            <MenuItem value="ROLE_EMPLOYEE">Employee</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            label="Department"
            name="department"
            select
            value={formData.department}
            onChange={handleFormChange}
            fullWidth
          >
            <MenuItem value="IT">IT</MenuItem>
            <MenuItem value="HR">HR</MenuItem>
            <MenuItem value="FINANCE">Finance</MenuItem>
            <MenuItem value="OPERATIONS">Operations</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            {editingEmail ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserTable;
