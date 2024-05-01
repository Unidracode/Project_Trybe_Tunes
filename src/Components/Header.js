import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <header data-testid="header-component">
        { !user && <Loading /> }
        { user && (
          <>
            <h1 data-testid="header-user-name">{ user.name }</h1>
            <nav>
              <ul>
                <Link to="/search" data-testid="link-to-search">
                  <li>Search</li>
                </Link>
                <Link to="/favorites" data-testid="link-to-favorites">
                  <li>Your Library</li>
                </Link>
                <Link to="/profile" data-testid="link-to-profile">
                  <li>Profile</li>
                </Link>
              </ul>
            </nav>
          </>
        ) }
      </header>
    );
  }
}

export default Header;
