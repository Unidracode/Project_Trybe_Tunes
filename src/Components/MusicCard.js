import React from 'react';
import PropTypes from 'prop-types';

export default class MusicCard extends React.Component {
  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      fetchToFavorite,
      songObj,
      checked,
    } = this.props;
    return (
      <div>
        <h5>{trackName}</h5>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          {' '}
          <code>audio</code>
          .
        </audio>
        <div>
          <label htmlFor="favorite">
            Favorita
            <input
              type="checkbox"
              name="favoriteCheck"
              id="favorite"
              checked={ checked }
              onChange={ (e) => fetchToFavorite(e, songObj) }
              data-testid={ `checkbox-music-${trackId}` }
            />
          </label>
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  fetchToFavorite: PropTypes.func.isRequired,
  songObj: PropTypes.shape({
    previewUrl: PropTypes.string,
    trackName: PropTypes.string,
    trackId: PropTypes.number,
  }).isRequired,
  checked: PropTypes.bool.isRequired,
};
