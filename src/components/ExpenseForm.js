import React from 'react'
import {MdSend} from "react-icons/md"
const ExpenseForm = ({
  charge,
  montant,
  handleSubmit,
  handleMontant,
 handleCharge,
edit
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className='form-center'>
        <div className='form-group'>
<label htmlFor='expense'>charge</label>
<input type="text"
 className='form-control'
 id='charge'
 name='charge'
 placeholder='exp'
 value={charge}
 onChange={handleCharge}

/>
</div>
<div className='form-group'>
<label htmlFor='montant'>montant</label>
<input type="number"
 className='form-control'
 id='montant'
 name='montant'
 placeholder='$'
 value={montant}
 onChange={handleMontant}

/>
        </div>
        </div> 
        <button type='submit' className='btn'>
          {edit ? "edit" : "submit"}
          <MdSend className='btn-icon'/>
        </button>
    </form>
  )
}

export default ExpenseForm
