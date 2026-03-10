


export default function Die(props) {

    const pipLayouts = {
        1: [5],
        2: [1, 9],
        3: [1, 5, 9],
        4: [1, 3, 7, 9],
        5: [1, 3, 5, 7, 9],
        6: [1, 3, 4, 6, 7, 9]
    }

    const positions = [1, 2, 3, 4, 5, 6, 7, 8, 9]



    return (
        <button className="die-container" onClick={() => props.hold(props.id)}
            style={{ backgroundColor: props.isHeld ? "#59E391" : "white" }}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
        > {
                positions.map(position => {
                    const hasPip = pipLayouts[props.value].includes(position)

                    return (
                        <div key={position} className="cell">
                            {hasPip && <div className="pip" key={position}></div>}
                        </div>
                        )
                })}</button>
    )
}