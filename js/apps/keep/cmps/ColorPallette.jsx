export function ColorPalette({ onSetNoteColor, note }) {
    const colors = ['#FFADAD', '#FFD6A5', '#FDFFB6', '#CAFFBF','#9BF6FF','#A0C4FF']



    return (
        <section className="color-palette">
            {colors.map(color => <button className={`color-part ${color}`} key={color} style={{ backgroundColor: `${color}` }} onClick={() => onSetNoteColor(note.id, color)} ></button>)
            }
        </section >
    )

}