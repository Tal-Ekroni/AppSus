import { mailService } from "../services/mail.service.js"

export class AddEmail extends React.Component {
    state = {
        email: {
            to: '',
            subject: '',
            body: ''

        }
    }
    inputRef = React.createRef()

    componentDidMount() {
        this.inputRef.current.focus()
    }
    onHandleChange = ({ target }) => {
        let field = target.name
        let value = target.value

        this.setState(prevState => ({ email: { ...prevState.email, [field]: value } }), () => {
        })
    }

    onSaveEmail = () => {
        mailService.composeEmail(this.state.email)
            .then(() => {
                this.props.LoadEmails()
                this.props.history.push('/emails');
                this.props.openCompose()
            })
    }

    render() {
        const { to } = this.state
        return (
            <article className={this.props.isCompose ? "add-email fade-in" : "add-email fade-out"}>
                <p>New Message</p>
                <div className="compose-input to">

                    <label htmlFor="to" className="to-label">To:</label>
                    <input type="email" ref={this.inputRef} name="to" id="to" value={to} onChange={this.onHandleChange} />
                </div>
                <div className="compose-input">

                    <label htmlFor="subject" className="subject-label">Subject:</label>
                    <input type="text" name="subject" id="subject" onChange={this.onHandleChange} />
                </div>

                <textarea name="body" id="body" rows="17" onChange={this.onHandleChange} ></textarea>
                <div className="compose-edit-btns flex">

                    <button className="compose-send-btn" onClick={this.onSaveEmail}>Send</button>
                    <button className="compose-dlt-btn" onClick={this.props.openCompose}></button>
                </div>
            </article>
        )
    }
}