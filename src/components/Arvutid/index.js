import React, { Component } from 'react';

import { withFirebase } from '../Firebase';
import { withAuthorization } from '../Session';

class ArvutidPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      arvutid: [],
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.arvutid().on('value', snapshot => {
      const arvutidObject = snapshot.val();

      const arvutidList = Object.keys(arvutidObject).map(key => ({
        ...arvutidObject[key],
        uid: key,
      }));

      this.setState({
        arvutid: arvutidList,
        loading: false,
      });
    });
  }

  componentWillUnmount() {
    this.props.firebase.arvutid().off();
  }

  render() {
    const { arvutid, loading } = this.state;

    return (
      <div>
        <h1>Arvutid</h1>

        {loading && <div>Loading ...</div>}

        <ArvutidList arvutid={arvutid} />
      </div>
    );
  }
}

const ArvutidList = ({ arvutid }) => (
  <ul>
    {arvutid.map(arvuti => (
      <li key={arvuti.uid}>
        
        <span>
          <strong>Kood:</strong> {arvuti.kood}
        </span>
        <span>
          <strong>Nimi:</strong> {arvuti.nimi}
        </span>
      </li>
    ))}
  </ul>
);
const condition = authUser => !!authUser;
// export default withFirebase(AdminPage);
export default withAuthorization(condition)(withFirebase(ArvutidPage));

