import React from 'react';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import MusicCard from '../Components/MusicCard';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

export default class Favorites extends React.Component {
  state = {
    loading: true,
    savedSongs: [],
    favoriteSong: [],
  };

  componentDidMount() {
    this.getFavoriteSongsFromLocalStorage();
  }

  getFavoriteSongsFromLocalStorage = async () => {
    const { savedSongs } = this.state;
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      favoriteSong: [...savedSongs, ...favoriteSongs.map((song) => song.trackId)],
    }, () => {
      savedSongs.push(...favoriteSongs);
      this.setState({
        loading: false,
      });
    });
  };

  fetchToFavorite = async ({ target }, obj) => {
    const { favoriteSong, savedSongs } = this.state;
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
      }, () => {
        this.setState({
          savedSongs: savedSongs.filter((songInfo) => songInfo !== obj),
          favoriteSong: favoriteSong.filter((id) => id !== obj.trackId),
        });
      });
    }
  };

  render() {
    const { loading, savedSongs, favoriteSong } = this.state;
    return (
      <>
        <Header />
        <h1>Favoritas</h1>
        <div data-testid="page-favorites">
          {loading ? <Loading /> : (
            savedSongs.map((song) => (
              <MusicCard
                previewUrl={ song.previewUrl }
                trackName={ song.trackName }
                trackId={ song.trackId }
                checked={ favoriteSong
                  .some((favSong) => song.trackId === favSong) }
                fetchToFavorite={ this.fetchToFavorite }
                songObj={ song }
                key={ song.trackNumber }
              />))
          )}
        </div>
      </>
    );
  }
}
