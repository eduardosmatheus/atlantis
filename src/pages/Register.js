import React from 'react';
import {
  Card,
  Button,
  Form,
  Container,
} from 'react-bootstrap';
import axios from '../axios-common';
import { toast } from 'react-toastify'

class Register extends React.PureComponent {
  state = {
    email: '',
    password: '',
    confirmation: '',
  }

  handleEmail = ({ target: { value: email }}) => this.setState({ email });
  handlePassword = ({ target: { value: password }}) => this.setState({ password });
  handleConfirmation = ({ target: { value: confirmation }}) => this.setState({ confirmation });

  handleSignup = async (e) => {
    e.preventDefault();
    const {
      email,
      password,
      confirmation,
    } = this.state;
    try {
      await axios.post('/signup', {
        user: {
          email,
          password,
          confirmation,
        }
      });
      toast.success('Cadastro efetuado com sucesso!');
    } catch (err) {
      toast.error(err.message);
    }
  }

  render() {
    const {
      email,
      password,
      confirmation,
    } = this.state;
    return (
      <Container>
        <Card>
          <Card.Header>Criar nova conta</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Endereço de E-mail</Form.Label>
                <Form.Control type="email" placeholder="Digite seu e-mail" />
                <Form.Text
                  className="text-muted"
                  onChange={this.handleEmail}
                  value={email}
                >
                  Nós não compartilhamos seu endereço de e-mail com ninguém.
                </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <Form.Control
                  type="password"
                  onChange={this.handlePassword}
                  placeholder="Digite sua senha"
                  value={password}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Confirmação de senha</Form.Label>
                <Form.Control
                  type="password"
                  onChange={this.handleConfirmation}
                  placeholder="Confirme sua senha"
                  value={confirmation}
                />
              </Form.Group>
              <Button
                variant="success"
                type="submit"
                onClick={this.handleSignup}
              >
                Cadastrar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default Register;
