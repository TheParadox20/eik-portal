import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import {  Pie } from 'react-chartjs-2';
import Top from './Top';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
      display: false,
    },
    title: {
      display: false,
      text: '% Performance',
    },
  },
};

  
export default function Py() {

  let data = {
    labels: ['one', 'two'],
    datasets: [
      {
        data: [76,24],
        backgroundColor: ['#1083AC','rgba(198, 65, 48, 0.2)'],
        borderColor: ['#1083AC','rgba(198, 65, 48, 0.2)'],
      },
    ],
  };

  return (
      <div className='mt-4 md:mt-0 md:w-1/2 md:h-[30vh] h-80'>
        <Top title='Print Certificate Requests' />
        <div className='flex flex-col md:flex-row gap-x-0'>
          <div><Pie data={data} options={options} /></div>
          <div className='lg:text-xs 2xl:text-sm'>
            <div className='flex'>
              <div className='w-5 h-5 rounded-full bg-secondary mt-2 mr-2'></div>
              <div className='flex flex-col gap-y-1'>
                <span>Approved</span>
                <span>76%</span>
              </div>
            </div>
            <div className='flex mt-4'>
              <div className='w-5 h-5 rounded-full bg-[#C64130]/20 mt-2 mr-2'></div>
              <div className='flex flex-col gap-y-1'>
                <span>Rejected</span>
                <span>76%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}