export default interface User {
  email: string;
  firstName: string;
  lastName: string;
  roles: "ROLE_ADMIN" | "ROLE_EMPLOYEE";
  department: "IT" | "HR" | "FINANCE" | "OPERATIONS";
  createdAt: string;
  updatedAt: string | null;
}
