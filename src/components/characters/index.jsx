import React from 'react';

import session from '../wowser/session';

class CharactersScreen extends React.Component {

  static id = 'characters';
  static title = 'Character Selection';

  constructor() {
    super();

    this.state = {
      character: null,
      characters: []
    };

    this._onCharacterSelect = ::this._onCharacterSelect;
    this._onJoin = ::this._onJoin;
    this._onRefresh = ::this._onRefresh;
    this._onSubmit = ::this._onSubmit;

    session.characters.on('refresh', this._onRefresh);
    session.game.on('join', this._onJoin);

    this.refresh();
  }

  componentWillUnmount() {
    session.characters.removeListener('refresh', this._onRefresh);
    session.game.removeListener('join', this._onJoin);
  }

  join(character) {
    session.game.join(character);
  }

  refresh() {
    session.characters.refresh();
  }

  _onCharacterSelect(event) {
    this.setState({ 
      index : event.target.value,
      character: this.state.characters[event.target.value] 
    });
  }

  _onJoin() {
    session.screen = 'game';
  }

  _onRefresh() {
    const characters = session.characters.list;
    this.setState({
      character: characters[0],
      characters: characters
    });
  }

  _onSubmit(event) {
    event.preventDefault();
    this.join(this.state.character);
  }

  render() {
    return (
      <characters className="characters screen">
        <div className="panel">
          <h1>Character Selection</h1>

          <div className="divider"></div>

          <p>
            If you want to create a character, please use the Desktop Client
          </p>

          <form onSubmit={ this._onSubmit }>
            <fieldset>
              <select value={ this.state.index }
                      onChange={ this._onCharacterSelect }>
                { this.state.characters.map((character, index) => {
                  return (
                    <option key={index} value={ index }>
                      { character.name }
                    </option>
                  );
                }) }
              </select>
            </fieldset>

            <div className="divider"></div>

            <input type="submit" value="Join world" autoFocus />
            <input type="button" value="Refresh" onClick={ this.refresh } />
          </form>
        </div>
      </characters>
    );
  }

}

export default CharactersScreen;
