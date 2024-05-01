import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Loading from '../Components/Loading';

class Login extends React.Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateUser = this.handleCreateUser.bind(this);

    this.state = {
      name: '',
      buttonDisabled: true,
      loading: false,
      userCreated: false,
    };
  }

  handleInputChange({ target }) {
    const name = target.value;
    const minLength = 3;
    if (name.length >= minLength) {
      this.setState({ name, buttonDisabled: false });
    } else {
      this.setState({ name, buttonDisabled: true });
    }
  }

  async handleCreateUser() {
    this.setState({ loading: true });

    const { name } = this.state;
    await createUser({ name });

    this.setState({
      userCreated: true,
    });
  }

  render() {
    const { buttonDisabled, loading, userCreated } = this.state;

    return (
      <div data-testid="page-login">
        { userCreated && <Redirect to="/search" /> }
        { loading && <Loading /> }
        { !loading && (
          <form onSubmit={ this.handleCreateUser }>
            <input
              data-testid="login-name-input"
              type="text"
              placeholder="Enter your name"
              onChange={ this.handleInputChange }
            />
            <button
              data-testid="login-submit-button"
              type="submit"
              disabled={ buttonDisabled }
              onSubmit={ this.handleCreateUser }
            >
              Enter
            </button>
          </form>
        ) }
      </div>
    );
  }
}

export default Login;
