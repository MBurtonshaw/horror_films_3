import { React, createContext, Component } from "react";
import movies from '../movies.json';
import Cookies from 'js-cookie';
const bcrypt = require('bcryptjs');

export const Context = createContext('');

export class Provider extends Component {

  constructor() {
    super();
    // variable to initialize a new function imported from /HOCS/data
    this.cookie = Cookies.get('signedin?');

  }

  state = {
    error: null,
    folded: true,
    user: ''
  }

  render() {
    const { user } = this.state;
    const { error } = this.state;
    const { folded } = this.state;

    // any of these values will be available to components connected to context
    const value = {
      user,
      error,
      folded,
      data: {
        movies
      },
      actions: {
        removeDuplicates: this.removeDuplicates,
        capitalizeFirstLetter: this.capitalizeFirstLetter,
        signIn: this.signIn,
        signOut: this.signOut,
        registerUser: this.registerUser,
        clicker: this.clicker
      }
    }

    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>
    );
  }

  removeDuplicates = (arr) => {
    let unique = [];
    arr.forEach(element => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    })
    return unique;
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  registerUser = async (firstName, emailAddress, passphrase) => {
    //Set user credentials and save to a cookie
    let salt = await bcrypt.genSalt(10);
    let user = {
      name: firstName,
      email: emailAddress,
      password: passphrase
    }
    Cookies.set(`user: ${emailAddress}`, JSON.stringify(user), { expires: 10 });
    //}
  }

  signIn = async (emailAddress, passphrase) => {
    try {
      let applicant = Cookies.get(`user: ${emailAddress}`);
      if (applicant !== undefined) {
        let salt = await bcrypt.genSalt(10);
        let newType = JSON.parse(applicant);
        let newPass = await bcrypt.hash(passphrase, salt);
        let newnewPass = await bcrypt.hash(newType.password, salt);
        if (newPass === newnewPass) {
          let user = {
            email: emailAddress,
            password: newPass
          }
          Cookies.set('signedIn?', JSON.stringify(user), { expires: 7 });
          this.setState({ user });
        } else {
          return ('Passwords do not match');
        }
      }
      else {
        return ('User does not exist');
      }
    } catch (err) {
      this.setState({ 'error': err.message })
    }
  }

  signOut = async () => {
    let user = {
      email: '',
      password: ''
    }
    this.setState({ user });
    Cookies.set('signedIn?', JSON.stringify(''), { expires: 7 });
    //}
  }

  clicker = async () => {
    if (this.state.folded === true) { return (this.setState({ 'folded': false })) }
    if (this.state.folded === false) { return (this.setState({ 'folded': true })) }
  }

}
export const Consumer = Context.Consumer;
/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param { class } Component - A React component.
 * @returns { function } A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}


