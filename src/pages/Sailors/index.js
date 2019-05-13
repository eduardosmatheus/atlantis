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
    cell: SailorActions
  },
  
];

const tableConfig = {
  page_size: 10,
  length_menu: [ 10, 20, 50 ],
};

function SailorActions(record) {
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

class Sailors extends Component {

  state = {
    sailors: []
  }

  componentDidMount() {
    this.loadSailors();
  }

  loadSailors = async () => {
    try {
      const { data: sailors } = await axios.get('/secure/sailors');
      this.setState({ sailors: sailors.data });
    } catch (error) {
      toast.error(error.message);
    }
  }

  render() {
    const { sailors } = this.state;
    return (
      <Card>
        <Card.Header>Marinheiros</Card.Header>
        <Card.Body>
          <ReactDatatable
            config={tableConfig}
            records={sailors}
            columns={columns}
          />
        </Card.Body>
      </Card>
    )
  }
}

export default Sailors;
