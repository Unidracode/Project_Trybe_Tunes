import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../Components/Loading';

export default class Profile extends React.Component {
  state = {
    loading: true,
    userInfo: {},
  };

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userInfo = await getUser();
    this.setState({
      userInfo: { ...userInfo },
    }, () => {
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { loading, userInfo } = this.state;
    const { name, email, image, description } = userInfo;
    return (
      <>
        <Header />
        <div data-testid="page-profile">
          {loading ? <Loading /> : (
            <div>
              <img src={ image } alt={ name } data-testid="profile-image" />
              <h4>{name}</h4>
              <p>{email}</p>
              <p>{description}</p>
              <button type="button">
                <Link
                  to="/profile/edit"
                >
                  Editar perfil
                </Link>
              </button>
            </div>
          )}
        </div>
      </>
    );
  }
}
