import React, { Component } from 'react';
import {
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Button,
  Card,
  Row,
  Col
} from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from '../../axios-common';

export class BoatsForm extends Component {

  state = {
    name: ''
  }

  handleChange = e => this.setState({
    [e.target.name]: e.target.value
  })

  onSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    try {
      await axios.post('/secure/boats', { boat: { name } });
      toast.success('Cadastro realizado com sucesso.');
    } catch (error) {
      toast.error(error.message);
    } finally {
      this.setState({ name: '' });
    }
  }

  render() {
    return (
      <Card>
        <Card.Header>Nova Embarcação</Card.Header>
        <Card.Body>
          <Form inline onSubmit={this.onSubmit}>
            <FormGroup as={Row}>
              <FormLabel column sm="2">Nome</FormLabel>
              <Col>
                <FormControl
                  type="text"
                  name="name"
                  placeholder="Digite o nome..."
                  value={this.state.name}
                  onChange={this.handleChange}
                />
              </Col>
            </FormGroup>
            <Button type="submit" variant="success">
              Salvar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}

export default BoatsForm;
