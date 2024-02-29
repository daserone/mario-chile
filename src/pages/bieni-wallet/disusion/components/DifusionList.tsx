import CardDifusion from "./CardDifusion";

interface difusionCard {
  id: string;
  title: string;
  description: string;
  isActive: boolean;
}

const cards: difusionCard[] = [
  {
    id: "1",
    title: "CSS Vacunas",
    description:
      "Solicitud de agendamiento con el sistema de agendapacs los centros de: Radimagen, CRM y CDI.",
    isActive: true,
  },
  {
    id: "2",
    title: "TuRecetaWeb",
    description:
      "Generación de ordenes y recetas online con TuRecetaWeb. Integración en farmacias mediante cédula del paciente. ",
    isActive: true,
  },
  {
    id: "3",
    title: "CRM",
    description:
      "Le ofrecemos servicios de medicina general durante las temporadas navideñas.",
    isActive: true,
  },
  {
    id: "4",
    title: "Minimed",
    description:
      "Le ofrecemos servicios de medicina general durante las temporadas navideñas.",
    isActive: true,
  },
  {
    id: "5",
    title: "Radimagen",
    description:
      "Le ofrecemos servicios de medicina general durante las temporadas navideñas.",
    isActive: false,
  },
];
const DifusionList = () => {
  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {cards.map((card) => (
        <CardDifusion card={card} key={card.id} />
      ))}
    </div>
  );
};

export default DifusionList;
