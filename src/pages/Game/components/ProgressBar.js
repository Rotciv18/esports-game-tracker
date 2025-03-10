import Filler from './Filler';
import './styles.css';

const ProgressBar = (props) => {
  return (
    <div className='progress-bar'>
      <Filler percentage={props.percentage}/>
    </div>
  )
}

export default ProgressBar;
