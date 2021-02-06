import React from 'react'

const Match = (match) => {
    
    const player = match.match.hero;
    const allies = match.match.allies;
    const enemies = match.match.enemies;
    const result = match.match.result;
    console.log(allies.length)

    return (
        
        <div>
            <strong>{player}</strong>, {allies.map((ally, i) => (
                <>{ally}{i < allies.length - 1 && ', '}</>
            ))}
            <br></br>
                VS.
                <br></br>

            {enemies.map((enemy, i) => (
                <>{enemy}{i < enemies.length - 1 && ', '}</>
            ))}
            <br></br>
            <br></br>

        </div>
        
)
}

export default Match