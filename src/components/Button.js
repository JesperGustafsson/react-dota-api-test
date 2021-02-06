import { useState, useEffect } from 'react'


const Button = ({ color, text }) => {
    
    const [colorB, setColorB] = useState(0);
    const [data, setData] = useState('');

/*     useEffect(() => {
        const getData = async () => {
          const dataFromServer = await fetchData()
          setData(dataFromServer)
        }
      
      getData()
    
    }, []) */

    const fetchData = async () => {
        console.log("fetchData")
        const profileNbr = Math.floor(Math.random()*25000000); 
        console.log(profileNbr);
        let res;
        while (!res || !res.json().profile) {
            res = await fetch (`https://api.opendota.com/api/players/${profileNbr}`)
        }

        const data = await res.json()
        
        let profile = data.profile;
        
        const personaname = profile.personaname;
        console.log(JSON.stringify(personaname));

        return JSON.stringify(personaname);
    }    
    
    const onClick = async () => {
        let randomR = Math.floor(Math.random()*255 + 1);
        let randomG = Math.floor(Math.random()*255 + 1);
        let randomB = Math.floor(Math.random()*255 + 1);
        console.log(randomR);
        setColorB(`rgb(${randomR},${randomG},${randomB})`);

        const dataFromServer = await fetchData()
        setData(dataFromServer);

        
    }
    return (
        <>
            <button 
            onClick={onClick}
            style ={{ backgroundColor: colorB !== 0 ? colorB : color}}
            className='btn'>
                {text}
            </button>
            <p>
                {data ? data : 'no data'}
            </p>
        </>
    )
}

export default Button