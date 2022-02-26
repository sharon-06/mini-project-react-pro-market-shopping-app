import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import HomeComponent from './components/HomeComponent/HomeComponent'
import Navbar from './components/Navbar/Navbar'
import axios from "axios"
import SelectedComponent from './components/SelectedComponent/SelectedComponent'
import CartComponent from './components/CartComponent/CartComponent'

export default class App extends Component{
  constructor(){
    super()
    this.state={
      products: [],
      cart: {},
      selectedItem: {},
      showCart: false
    }
  }

  componentDidMount(){
    axios.get("https://api.mocki.io/v1/7bd0682b")
      .then(response => {
        this.setState({ products: response.data.products })
      })
      .catch(error => console.log(error))
  }

  getItem = (description) =>{
    this.setState({ selectedItem: description})
  }

  addToCart = (item) => {
    if(window.confirm("press"))
      this.setState(prevState => {
        return {
          cart: {
            ...prevState.cart,
            ...item
          }
        }
      })
  }

  displayCart =() =>{
    this.setState(prevState =>{
      return{
        showCart: !prevState.showCart
      }
    })
  }

  updateCartQuantity =(type, id) =>{
    if(type === "inc"){
      this.setState(prevState => {
        return{
          cart:{
            ...prevState.cart,
            [id]: {
              ...prevState.cart[id].quantity +1
            }
          }
        }
      })
    }

    else if(type ==="dec" && this.state.cart[id].quantity>1){
      this.setState(prevState => {
        return{
          cart: {
            ...prevState.cart,
            [id]:{
              ...prevState.cart[id],
              quantity: prevState.cart[id].quantity - 1
            }
          }
        }
      })
    }
  }

  render(){
    return(
      <React.Fragment>
        <Router>
          <Navbar showCart={this.displayCart} totalItem={Object.keys(this.state.cart).length}/>
          {this.state.showCart && <CartComponent cartItems={this.state.cart} updateCartQuantity={this.updateCartQuantity} />}
          <Switch>
            <Route exact path="/">
              <HomeComponent products={this.state.products} getItem={this.getItem} addToCart={this.addToCart} />
            </Route>
            <Route path="/item">
              <SelectedComponent item={this.state.selectedItem} />
            </Route>
          </Switch>
        </Router>
      </React.Fragment>
    )
  }
}