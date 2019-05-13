import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import axios from '../../axios-common';

class Login extends Component {

  handleLogin = async (e) => {
    e.preventDefault();
    const {
      email,
      password,
    } = this.state;
    try {
      const { data } = await axios.post('/sign_in', {
        email, password
      });
      localStorage.setItem('app.authToken', data.jwt);
      toast.success('Login efetuado com sucesso!');
    } catch (err) {
      toast.error(err.message);
    }
  }

  handleEmail = ({ target: { value: email }}) => this.setState({ email });

  handlePassword = ({ target: { value: password }}) => this.setState({ password });

  render() {
    return (
      <div className="app flex-row align-items-center">
        <ToastContainer />
        <Container>
          <Row className="justify-content-center">
            <Card className="p-4">
              <Card.Body>
                <Form onSubmit={this.handleLogin}>
                  <h1>Login</h1>
                  <p className="text-muted">Sign In to your account</p>
                  <InputGroup className="mb-3">
                    <InputGroup.Text>
                      <i className="icon-user"></i>
                    </InputGroup.Text>
                    <FormControl
                      required
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      onChange={this.handleEmail}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroup.Text>
                      <i className="icon-lock"></i>
                    </InputGroup.Text>
                    <FormControl
                      required
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={this.handlePassword}
                    />
                  </InputGroup>
                  <Row>
                    <Col xs="6">
                      <Button type="submit" color="primary" className="px-4">Login</Button>
                    </Col>
                    <Col xs="6" className="text-right">
                      <Button color="link" className="px-0">Forgot password?</Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
