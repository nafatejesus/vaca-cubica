import {BarChart3} from "lucide-react";
import "./ChartPlaceholder.css";

/**
 * Espacio reservado para una gráfica futura (ej. generada con Python).
 * title/subtitle: encabezado de la tarjeta, igual que las demás tarjetas.
 * height: alto del área de la gráfica en px.
 */
const ChartPlaceholder = ({title, subtitle, badge, height = 220}) => {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <div>
          <h3>{title}</h3>
          {subtitle && <p className="chart-subtitle">{subtitle}</p>}
        </div>
        {badge && <span className="chart-badge">{badge}</span>}
      </div>
      <div className="chart-placeholder-box" style={{height}}>
        <BarChart3 size={28} />
        <p>Gráfica en desarrollo</p>
        <span>Se conectará próximamente</span>
      </div>
    </div>
  );
};

export default ChartPlaceholder;
