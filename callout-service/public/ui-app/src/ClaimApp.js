import React, { Component } from 'react';
import axios from 'axios';
import { Form, Table, Grid, Button, Message, Image } from 'semantic-ui-react'
import FireImg from './lava-lamp.svg';

const apiClaims = 'http://localhost:3000/api/claims';

const logError = () => { console.error(arguments); }

class ClaimApp extends Component {

  state = { claimName: '', claimValue: '', claims: [] }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  removeClaim = (id) => {
    const { claims } = this.state;

    axios.delete(`${apiClaims}/${id}`)
      .then(
        (result) => {
          const newClaims = claims.filter((o) => o.id !== id);
          this.setState({
            claimName: '', claimValue: '', claims: newClaims
          })
        },
        logError
      );
  }

  addClaim = () => {
    const { claims, claimName, claimValue } = this.state
    const newClaim = {
      claimName,
      claimValue,
    };

    axios.post(apiClaims, newClaim)
      .then(
        (result) => {
          const createdClaim = result.data;
          claims.push(createdClaim)
          this.setState({
            claimName: '', claimValue: '', claims,
          })
        },
        logError
      );
  }

  componentDidMount() {
    const self = this;
    axios.get(apiClaims)
      .then(
        (result) => {
          self.setState({ claims: result.data });
        },
        logError
      )
  }

  render() {
    const self = this;
    const { claimName, claimValue, claims } = this.state
    const hasNoClaims = claims.length === 0;

    return (
      <Grid divided='vertically'>
        <Grid.Row columns={3}>

          <Grid.Column>
            <Form onSubmit={this.addClaim}>
              <Form.Input label="Claim Name" type="text" name="claimName" value={claimName} onChange={this.handleChange} inline required />
              <Form.Input label="Claim Value" type="text" name="claimValue" value={claimValue} onChange={this.handleChange} inline required />
              <Button type='submit' size="large" primary>Add Claim</Button>
            </Form>
          </Grid.Column>

          <Grid.Column>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Claim Name</Table.HeaderCell>
                  <Table.HeaderCell>Claim Value</Table.HeaderCell>
                  <Table.HeaderCell>Actions</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {claims.map((object, i) => {
                  return <Table.Row key={i}>
                    <Table.Cell>{object.claimName}</Table.Cell>
                    <Table.Cell>{object.claimValue}</Table.Cell>
                    <Table.Cell><i className="trash alternate outline icon" onClick={self.removeClaim.bind(self, object.id)}></i></Table.Cell>
                  </Table.Row>
                })}
              </Table.Body>
            </Table>
            { (hasNoClaims) ? (<Message>No Claims Found</Message>) : '' }
          </Grid.Column>

          <Grid.Column>
            <Image src={FireImg} centered  rounded />
          </Grid.Column>

        </Grid.Row>
      </Grid>
    );
  }
}

export default ClaimApp;
