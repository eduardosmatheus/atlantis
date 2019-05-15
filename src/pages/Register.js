import React from 'react';
import {
  Card,
  Button,
  Form,
  InputGroup,
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
    const { history } = this.props;
    try {
      const { data: { jwt } } = await axios.post('/sign_up', {
        user: {
          email,
          password,
          password_confirmation: confirmation,
        }
      });
      localStorage.setItem('app.authToken', jwt);
      history.push('/');
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
      <div
        className="app flex-row align-items-center"
      >
        <Card style={{ margin: 'auto' }}>
          <Card.Header>Criar nova conta</Card.Header>
          <Card.Body>
            <Form onSubmit={this.handleSignup}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Endereço de E-mail</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fa fa-user" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={this.handleEmail}
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Nós não compartilhamos seu endereço de e-mail com ninguém.
                </Form.Text>
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Senha</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fa fa-key" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    type="password"
                    onChange={this.handlePassword}
                    placeholder="Digite sua senha"
                    value={password}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group controlId="formBasicPasswdConfirmation">
                <Form.Label>Confirmação de senha</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fa fa-key" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    required
                    type="password"
                    onChange={this.handleConfirmation}
                    placeholder="Confirme sua senha"
                    value={confirmation}
                  />
                </InputGroup>
              </Form.Group>
              <Button variant="success" type="submit">
                Cadastrar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default Register;
