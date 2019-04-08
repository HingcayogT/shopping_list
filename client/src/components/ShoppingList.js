import React, { Component } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem, updateItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class ShoppingList extends Component {
  //calling the getItems from itemAction.js
  componentDidMount() {
    this.props.getItems();
  }

  // i think all actions and stateToProps must be validated here i gues :D
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    deleteItem: PropTypes.func.isRequired,
    updateItem: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };
  // Modal
  //state here is just a state from this component only i guess
  state = { modal: false, name: '', _id: '', };

  //toggle modal close/open with an ID and Name as parameter
  toggle = (_id = '', name = '') => {
    this.setState({
      modal: !this.state.modal, name, _id
    });
  };

  //delete action with an ID as parameter
  onDeleteClick = id => {
    this.props.deleteItem(id);
  };
  // changing the component state while typing in update modal textbox 
  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const item = { id: this.state._id, name: this.state.name };
    // update action item via updateItem action
    this.props.updateItem(item);
    // Close modal
    this.toggle();
  };

  render() {
    return (
      <Container>
        <div>
          <Modal isOpen={this.state.modal} toggle={this.toggle}>
            <ModalHeader toggle={this.toggle}>Update name</ModalHeader>
            <ModalBody>
              <Form onSubmit={this.onSubmit}>
                <FormGroup>
                  <Label for='item'>Item</Label>
                  <Input
                    type='text'
                    name='name'
                    id='item'
                    placeholder='Add shopping item'
                    value={this.state.name}
                    onChange={this.onChange}
                  />
                  <Button color='dark' style={{ marginTop: '2rem' }} block>
                    Update Item
              </Button>
                </FormGroup>
              </Form>
            </ModalBody>
          </Modal>
        </div>
        <ListGroup>
          <TransitionGroup className='shopping-list' style={{ position: "relative" }}>
            {/* this.props.items is coming from line 120 "items: state.item.items,"*/}
            {this.props.item.items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames='fade'>
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <div style={{ position: "absolute", right: "0" }}>
                      <Button
                        className='remove-btn'
                        color='danger'
                        size='sm'
                        onClick={this.onDeleteClick.bind(this, _id)}
                      >
                        delete
                      </Button>
                      <Button
                        className='update-btn'
                        color='primary'
                        size='sm'
                        onClick={this.toggle.bind(this, _id, name)}
                      >
                        update
                  </Button>
                    </div>
                  ) : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

//map the state to props and include it in the "static propTypes"
const mapStateToProps = state => ({
  item: state.item, //this state.item comes from the "combineReducers" ./reducers/index.js
  isAuthenticated: state.auth.isAuthenticated //this state.auth also comes from the "combineReducers" ./reducers/index.js
});

// always use "export default connect()()" when using react-reduct 
//add the classname in second parenthesis 
// add the "mapStateToProps" in the first parenthesis as first parameter
// add all the "actions" in the 2nd parenthesis as 2nd parameter as objects 

export default connect(
  mapStateToProps,
  { getItems, deleteItem, updateItem }
)(ShoppingList);
