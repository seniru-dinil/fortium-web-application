import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Alert,
  Snackbar,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AddUserDialog from "./addUserDialog";

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

const UserManagementPage: React.FC = () => {
  // State for users
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      email: "john.doe@example.com",
      firstName: "John",
      lastName: "Doe",
      roles: "ROLE_ADMIN",
      department: "IT",
      createdAt: "2025-04-15T10:30:00Z",
      updatedAt: "2025-04-20T14:22:00Z",
      profileUrl: "/UserImg.png",
    },
    {
      id: 2,
      email: "jane.smith@example.com",
      firstName: "Jane",
      lastName: "Smith",
      roles: "ROLE_EMPLOYEE",
      department: "HR",
      createdAt: "2025-04-10T09:15:00Z",
      updatedAt: null,
      profileUrl: "/UserImg.png",
    },
    {
      id: 3,
      email: "robert.johnson@example.com",
      firstName: "Robert",
      lastName: "Johnson",
      roles: "ROLE_EMPLOYEE",
      department: "FINANCE",
      createdAt: "2025-03-22T14:45:00Z",
      updatedAt: "2025-04-15T09:30:00Z",
      profileUrl: "/UserImg.png",
    },
  ]);

  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // State for search
  const [searchTerm, setSearchTerm] = useState("");

  // State for delete confirmation
  const [deleteUserId, setDeleteUserId] = useState<number | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // State for notifications
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  // Filter users based on search term
  const filteredUsers = users.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.email.toLowerCase().includes(searchLower) ||
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.department.toLowerCase().includes(searchLower) ||
      user.roles.toLowerCase().includes(searchLower)
    );
  });

  // Handle page change
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0); // Reset to first page when searching
  };

  // Handle delete user click
  const handleDeleteClick = (userId: number) => {
    setDeleteUserId(userId);
    setDeleteDialogOpen(true);
  };

  // Confirm delete user
  const handleConfirmDelete = () => {
    if (deleteUserId !== null) {
      setUsers(users.filter((user) => user.id !== deleteUserId));
      setSnackbar({
        open: true,
        message: "User deleted successfully",
        severity: "success",
      });
    }
    setDeleteDialogOpen(false);
    setDeleteUserId(null);
  };

  // Cancel delete user
  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setDeleteUserId(null);
  };

  // Add new user
  const handleAddUser = (newUser: User) => {
    setUsers([...users, newUser]);
    setSnackbar({
      open: true,
      message: "User added successfully",
      severity: "success",
    });
  };

  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar({
      ...snackbar,
      open: false,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            User Management
          </Typography>

          <TextField
            size="small"
            label="Search Users"
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell style={{ textWrap: "nowrap" }}>
                  Profile Image
                </TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Updated Date</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Roles</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell
                      style={{ display: "grid", placeItems: "center" }}
                    >
                      <Avatar
                        src={user.profileUrl || "/UserImg.png"}
                        alt={`${user.firstName} ${user.lastName}`}
                        sx={{ width: 40, height: 40 }}
                      />
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                    <TableCell>
                      {new Date(user.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {user.updatedAt
                        ? new Date(user.updatedAt).toLocaleString()
                        : "-"}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.department}
                        size="small"
                        color="default"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={user.roles.replace("ROLE_", "")}
                        size="small"
                        color={
                          user.roles === "ROLE_ADMIN" ? "error" : "primary"
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(user.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No users found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredUsers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Add User Dialog */}
      <AddUserDialog onAddUser={handleAddUser} />

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this user? This action cannot be
            undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default UserManagementPage;
