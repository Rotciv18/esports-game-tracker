import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as GameActions } from '../../store/ducks/game';
import Loading from 'react-loading-animation';
import { format, parseISO } from 'date-fns';

class Game extends Component {

  componentDidMount() {
  
    const { getGameRequest, startingDate } = this.props;

    const { id } = this.props.match.params;
    const date = new Date();
    const seconds = date.getSeconds().toString();
    date.setMilliseconds(0);
    date.setSeconds(`${seconds[0] - 10}0`);

    if (startingDate) {
      getGameRequest(id, startingDate);
      console.log(startingDate);
    } else {
      getGameRequest(id, date);
      console.log(date.toISOString());
    }

    setInterval(this.updateData, 2000);
  }

  updateData = () => {
    const { getGameRequest, startingDate } = this.props;

    const { id } = this.props.match.params;
    const date = new Date();
    const seconds = date.getSeconds().toString();
    date.setMilliseconds(0);
    date.setSeconds(`${seconds[0]}0`);

    if (startingDate) {
      getGameRequest(id, startingDate);
      console.log(startingDate);
    } else {
      getGameRequest(id, date);
      console.log(date.toISOString());
    }
  }

  render() {
    const { game, isLoading } = this.props;
    const frame = game.frames ? game.frames[game.frames.length - 1] : undefined;

    return <> 
      {!frame ? <Loading /> : (
        <>
        <h1>Dados capturados em: {format(parseISO(frame.rfc460Timestamp), 'dd-MM-yyyy HH:mm:ss')}</h1>
        <Table style={{ marginTop: '62px' }}>
          <thead>
            <tr>
              <th>Azul</th>
              <th>Gold Total</th>
              <th>Inibidores</th>
              <th>Torres</th>
              <th>Barons</th>
              <th>Kills</th>
              <th>Dragões</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>{frame.blueTeam.totalGold}</td>
              <td>{frame.blueTeam.inhibitors}</td>
              <td>{frame.blueTeam.towers}</td>
              <td>{frame.blueTeam.barons}</td>
              <td>{frame.blueTeam.totalKills}</td>
              <td>{frame.blueTeam.dragons.length}</td>
            </tr>
          </tbody>
        </Table>


        <Table style={{ marginTop: '62px' }}>
          <thead>
            <tr>
              <th>Vermelho</th>
              <th>Gold Total</th>
              <th>Inibidores</th>
              <th>Torres</th>
              <th>Barons</th>
              <th>Kills</th>
              <th>Dragões</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>{frame.redTeam.totalGold}</td>
              <td>{frame.redTeam.inhibitors}</td>
              <td>{frame.redTeam.towers}</td>
              <td>{frame.redTeam.barons}</td>
              <td>{frame.redTeam.totalKills}</td>
              <td>{frame.redTeam.dragons.length}</td>
            </tr>
          </tbody>
        </Table>

        <Table style={{ marginTop: '62px' }}>
          <thead>
            <tr>
              <td>Campeão</td>
              <td>Gold total</td>
              <td>Level</td>
              <td>Kills</td>
              <td>Mortes</td>
              <td>Assists</td>
              <td>CS</td>
              <td>HP atual</td>
              <td>HP máximo</td>
            </tr>
          </thead>
          <tbody>
            {frame.blueTeam.participants.map(player => (
              <tr>
                <td>{game.gameMetadata.blueTeamMetadata.participantMetadata[player.participantId - 1].championId}</td>
                <td>{player.totalGold}</td>
                <td>{player.level}</td>
                <td>{player.kills}</td>
                <td>{player.deaths}</td>
                <td>{player.assists}</td>
                <td>{player.creepScore}</td>
                <td>{player.currentHealth}</td>
                <td>{player.maxHealth}</td>
              </tr>
            ))}
            {frame.redTeam.participants.map(player => (
              <tr>
                <td>{game.gameMetadata.redTeamMetadata.participantMetadata[player.participantId - 6].championId}</td>
                <td>{player.totalGold}</td>
                <td>{player.level}</td>
                <td>{player.kills}</td>
                <td>{player.deaths}</td>
                <td>{player.assists}</td>
                <td>{player.creepScore}</td>
                <td>{player.currentHealth}</td>
                <td>{player.maxHealth}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </>
      )}
    </>
  }
}

const mapStateToProps = (state) => ({
  gameDuck: state.game,
  game: state.game.game,
  isLoading: state.game.isLoading,
  startingDate: state.game.startingDate
});

const mapDispatchToProps = (dispatch) => bindActionCreators(GameActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
