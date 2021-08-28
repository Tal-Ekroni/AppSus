


export class EditTextNote extends React.Component {
    state = {
        info: {
            text: ''
        }
    }

    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value;
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))

    }
    render() {
        const { text } = this.state.info
        const { type, onEditNote,setEditMode } = this.props

        return (
            <div className="editing-modal fade-in-edit">
                <h1>{`Edit ${type} :`}</h1>
                <button class="edit-exit-btn" onClick={setEditMode}>x</button>
                <form className="edit-text-note" onSubmit={() => {
                    onEditNote(event, type, this.state.info)
                }} >
                    <input className="note-input" name="text" value={text} placeholder="Edit text" onChange={this.handleChange} />
                </form>
            </div>

        )
    }
}

