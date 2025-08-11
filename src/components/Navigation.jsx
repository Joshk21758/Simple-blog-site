import NavLink from "./NavLink";

export default function Navigation() {
  return (
    <div>
      <NavLink label="Home" href="/" />
      <div className="div-class">
        <NavLink label="Login" href="/login" />
        <NavLink label="Register" href="/register" />
        <NavLink label="Contact" href="/contact" />
      </div>
    </div>
  );
}
