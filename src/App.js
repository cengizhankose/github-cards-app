import React from "react";
import "./App.css";

const CardList = (props) => {
  return (
    <div className="CardList">
      {props.profiles.map((profile) => (
        <Card key={profile.id} {...profile} />
      ))}
    </div>
  );
};

class Card extends React.Component {
  render() {
    let profile = this.props;
    return (
      <div className="github-profile">
        <img src={profile.avatar_url} alt="ProfileIMG" />
        <div className="info">
          <div className="name">{profile.name}</div>
          <div className="username">{profile.login}</div>
        </div>
      </div>
    );
  }
}

class Form extends React.Component {
  state = { userName: "" };
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state.userName);
    fetch(`https://api.github.com/users/${this.state.userName}`)
      .then((response) => response.json())
      .then((data) =>
        data.message ? alert(data.message) : this.props.onSubmit(data)
      );
    this.setState({ userName: "" });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value })}
          placeholder="Github Username"
          required
        />
        <button type="submit">Add Card</button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profiles: [],
    };
  }

  addNewProfile = (profileData) => {
    this.setState((prevState) => ({
      profiles: [...prevState.profiles, profileData],
    }));
    console.log("APP", profileData);
  };

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>{this.props.title}</h1>
        </div>
        <Form onSubmit={this.addNewProfile} />
        <CardList profiles={this.state.profiles} />
      </div>
    );
  }
}

export default App;
