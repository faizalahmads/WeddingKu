import { NavLink } from "react-router-dom";
import {
  IoGridOutline,
  IoPeopleOutline,
  IoMailOutline,
  IoSettingsOutline,
  IoAddCircleOutline,
  IoHelpCircleOutline,
  IoLogOutOutline,
} from "react-icons/io5";
import "../assets/css/Sidebar.css";

const Sidebar = ({ isOpen }) => {
  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : "closed"}`}>
      <nav className="sidebar-menu">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <IoGridOutline size={18} className="me-2" />
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/undangan-saya"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <IoPeopleOutline size={18} className="me-2" />
          My Invitation
        </NavLink>
        <NavLink
          to="/admin/data-tamu"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <IoMailOutline size={18} className="me-2" />
          Guest-list
        </NavLink>
        <NavLink
          to="/admin/checkin"
          className={({ isActive }) =>
            `sidebar-link ${isActive ? "active" : ""}`
          }
        >
          <IoSettingsOutline size={18} className="me-2" />
          Scanner
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <button className="btn-create-event">
          <IoAddCircleOutline size={16} className="me-1" />
          Create New Event
        </button>

        <a href="/help" className="sidebar-footer-link">
          <IoHelpCircleOutline size={16} className="me-1" />
          Help Center
        </a>
        <button className="sidebar-footer-link logout-btn">
          <IoLogOutOutline size={16} className="me-1" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
