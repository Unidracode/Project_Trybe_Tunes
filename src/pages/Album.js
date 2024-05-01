import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';
import Loading from '../Components/Loading';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  state = {
    albumSongs: [],
    albumInfo: {},
    loading: false,
    favoriteSong: [],
  };

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.fetchMusic(id);
    this.getFromFavorite();
  }

  fetchMusic = async (id) => {
    this.setState({ loading: true });
    const albumResults = await getMusics(id);
    const { albumSongs } = this.state;
    albumResults.forEach((result, i) => ((i === 0)
      ? this.setAlbumInfo(result)
      : albumSongs.push(result)));
    this.setState({
      loading: false,
    });
  };

  fetchToFavorite = async ({ target }, obj) => {
    const { favoriteSong } = this.state;
    if (target.checked) {
      this.setState({ loading: true });
      await addSong(obj);
      this.setState({
        loading: false,
        favoriteSong: [...favoriteSong, obj.trackId],
      });
    } else {
      this.setState({ loading: true });
      await removeSong(obj);
      this.setState({
        loading: false,
        favoriteSong: favoriteSong.filter((id) => id !== obj.trackId),
      });
    }
  };

  getFromFavorite = async () => {
    const { favoriteSong } = this.state;
    this.setState({ loading: true });
    const result = await getFavoriteSongs();
    this.setState({
      loading: false,
      favoriteSong: [...favoriteSong, ...result.map((song) => song.trackId)],
    });
  };

  setAlbumInfo = (info) => {
    this.setState({
      albumInfo: info,
    }, () => {
      this.setState({ loading: false });
    });
  };

  render() {
    const { albumInfo,
      albumSongs,
      loading,
      favoriteSong,

    } = this.state;

    return (
      <>
        <Header />
        <div data-testid="page-album">
          { loading ? <Loading />
            : (
              <>
                <div className="album-title">
                  <h3 data-testid="artist-name">{albumInfo.artistName}</h3>
                  <img
                    src={ albumInfo.artworkUrl100 }
                    alt={ albumInfo.collectionName }
                    className="collection-image-album"
                  />
                  <h4 data-testid="album-name">{albumInfo.collectionName}</h4>
                </div>
                <div className="album-cards-container">
                  {albumSongs.map((song) => (
                    <MusicCard
                      previewUrl={ song.previewUrl }
                      trackName={ song.trackName }
                      trackId={ song.trackId }
                      checked={ favoriteSong
                        .some((favSong) => song.trackId === favSong) }
                      fetchToFavorite={ this.fetchToFavorite }
                      songObj={ song }
                      key={ song.trackNumber }
                    />))}
                </div>
              </>
            )}
        </div>
      </>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
  params: PropTypes.objectOf(PropTypes.string).isRequired,
  id: PropTypes.string.isRequired,
};
