import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as LivesActions } from '../../store/ducks/lives';

class Main extends Component {

  componentDidMount() {
    const { getLivesRequest } = this.props;
    getLivesRequest();
  }

  render() {
    const a = [1, 2, 3];
    return <>
      <h1>
        Lives Agora
      </h1>
      {a.map(el => (
        <Card style={{ width: '18rem', marginTop: '24px' }}>
          <Card.Body>
            <Card.Title>{el}</Card.Title>
            <Card.Text>Mizera mizera</Card.Text>
            <Button>Ir</Button>
          </Card.Body>
        </Card>
      ))}
    </>
  }
}

const mapStateToProps = (state) => ({
  lives: state.lives,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(LivesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
