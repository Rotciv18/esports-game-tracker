import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as EventActions } from '../../store/ducks/event';
import Loading from 'react-loading-animation';

class Events extends Component {

  componentDidMount() {
    const { getEventRequest } = this.props;
    const { id } = this.props.match.params;
    getEventRequest(id);
  }

  render() {
    const { event, isLoading } = this.props;
    return isLoading ? <Loading /> :
      <>
        <h1>
          Eventos Agora
      </h1>
          <Card style={{ width: '18rem', marginTop: '24px' }}>
            <Card.Body>
              <Card.Title>{`${event.match.teams[0].name} vs ${event.match.teams[1].name}`}</Card.Title>
              {event.match.games.map(game => {
                if (game.state === 'inProgress') return (
                  <Button key={game.id} href={`/game/${game.id}`} >{`Jogo ${game.number}`}</Button>
                )
              })}
            </Card.Body>
          </Card>
      </>
  }
}

const mapStateToProps = (state) => ({
  event: state.event.event,
  isLoading: state.event.isLoading
});

const mapDispatchToProps = (dispatch) => bindActionCreators(EventActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Events);
