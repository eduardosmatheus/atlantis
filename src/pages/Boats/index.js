import React, { Component } from 'react';
import { Card, Button } from 'react-bootstrap';
import ReactDatatable from '@ashvin27/react-datatable';
import { toast } from 'react-toastify';
import axios from '../../axios-common';

const columns = [
  {
    key: 'name',
    text: 'Nome',
    align: 'left',
    width: 200,
    sortable: true
  },
  {
    key: 'action',
    text: 'Ações',
    align: 'left',
    width: 100,
    sortable: false,
    cell: BoatActions
  },
  
];

const tableConfig = {
  page_size: 10,
  length_menu: [ 10, 20, 50 ],
};

function BoatActions(record) {
  return (
    <>
      <Button variant="info">
        <i className="fa fa-edit" />{' '}Editar
      </Button>
      <Button variant="danger">
        <i className="fa fa-danger" />{' '}Excluir
      </Button>
    </>
  );
}

class Boats extends Component {

  state = {
    boats: []
  }

  componentDidMount() {
    this.loadBoats();
  }

  loadBoats = async () => {
    try {
      const { data: boats } = await axios.get('/secure/boats');
      this.setState({ boats: boats.data });
    } catch (error) {
      toast.error(error.message);
    }
  }

  render() {
    const { boats } = this.state;
    return (
      <Card>
        <Card.Header>Embarcações</Card.Header>
        <Card.Body>
          <ReactDatatable
            config={tableConfig}
            records={boats}
            columns={columns}
          />
        </Card.Body>
      </Card>
    )
  }
}

export default Boats;
