import './Header.css'
import {useState} from 'react';
import axios from 'axios';

function Header() {
    const [input,setInput] = useState("")
    const [holidays,setHolidays] = useState([])

    const url = "https://manualdemarcas.inpi.gov.br/projects/manual-de-marcas-2-edicao-1-revisao/wiki/Siglas_de_pa%C3%ADses_e_organiza%C3%A7%C3%B5es"
    
    
    async function Search(){
        try{
            const response = await axios.get(`https://date.nager.at/api/v3/PublicHolidays/2024/${input}`);
            setHolidays(response.data);
            setInput("")
        }catch{
            alert(`Error porfavor coloque em codigo "BR" consute o site \n "${url}" para saber todas as siglas`)
        }
    }

    function keydown(e){
        if(e.key === "Enter"){
            Search();
        }
    }
    
    return (
        <>
        <div className='Header'>
            <h1>Holiday Country</h1>
            <div className='input'>
                <input type="text"   value={input} onChange = {(e) => setInput(e.target.value)} onKeyDown={keydown} placeholder='Escreva o codigo do pais Exemplo Brasil = BR'/>
            </div>
            <button className='search' onClick={Search}><span className="material-symbols-outlined">search</span></button>
        </div>
        <div className="resultinholiday">
            {holidays.length > 0 ?(
                holidays.map((holiday,index) => (
                    <div key={index}>
                        <p>
                            <strong>
                                {new Date(holiday.date).toLocaleDateString('pt-br',{month:'long'}).toUpperCase([0])}
                            </strong>
                            : {holiday.date} - {holiday.localName}
                        </p>
                        <hr />
                    

                    </div>
                ))
            ):(
                <p></p>
            )}
        
        </div>
        </>
    );
};

export default Header
