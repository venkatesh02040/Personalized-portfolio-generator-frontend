import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/dashboard" end>
        Overview
      </NavLink>

      <NavLink to="/dashboard/create">
        Create Portfolio
      </NavLink>

      <NavLink to="/dashboard/edit">
        Edit Portfolio
      </NavLink>

      <NavLink to="/dashboard/templates">
        Templates
      </NavLink>

      <NavLink to="/dashboard/settings">
        Settings
      </NavLink>
    </div>
  );
};

export default Sidebar;
