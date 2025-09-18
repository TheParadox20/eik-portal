import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { getDaySuffix, getDatesInRange } from '@/app/lib/dates';
import Top from './Top';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

let colours = ['#1d4ed8','#5b21b6','#3730a3','']
export default function Lyn() {
  let options = {
    maintainAspectRatio: false,
    scaleBeginAtZero: false,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
        text: 'Total Sales'
      },
    },
    scales: {
      y: {
          min:0,
          display: false,
          grid:{
            display: false,
          }
      },
      x:{
        grid:{
          display: true,
        }
      },
    }
  };


  let dates = getDatesInRange([2023,2,2], [2023,2,9]);
  let labels = dates.map((date)=>{
    date = date.split('-');
    return `${date[1].slice(0,3)} ${date[2]}${getDaySuffix(date[2])}`
  })



const data = {
  labels,
  datasets: [
    {
      data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 401) + 100),
      cubicInterpolationMode: 'monotone',
      backgroundColor: '#1083AC',
      borderColor: '#1083AC',
      borderWidth: 2,
    },
  ]
};

  return(
        <div className='h-[30vh] mt-4 2xl:mt-0'>
          <Top title='Total Revenue' />
          <Line options={options} data={data} />
        </div>
  )
}
  