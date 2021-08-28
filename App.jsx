const Router = ReactRouterDOM.HashRouter
const { Route, Switch } = ReactRouterDOM

import { AppHeader } from './js/cmps/AppHeader.jsx';
import { BookApp } from './js/apps/book/pages/BookApp.jsx';
import { Home } from './js/pages/app-home.jsx';
import { About } from './js/pages/app-about.jsx';
import { BookDetails } from './js/apps/book/pages/BookDetails.jsx';
import { BookReview } from './js/apps/book/pages/BookReview.jsx';
import { BookReviewsList } from './js/apps/book/cmps/BookReviewsList.jsx';
import { AddBook } from './js/apps/book/cmps/AddBook.jsx';
import { MailApp } from './js/apps/mail/pages/MailApp.jsx';
import { KeepApp } from './js/apps/keep/pages/NoteApp.jsx'
import { MailDetails } from './js/apps/mail/pages/MailDetails.jsx';
export function App() {
    return (
        <Router>
            <header>
                <AppHeader />
            </header>
            <main>
                <Switch>
                    <Route path="/book/:bookId/reviews" component={BookReviewsList} />
                    <Route path="/book/review/:bookId" component={BookReview} />
                    <Route path="/book/AddBook" component={AddBook} />
                    <Route path="/book/:bookId" component={BookDetails} />
                    <Route path="/emails/:emailId" component={MailDetails} />
                    <Route path="/emails" component={MailApp} />
                    <Route path="/keep" component={KeepApp} />
                    <Route path="/book" component={BookApp} />
                    <Route path="/about" component={About} />
                    <Route path="/" component={Home} />
                </Switch>
            </main>
        </Router>
    );
}
