import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Creators as GameActions } from '../../store/ducks/game';
import Loading from 'react-loading-animation';
import { format, parseISO } from 'date-fns';
import HealthBar from './components/HealthBar';

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
    } else {
      getGameRequest(id, date);
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
      console.log(`Buscando em ${format(startingDate, 'hh:mm:ss')}`);
    } else {
      getGameRequest(id, date);
    }
  }

  getPercentage(initialValue, finalValue) {
    console.log(`${finalValue} ----- ${initialValue}`)
    // console.log('Returning ' + Math.trunc(((finalValue - initialValue) / initialValue * 100) * - 1));
    return Math.trunc(((finalValue - initialValue) / initialValue * 100) + 100);
  }

  render() {
    const { game } = this.props;
    const frame = game.frames ? game.frames[game.frames.length - 1] : undefined;
    const redTeamKillsColor = game.frames ? (frame.blueTeam.totalKills > frame.redTeam.totalKills ? 'orange' : 'chartreuse') : undefined;
    const blueTeamKillsColor = redTeamKillsColor === 'orange' ? 'chartreuse' : 'orange';

    return <>
      {!frame ? <Loading /> : (
        <>
          <h1>Dados capturados em: {format(parseISO(frame.rfc460Timestamp), 'dd-MM-yyyy HH:mm:ss')}</h1>
          <Table style={{ marginTop: '62px' }} striped bordered hover variant='dark' responsive='md'>
            <thead>
              <tr>
                <th>Time</th>
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
                <td style={{color: 'blue', fontWeight: 'bold'}}>Azul</td>
                <td>{frame.blueTeam.totalGold}</td>
                <td>{frame.blueTeam.inhibitors}</td>
                <td>{frame.blueTeam.towers}</td>
                <td>{frame.blueTeam.barons}</td>
                <td style={{ color: blueTeamKillsColor, fontWeight: 'bold' }}>{frame.blueTeam.totalKills}</td>
                <td>{frame.blueTeam.dragons.join()}</td>
              </tr>
              <tr>
                <td style={{color: 'red', fontWeight: 'bold'}}>Vermelho</td>
                <td>{frame.redTeam.totalGold}</td>
                <td>{frame.redTeam.inhibitors}</td>
                <td>{frame.redTeam.towers}</td>
                <td>{frame.redTeam.barons}</td>
                <td style={{ color: redTeamKillsColor, fontWeight: 'bold' }}>{frame.redTeam.totalKills}</td>
                <td>{frame.redTeam.dragons.join()}</td>
              </tr>
            </tbody>
          </Table>

          <Table style={{ marginTop: '62px' }} striped bordered hover>
            <thead>
              <tr>
                <td>Campeão</td>
                <td>Gold total</td>
                <td>Level</td>
                <td>Kills</td>
                <td>Mortes</td>
                <td>Assists</td>
                <td>CS</td>
                <td style={{width: '300px'}}>HP atual</td>
                <td>HP máximo</td>
              </tr>
            </thead>
            <tbody>
              {frame.blueTeam.participants.map(player => (
                <tr>
                  <td style={{ color: 'blue' }}>{game.gameMetadata.blueTeamMetadata.participantMetadata[player.participantId - 1].championId}</td>
                  <td>{player.totalGold}</td>
                  <td>{player.level}</td>
                  <td>{player.kills}</td>
                  <td>{player.deaths}</td>
                  <td>{player.assists}</td>
                  <td>{player.creepScore}</td>
                  <td>
                    <HealthBar percentage={this.getPercentage(player.maxHealth, player.currentHealth)} />
                  </td>
                  <td>{player.maxHealth}</td>
                </tr>
              ))}
              <hr />
              {frame.redTeam.participants.map(player => (
                <tr>
                  <td style={{ color: 'red' }}>{game.gameMetadata.redTeamMetadata.participantMetadata[player.participantId - 6].championId}</td>
                  <td>{player.totalGold}</td>
                  <td>{player.level}</td>
                  <td>{player.kills}</td>
                  <td>{player.deaths}</td>
                  <td>{player.assists}</td>
                  <td>{player.creepScore}</td>
                  <td>
                    <HealthBar percentage={this.getPercentage(player.maxHealth, player.currentHealth)} />
                  </td>
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
  game: state.game.game,
  startingDate: state.game.startingDate
});

const mapDispatchToProps = (dispatch) => bindActionCreators(GameActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Game);
