


export class AddVideoNote extends React.Component {
    state = {
        info: {
            urlId: ''
        }
    }
    handleChange = (ev) => {
        const field = ev.target.name;
        const value = ev.target.value;
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))
    }

    render() {
        const { urlId } = this.state.info
        const { type, onSaveNote } = this.props
        return (
            <form className="add-note" onSubmit={() => { onSaveNote(event, this.state.info, type) }}>
                <input className="note-input" name="urlId" value={urlId} type="text" placeholder="Enter video url" onChange={this.handleChange} />
            </form >
        )
    }

}