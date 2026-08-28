import flower from "../../../../../assets/images/tema3/bungaJuntaiHijau.svg";
import line from "../../../../../assets/images/tema3/line.svg";
import building from "../../../../../assets/images/tema3/building.svg";

const DateCatinTema3 = () => {
  return (
    <section className="section6">
      <div className="save-date-wrapper">
        {/* =========================
            FLOWER
        ========================== */}
        <img src={flower} alt="" className="save-date-flower" />

        {/* =========================
            SAVE
        ========================== */}
        <div className="save-text-3">Save</div>

        {/* =========================
            THE
        ========================== */}
        <div className="the-text">the</div>

        {/* =========================
            DATE
        ========================== */}
        <div className="date-text">Date</div>

        {/* =========================
            MONTH
        ========================== */}
        <div className="month-text">SEPTEMBER</div>

        {/* =========================
            EVENT INFORMATION
        ========================== */}
        <div className="event-wrapper">
          {/* AKAD */}
          <div className="event-column akad-column">
            <img src={line} alt="" className="event-line" />

            <div className="event-name">Akad</div>

            <div className="event-time">Pukul 08.00 WIB</div>

            <img src={line} alt="" className="event-line" />
          </div>

          {/* DATE */}
          <div className="event-day">26</div>

          {/* RESEPSI */}
          <div className="event-column resepsi-column">
            <img src={line} alt="" className="event-line" />

            <div className="event-name">Resepsi</div>

            <div className="event-time">Pukul 11.00 WIB</div>

            <img src={line} alt="" className="event-line" />
          </div>
        </div>

        {/* =========================
            YEAR
        ========================== */}
        <div className="year-text">2026</div>

        {/* =========================
            BUILDING
        ========================== */}
        <img src={building} alt="" className="save-date-building" />
      </div>
    </section>
  );
};

export default DateCatinTema3;
