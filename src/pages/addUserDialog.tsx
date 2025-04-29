import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Fab,
  Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// User interface based on your model
interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: "ROLE_ADMIN" | "ROLE_EMPLOYEE";
  department: "IT" | "HR" | "FINANCE" | "OPERATIONS";
  createdAt: string;
  updatedAt: string | null;
  profileUrl?: string;
}

// Interface for the form data (omitting id, createdAt, and updatedAt which are handled by the system)
interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  roles: "ROLE_ADMIN" | "ROLE_EMPLOYEE";
  department: "IT" | "HR" | "FINANCE" | "OPERATIONS";
}

interface AddUserProps {
  onAddUser: (user: User) => void;
}

const AddUserDialog: React.FC<AddUserProps> = ({ onAddUser }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    firstName: "",
    lastName: "",
    roles: "ROLE_EMPLOYEE",
    department: "IT",
  });
  const [errors, setErrors] = useState<Partial<UserFormData>>({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset form data and errors
    setFormData({
      email: "",
      firstName: "",
      lastName: "",
      roles: "ROLE_EMPLOYEE",
      department: "IT",
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<UserFormData> = {};
    let isValid = true;

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      isValid = false;
    }

    // First name validation
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      isValid = false;
    }

    // Last name validation
    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Create a new user object
      const newUser: User = {
        ...formData,
        id: Math.floor(Math.random() * 10000), // Generate a random ID (replace with actual logic)
        createdAt: new Date().toISOString(),
        updatedAt: null,
        profileUrl: "/UserImg.png", // Default profile image
      };

      // Call the onAddUser prop function with the new user
      onAddUser(newUser);

      // Close the dialog
      handleClose();
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });

    // Clear error for the field being edited
    if (errors[name as keyof UserFormData]) {
      setErrors({
        ...errors,
        [name as string]: undefined,
      });
    }
  };

  return (
    <>
      <Box position="fixed" bottom={20} right={20}>
        <Tooltip title="Add User">
          <Fab color="primary" aria-label="add" onClick={handleOpen}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the details of the new user to add them to the system.
          </DialogContentText>

          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              value={formData.firstName}
              onChange={handleChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />

            <TextField
              margin="normal"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              value={formData.lastName}
              onChange={handleChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                labelId="role-label"
                id="roles"
                name="roles"
                value={formData.roles}
                label="Role"
                // onChange={handleChange}
              >
                <MenuItem value="ROLE_ADMIN">Admin</MenuItem>
                <MenuItem value="ROLE_EMPLOYEE">Employee</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="department-label">Department</InputLabel>
              <Select
                labelId="department-label"
                id="department"
                name="department"
                value={formData.department}
                label="Department"
                // onChange={handleChange}
              >
                <MenuItem value="IT">IT</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
                <MenuItem value="FINANCE">Finance</MenuItem>
                <MenuItem value="OPERATIONS">Operations</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddUserDialog;
