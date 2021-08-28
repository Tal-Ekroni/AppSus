import { mailService } from "../services/mail.service.js"
export class MailDetails extends React.Component {


    state = {
        email: null
    }

    componentDidMount() {
        this.loadEmail()

    }
    // componentWillUnmount() {
    //     let emailIdx = mailService.getEmailIdx(this.state.email)
    //     mailService.toggleReadEmail(emailIdx, true)
    // }
    loadEmail = () => {
        mailService.getEmailById(this.props.match.params.emailId)
            .then(email => {
                this.setState({ email })
            })
    }

    onDeleteEmail = (emailId) => {
        mailService.deleteEmail(emailId)
        this.props.history.push('/emails')
    }
    onGoBack = () => {
        this.props.history.push('/emails')
    }
    render() {
        const { email } = this.state

        if (!email) return <div>loading...</div>
        return (
            <section className="email-details flex column">

                <div className="details-btns">
                    <button className="back-btn" onClick={() => { this.onGoBack() }}>Back</button>
                    <button className="email-dlt" onClick={() => this.onDeleteEmail(email.id)}>Delete</button>
                </div>
                <div className="details-content">
                    <div className="subject">
                        <h2>{email.subject}</h2>
                    </div>
                    <span className="content">content :</span>
                    <p>{email.body}  </p>
                    <div className="details-footer flex column">
                        <span>
                            Recievd At: {mailService.formatEmailTimestamp(email.sentAt)}
                        </span>
                        <span>
                            {email.to}
                        </span>
                    </div>
                </div>
            </section >
        )
    }
}