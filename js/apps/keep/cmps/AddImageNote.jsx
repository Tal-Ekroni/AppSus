
export class AddImageNote extends React.Component {
    state = {
        info: {
            title: '',
            url: ''
        }
    }
    handleChange = (ev) => {
        const field = ev.target.name
        const value = ev.target.value;
        this.setState(prevState => ({ info: { ...prevState.info, [field]: value } }))
    }

    render() {
        const { url, title } = this.state.info
        const { onSaveNote, type } = this.props
        return (
            <section className="flex">

                <form className="add-note" onSubmit={() => { onSaveNote(event, this.state.info, type) }}>
                    <input className="note-input" name="title" value={title} type="text" placeholder="Enter title" onChange={this.handleChange} />
                </form>
                <form className="add-note" onSubmit={() => { onSaveNote(event, this.state.info, type) }}>
                    <input className="note-input" name="url" value={url} type="text" placeholder="Enter image url" onChange={this.handleChange} />

                </form  >
            </section>
        )
    }
}