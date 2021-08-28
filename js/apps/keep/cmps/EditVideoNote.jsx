


export class EditVideoNote extends React.Component {
    state = {
        info: {
            urlId: ''
        }
    }
    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value;
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))
    }
    render() {
        const { urlId } = this.state.info
        const { type, onEditNote, setEditMode } = this.props
        return (
            <div className="editing-modal">
                <h1>{`Edit ${type} :`}</h1>
                <button class="edit-exit-btn" onClick={setEditMode}>x</button>
                <form className="add-note" onSubmit={() => { onEditNote(event, type, this.state.info) }} >
                    <input className="note-input" name="urlId" value={urlId} type="text" placeholder="Enter new video url" onChange={this.handleChange} />
                </form >
            </div>
        )
    }
}