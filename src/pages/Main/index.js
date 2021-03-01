import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as LivesActions } from '../../store/ducks/lives';
import Loading from 'react-loading-animation';

class Main extends Component {

  componentDidMount() {
    const { getLivesRequest } = this.props;
    getLivesRequest();
  }

  render() {
    const {lives} = this.props;
    return <>
      <h1>
        Lives Agora
      </h1>
      {lives.isLoading ? <Loading /> : (
        lives.livesList.map(live => (
          <Card key={live.id} style={{ width: '18rem', marginTop: '24px' }}>
            <Card.Body>
              <Card.Title>{live.league.name}</Card.Title>
              {live.match ? (<Button href={`/events/${live.match.id}`} >Ir</Button>) : <></>}
            </Card.Body>
          </Card>
        ))
      )}
    </>
  }
}

const mapStateToProps = (state) => ({
  lives: state.lives
});

const mapDispatchToProps = (dispatch) => bindActionCreators(LivesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
