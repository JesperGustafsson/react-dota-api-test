import React from 'react'
import Match from './Match'

const Matches = async ( {matches} ) => {



    return (
        <div>
            <h2>Matches</h2>
            {
                matches.map(({id}) => {
                    console.log(id);
                    return <Match match = {matches[id-1]}/>;
                }

                )
            }
            <br></br>
            {matches[randomID()].result}    
        </div>
    )

    function randomID() {
        let randomID = Math.floor(Math.random()*3);
        console.log(randomID);
        return randomID;
    }

}
    
export default Matches
