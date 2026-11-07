import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const colorTexto = '#c7d5e0'
const colorGrilla = 'rgba(255, 255, 255, 0.08)'

const opciones = {
  indexAxis: 'y',
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    title: {
      display: true,
      text: 'Juegos por categoría',
      color: colorTexto,
      font: { size: 16 }
    }
  },
  scales: {
    x: {
      beginAtZero: true,
      ticks: { stepSize: 1, color: colorTexto },
      grid: { color: colorGrilla }
    },
    y: {
      ticks: { color: colorTexto, autoSkip: false },
      grid: { display: false }
    }
  }
}

const GraficoCategorias = ({ etiquetas, cantidades }) => {
  const datos = {
    labels: etiquetas,
    datasets: [
      {
        label: 'Juegos',
        data: cantidades,
        backgroundColor: '#66c0f4',
        borderRadius: 4
      }
    ]
  }

  const alto = etiquetas.length * 32 + 80

  return (
    <div className="grafico-categorias" style={{ height: alto }}>
      <Bar options={opciones} data={datos} />
    </div>
  )
}

export default GraficoCategorias
