export default interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: "ROLE_ADMIN" | "ROLE_EMPLOYEE";
  department: "IT" | "HR" | "FINANCE" | "OPERATIONS";
  createdAt: string;
  updatedAt: string | null;
}
