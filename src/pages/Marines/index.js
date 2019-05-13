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
    cell: MarineActions
  },
  
];

const tableConfig = {
  page_size: 10,
  length_menu: [ 10, 20, 50 ],
};

function MarineActions(record) {
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

class Marines extends Component {

  state = {
    marines: []
  }

  componentDidMount() {
    this.loadMarines();
  }

  loadMarines = async () => {
    try {
      const { data: marines } = await axios.get('/secure/marines');
      this.setState({ marines });
    } catch (error) {
      toast.error(error.message);
    }
  }

  render() {
    const { marines } = this.state;
    return (
      <Card>
        <Card.Header>Marinas</Card.Header>
        <Card.Body>
          <ReactDatatable
            config={tableConfig}
            records={marines}
            columns={columns}
          />
        </Card.Body>
      </Card>
    )
  }
}

export default Marines;
