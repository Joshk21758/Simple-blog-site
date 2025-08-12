import { authUser } from "@/lib/authUser";
import NavLink from "./NavLink";

export default async function Navigation() {
  //get auth user
  const getAuthUser = await authUser();
  return (
    <div>
      <NavLink label="Home" href="/" />
      {getAuthUser ? (
        <div className="div-class">
          <NavLink label="New Post" href="/postz/create" />
          <NavLink label="Dashboard" href="/dashboard" />
          <NavLink label="Logout" href="/" />
        </div>
      ) : (
        <div className="div-class">
          <NavLink label="Login" href="/login" />
          <NavLink label="Register" href="/register" />
          <NavLink label="Contact" href="/contact" />
        </div>
      )}
    </div>
  );
}
