import React,{useState,useEffect} from 'react'
import "./App.css"
import ExpenseForm from './components/ExpenseForm'
import ExpenseItem from './components/ExpenseItem'
import ExpenseList from './components/ExpenseList'
import Alert from './components/Alert'






const depenseInitial = [
    //  {id:1,charge:"location",montant:2000},
    // {id:2,charge:"Facture",montant:3000},
    //  {id:3,charge:"Etude",montant:1000}
 ]
// console.log(depenseInitial)
//getItem
//localStorage.getId("item name")
//localStorage.setId("item name") 2 element

// const depenseInitial= localStorage.getItem("expenses")
// ? json.parse(localStorage.getItem("expenses")):[]



function App() {
  // state values
//all expenses,add expenses
    const [expenses,setExpenses] = useState(depenseInitial)
// single expense
    const [charge,setCharge] = useState('')   
// single price
const [montant,setMontant] = useState('')  
// alert 
const [alert,setAlert]= useState({show:false})
//edit
const [edit, setEdit]=useState(false)
//edit item
const [id, setId]=useState(0)

// //useEffect
// useEffect(()=>{
//   localStorage.setItem('expenses',json.stringfy(expenses))
// })

const handleCharge = e =>{

  setCharge(e.target.value)
}    
const handleMontant = e =>{
  
  setMontant(e.target.value)
} 

// handle alert

const handleAlert = ({type, text})=>{
  setAlert({show:true, type, text })
  setTimeout(() => {
    setAlert({show: false})
  },4000)
}

const handleSubmit = e =>{
  e.preventDefault()
  if(charge !== "" && montant >0){
    if (edit){
      let tempExpenses = expenses.map(item => {
        return item.id === id? {...item,charge,montant} :item
      })
      setExpenses(tempExpenses)
      setEdit(false)
      handleAlert({type :'success' , text:"item edited"})


    }
    else {
      const singleExpense = {charge,montant}
      setExpenses([...expenses, singleExpense])
      handleAlert({type :'success' , text:"item added"})

    }
    // set charge back to empty string
    setCharge('')
    // setMontant back to zero 
    setMontant('')

}else{
    //alert called danger
    
    handleAlert({
      type: "danger",
      text: "charge can't be empty value"
    })
  
  //console.log(charge,montant)
  }
}
// clear all items
const clearItems =()=>{
  setExpenses([ ])
  // console.log("cleared all item")
  handleAlert({type:"danger", text:"All items deleted"})
}
// handle delete
const handleDelete = (id) =>{
  // filter bch taaml une copie superficielle d'une partie ml liste mtaana
  let tempExpenses = expenses.filter(item => item.id !== id)
    // console.log(`item deleted: ${id}`)
  setExpenses(tempExpenses)
  // console.log(tempExpenses)
  handleAlert({type:"danger", text:"item deleted"})

}
// handle edit
const handleEdit = (id) =>{
  let expense = expenses.find(item => item.id === id)
  let {charge,montant}=expense;
  setCharge(charge)
  setMontant(montant)
  setEdit(true)
  setId(id)
}
  return (
    <>
    {alert.show && <Alert type={alert.type}
    text={alert.text}/>}
   <Alert/>
   <h1>Budget Tracking</h1>
   <main className='App'>
   <ExpenseForm
   charge={charge}
   montant={montant}
   handleMontant={handleMontant}
   handleCharge={handleCharge}
   handleSubmit={handleSubmit}
   edit={edit}
   />
   <ExpenseList expenses={expenses}
    handleDelete={handleDelete}
    handleEdit={handleEdit}
    clearItems={clearItems} />
   
   </main>
  
   <h1>total spending : <span className='total'>
    ${""}
  {/* reduce tetraiti chaque valeur du liste */}
    {expenses.reduce((acc , curr)=>{
      return (acc += parseInt( curr.montant))
    },0)}
    </span></h1>
   </>
  )
}

export default App
