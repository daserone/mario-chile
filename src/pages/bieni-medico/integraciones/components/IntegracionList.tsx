import CardIntegracion from "./CardIntegracion";
import logoClinic from "@src/assets/images/logo/logo.png";

interface integracionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const cards: integracionCard[] = [
  {
    id: "1",
    title: "Agendapacs",
    description:
      "Solicitud de agendamiento con el sistema de agendapacs los centros de: Radimagen, CRM y CDI.",
    icon: logoClinic,
  },
  {
    id: "2",
    title: "TuRecetaWeb",
    description:
      "Generación de ordenes y recetas online con TuRecetaWeb. Integración en farmacias mediante cédula del paciente. ",
    icon: logoClinic,
  },
  {
    id: "3",
    title: "BieniWallet",
    description:
      "Le ofrecemos servicios de medicina general durante las temporadas navideñas.",
    icon: logoClinic,
  },
];
const IntegracionList = () => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {cards.map((card) => (
        <CardIntegracion card={card} key={card.id} />
      ))}
    </div>
  );
};

export default IntegracionList;
