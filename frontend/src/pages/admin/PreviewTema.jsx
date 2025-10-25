import { useParams } from "react-router-dom";
import PreviewTema1 from "./PreviewTema1";
import PreviewTema2 from "./PreviewTema2";

const PreviewTema = () => {
  const { id } = useParams();

  switch (id) {
    case "1":
      return <PreviewTema1 />;
    case "2":
      return <PreviewTema2 />;
    default:
      return <div>Tema tidak ditemukan</div>;
  }
};

export default PreviewTema;
