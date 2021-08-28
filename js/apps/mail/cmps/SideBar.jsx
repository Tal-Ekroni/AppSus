export class SideBar extends React.Component {
    state = {
        filterBy: {
            status: 'inbox', //inbox/sent/trash/draft
            txt: '', // no need to support complex text search
            isRead: 'all', // (optional property, if missing: show all)
            // isStared: false, // (optional property, if missing: show all)
            // lables: [] // has any of the labels
        }

    }

    onHandleChange = (criteria, field) => {
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: criteria } }), () => { this.props.onSetFilter(this.state.filterBy) })

    }
    onHandleInput = (ev) => {
        let field = ev.target.name
        let value = ev.target.value
        if (value === 'true') value = true
        if (value === 'false') value = false
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, [field]: value } }), () => { this.props.onSetFilter(this.state.filterBy) })
    }
    onGetAllEmails = () => {
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, isRead: 'all' } }), () => { this.props.onSetFilter(this.state.filterBy) })

    }

    render() {
        const { openCompose } = this.props
        return (
            <section className='side-bar flex'>
                <div className="flex column"> 
                <div className="curr-folder flex">
                <label >Folder: </label>
                <span>{this.props.folder}</span >
                </div>
                
                <label htmlFor="filter-by" >Filter By</label>

                <select name="isRead" className="is-read" id="toggle-read" onChange={this.onHandleInput}>
                    <option value="all">All</option>
                    <option value={true}>Read</option>
                    <option value={false}>Unread</option>
                </select>
                <label htmlFor="txt" className="search-email-lbl">Search</label>
                <input type="text" name="txt" onChange={this.onHandleInput} />
                </div>
<div className="folder-btn flex column">

                <button className="compose-btn" onClick={openCompose}></button>
                <button className="inbox" onClick={() => this.onHandleChange('inbox', 'status')}>Inbox</button>
                <button className="stared" onClick={() => this.onHandleChange('stared', 'status')}>Stared</button>
                <button className="sent" onClick={() => this.onHandleChange('sent', 'status')}>Sent</button>
</div>
            </section>
        )
    }
}