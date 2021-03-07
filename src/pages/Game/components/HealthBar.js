import { Component } from 'react';
import ProgressBar from './ProgressBar';

class HealthBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      percentage: props.percentage
    }
  }

  render() {
    return (
      <div>
        <ProgressBar percentage={this.props.percentage}/>
      </div>
    )
  }
}

export default HealthBar;
