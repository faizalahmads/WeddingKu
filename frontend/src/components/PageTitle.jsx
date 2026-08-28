import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let title = "WeKu";

    // =========================
    // PUBLIC
    // =========================

    if (pathname === "/") {
      title = "WeKu";
    } else if (pathname === "/login") {
      title = "WeKu - Login";
    } else if (pathname === "/register") {
      title = "WeKu - Register";
    } else if (pathname === "/checkin") {
      title = "WeKu - Check-in Tamu";
    } else if (pathname === "/buku-tamu") {
      title = "WeKu - Buku Tamu";
    }

    // =========================
    // ADMIN
    // =========================
    else if (pathname === "/admin/dashboard") {
      title = "WeKu - Dashboard";
    } else if (pathname === "/admin/data-tamu") {
      title = "WeKu - Data Tamu";
    } else if (pathname === "/admin/undangan-saya") {
      title = "WeKu - Undangan Saya";
    } else if (pathname === "/admin/undangan-management") {
      title = "WeKu - Manajemen Undangan";
    } else if (pathname === "/admin/checkin") {
      title = "WeKu - Check-in";
    }

    // =========================
    // MANAGE INVITE
    // =========================
    else if (pathname.startsWith("/admin/manage-invite/")) {
      title = "WeKu - Kelola Undangan";
    }

    // =========================
    // EDIT INVITE
    // =========================
    else if (pathname.startsWith("/admin/edit-invite/")) {
      title = "WeKu - Edit Undangan";
    }

    // =========================
    // PREVIEW
    // =========================
    else if (pathname.startsWith("/preview-undangan/")) {
      title = "WeKu - Preview Undangan";
    } else if (pathname.startsWith("/preview/")) {
      title = "WeKu - Preview";
    }

    // =========================
    // INVITE
    // =========================
    else if (pathname.startsWith("/invite/")) {
      title = "WeKu - Invitation";
    }

    // =========================
    // PUBLIC WEDDING
    // =========================
    else if (pathname.startsWith("/undangan/")) {
      const slug = pathname.split("/")[2];

      const coupleName = slug.replace(/-/g, " & ");

      title = `WeKu - ${coupleName}`;
    } 
    
    else if (pathname !== "/" && pathname.split("/").length === 2) {
      const slug = pathname.split("/")[1];

      const coupleName = slug.replace(/-/g, " & ");

      title = `WeKu - ${coupleName}`;
    }

    // =========================
    // DEFAULT
    // =========================
    else {
      title = "WeKu";
    }

    document.title = title;
  }, [pathname]);

  return null;
};

export default PageTitle;
