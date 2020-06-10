import React,{Component} from 'react'
import {Link} from 'react-router-dom'

export default class Menu extends Component{
  constructor(props){
    super(props)
    this.handleClickLogout=this.handleClickLogout.bind(this)
  }

  handleClickLogout(e){
    localStorage.removeItem('token')
    this.props.history.push('/login')
  }

  render(){
    return (
      <div>
      <ul id="menu">
        {this.props.routes.filter((route)=>route.path!=='/login').map((route,index)=><li key={index}><Link to={route.path} >{route.path}</Link></li>)}
      </ul>
      <button data-test='logout__btn' onClick={this.handleClickLogout}>Logout</button>
        {this.props.children}
      </div>
    )
  }
}