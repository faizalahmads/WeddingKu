import { useLocation, NavLink } from "react-router-dom";
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

const Sidebar = ({ isOpen, role }) => {
  const location = useLocation();

  const menusByRole = {
    admin: [
      {
        to: "/admin/dashboard",
        label: "Dashboard",
        icon: IoGridOutline,
      },
      {
        to: "/admin/undangan-saya",
        label: "My Invitation",
        icon: IoPeopleOutline,
      },
      {
        to: "/admin/data-tamu",
        label: "Guest-list",
        icon: IoMailOutline,
      },
      {
        to: "/admin/checkin",
        label: "Scanner",
        icon: IoSettingsOutline,
      },
    ],

    penerima_tamu: [
      {
        to: `/checkin${location.search}`,
        label: "Check-in",
        icon: IoSettingsOutline,
      },
      {
        to: `/buku-tamu${location.search}`,
        label: "Buku Tamu",
        icon: IoPeopleOutline,
      },
    ],

    super_admin: [
      {
        to: "/dashboard/super",
        label: "Dashboard",
        icon: IoGridOutline,
      },
      {
        to: "/dashboard/tema",
        label: "Tema",
        icon: IoPeopleOutline,
      },
      {
        to: "/dashboard/user",
        label: "User",
        icon: IoPeopleOutline,
      },
      {
        to: "/dashboard/laporan",
        label: "Laporan",
        icon: IoMailOutline,
      },
      {
        to: "/dashboard/pengaturan",
        label: "Pengaturan",
        icon: IoSettingsOutline,
      },
    ],
  };

  const menus = menusByRole[role] || [];

  return (
    <aside className={`admin-sidebar ${isOpen ? "open" : "closed"}`}>
      <nav className="sidebar-menu">
        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.to}
              to={menu.to}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={18} className="me-2" />
              {menu.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {role === "admin" && (
          <button className="btn-create-event">
            <IoAddCircleOutline size={16} className="me-1" />
            Create New Event
          </button>
        )}

        <a href="/help" className="sidebar-footer-link">
          <IoHelpCircleOutline size={16} className="me-1" />
          Help Center
        </a>

        {role !== "penerima_tamu" && (
          <button className="sidebar-footer-link logout-btn">
            <IoLogOutOutline size={16} className="me-1" />
            Logout
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
