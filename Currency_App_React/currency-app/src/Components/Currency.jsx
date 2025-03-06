import React, { useEffect,useState } from 'react'
import {Select,Input,Button} from 'antd'
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import { CgLogIn } from 'react-icons/cg';
import axios from 'axios';
const {Option} = Select; 
 function Currency() {
    
    let base_url ="https://api.freecurrencyapi.com/v1/latest";
    let api_key="fca_live_YtH3y3mXFVyEjIddd0woQDrUOhC3x0rxDwalT34Q"
    // let exchange_api = `${}`
    const [amount, setAmount] = useState(0);
    const [fromCurrency,setFromCurrency] = useState('USD');
    const [toCurrency,setToCurrency] = useState('TRY');
    const [result,setResult] = useState(0);
    

    const exchange= async ()=>{
       const response= await axios.get(`${base_url}?apikey=${api_key}&base_currency=${fromCurrency}`)
       const result = (response.data.data[toCurrency] * amount).toFixed(2);
       setResult(result);
    }
  return (
    <div className='currency-div' style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column', marginTop:50, border:'3px solid black', padding:20, borderRadius:10}}>
        <div>
            <h3 style={{backgroundColor:'aqua',fontFamily:'arial'}}>DÖVİZ KURU UYGULAMASI</h3>
        </div>

        <div>
        <Input value={amount} onChange={(e)=>setAmount(e.target.value)} style={{width:100, height:25, marginRight:10}} type='number' className='amount' />
        <Select onChange={(value)=>setFromCurrency(value)} defaultValue={fromCurrency} style={{width:100, marginRight:5}}  className='from-currency-option'  >
            <Option value="USD">USD</Option>
            <Option value="EUR">EUR</Option>
            <Option value="GBP">GBP</Option>
            <Option value="TRY">TL</Option>
        </Select>
        <FaRegArrowAltCircleRight style={{scale:1.5, marginRight:5}}/>
        <Select onChange={(value)=>setToCurrency(value)} defaultValue={toCurrency} style={{width:100,marginLeft:5}}  className='to-currency-option' >
            <Option value="USD">USD</Option>
            <Option value="EUR">EUR</Option>
            <Option value="GBP">GBP</Option>
            <Option value="TRY">TL</Option>
        </Select>

        <Input value={result} onChange={(e)=>setResult(e.target.value)} style={{width:100, height:25, marginLeft:10}} type='number' className='result' />
        
        </div>
       <div>
       <Button onClick={exchange} type='primary' style={{width:40, color:'white',backgroundColor:'red', borderRadius:5,height:30, cursor:'pointer'}}>Çevir</Button>
       </div>
        </div>

  )
}
export default Currency;
