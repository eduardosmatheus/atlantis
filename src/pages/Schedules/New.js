import React, { PureComponent } from 'react';
import {
  Card,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
  Col,
  InputGroup,
  Button,
} from 'react-bootstrap';
import Select from 'react-select';
import axios from '../../axios-common';
import { toast } from 'react-toastify';

export default class ScheduleForm extends PureComponent {

  state = {
    sailors: [],
    marines: [],
    boats: [],
    boat: null,
    marine: null,
    sailor: null,
    date: '',
    observation: '',
    email: ''
  }

  componentDidMount() {
    this.handleLoadDependencies();
  }

  handleLoadDependencies = async () => {
    const { data: marines } = await axios.get('/secure/marines');
    this.setState({ marines: marines.data });
    const { data: boats } = await axios.get('/secure/boats');
    this.setState({ boats: boats.data });
    const { data: sailors } = await axios.get('/secure/sailors');
    this.setState({ sailors: sailors.data });
  }

  handleFieldChange = ({ target: { name, value } }) => this.setState({
    [name]: value
  })

  handleSelectChange = (name, o) => this.setState({ [name]: o })

  handleClearFields = () => {
    this.setState({
      boat: null,
      marine: null,
      date: '',
      observation: '',
      email: ''
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const {
      boat,
      marine,
      sailor,
      date,
      observation,
      email
    } = this.state;
    try {
      await axios.post('/secure/schedules', {
        boat_id: boat && boat.id,
        marine_id: marine && marine.id,
        sailor_id: null,//sailor && sailor.id,
        start_date: date,
        email,
        observation
      });
      toast.success('Agendamento cadastrado com sucesso!!');
    } catch (error) {
      toast.error(error.message);
    }
  }

  render() {
    const {
      boats,
      marines,
      boat,
      marine,
      sailor,
      date,
      observation,
      email
    } = this.state;
    return (
      <Card>
        <Card.Body>
          <Form onSubmit={this.handleSubmit}>
            <Form.Row>
              <FormGroup as={Col}>
                <FormLabel>Embarcação</FormLabel>
                <Select
                  isClearable
                  options={boats}
                  value={boat}
                  getOptionLabel={o => o.name}
                  getOptionValue={o => o.id}
                  noOptionsMessage={() => 'Barco não encontrado.'}
                  placeholder="Embarcação..."
                  onChange={o => this.handleSelectChange('boat', o)}
                />
              </FormGroup>
              <FormGroup as={Col}>
                <FormLabel>Marina</FormLabel>
                <Select
                  isClearable
                  options={marines}
                  value={marine}
                  getOptionLabel={o => o.name}
                  getOptionValue={o => o.id}
                  noOptionsMessage={() => 'Marina não encontrada.'}
                  placeholder="Marina...."
                  onChange={o => this.handleSelectChange('marine', o)}
                />
              </FormGroup>
            </Form.Row>
            <Form.Row>
              <FormGroup as={Col} md="4">
                <FormLabel>Data/Hora</FormLabel>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fa fa-calendar" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    type="datetime-local"
                    name="date"
                    value={date}
                    onChange={this.handleFieldChange}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup as={Col}>
                <FormLabel>Enviar para:</FormLabel>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>
                      <i className="fa fa-at" />
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="E-mail..."
                    onChange={this.handleFieldChange}
                  />
                </InputGroup>
              </FormGroup>
              {/* <FormGroup as={Col}>
                <FormLabel>Marinheiro</FormLabel>
                <Select
                  isClearable
                  options={this.state.sailors}
                  value={marine}
                  getOptionLabel={o => o.name}
                  getOptionValue={o => o.id}
                  noOptionsMessage={() => 'Marinheiro não encontrado.'}
                  placeholder="Marinheiro...."
                  onChange={o => this.handleSelectChange('sailor', o)}
                />
              </FormGroup> */}
            </Form.Row>
            <Form.Row>
              <FormGroup as={Col}>
                <FormLabel>Observação</FormLabel>
                <textarea
                  required
                  style={{ resize: 'none' }}
                  rows={6}
                  className="form-control"
                  name="observation"
                  value={observation}
                  onChange={this.handleFieldChange}
                />
              </FormGroup>
            </Form.Row>
            <Form.Row>
            </Form.Row>
            <Button variant="success" type="submit">
              <i className="fa fa-save" />
              {' '}
              Salvar
            </Button>
          </Form>
        </Card.Body>
      </Card>
    )
  }
}
