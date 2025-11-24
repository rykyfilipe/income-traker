import './HeaderCard.css'
import { useTheme } from '../../context/ThemeContext'

interface Props{
    name:string;
    sold : number;
}

function HeaderCard({name, sold}:Props) {
  const { colors, currency } = useTheme();
  
  return (
    <div className="header-card-container header-card">
        <div style={{
          background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          width:'100%',
          height:'100%', 
          textAlign:'center',
          padding:'5px'
        }}>
            <h2 className='header-card-title'>{name}</h2>
        </div>
        <h2 style={{margin: '10px 0'}}>{currency}{sold.toFixed(2)}</h2>
    </div>
  )
}

export default HeaderCard