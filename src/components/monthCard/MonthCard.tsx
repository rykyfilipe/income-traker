import './MonthCard.css';
import './../headerCard/HeaderCard.css';

function MonthCard() {

  const date = new Date();
  const month = date.toLocaleString('default', { month: 'long' });

  return (
    <div className="month-card header-card">
        <h2>{month}</h2>
    </div>
  )
}

export default MonthCard