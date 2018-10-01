import React,{Fragment} from 'react'
import MenuNav from './Menu'
import './StoreHeader.css'
import Link from './Link'
import {ShoppingCart} from 'react-feather'
import State from '../views/state'

const StoreHeader = ({title}) =>
<Fragment>
  <div className='Store-Header'>
    <div className ='Menu-Box'>
      <MenuNav 
      // className ='Icon'
      />
    </div>
     {title}
    <div className='Cart-Box'>
      <Link to='/cart'>        {/* <div className='Store-Cart-icon'> */}
          <ShoppingCart className='Store-Feather'/>
          <div className='Store-Cart-Icon-Number'>
            {State.cart.reduce((acc,cur)=>acc+cur.quantity,0)}
          </div>
      </Link>
    </div>
  </div>
    <div className='Header-Spacer'/>
    </Fragment>

export default StoreHeader
