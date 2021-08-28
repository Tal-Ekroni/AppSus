import { emails } from '../assets/json/mails.js'
import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query,
    getEmailById,
    getNextEmailById,
    getEmailIdx,
    formatEmailTimestamp,
    deleteEmail,
    composeEmail,
    toggleReadEmail,
    getUnreadEmails,
    formatTimePreview,
    handleEmailStaring
}

const loggedinUser = {
    email: 'tal@ekroni.com',
    fullname: 'Mahatma Appsus'
}

const KEY = 'emailsDB'
let gEmails = loadEmailsFromStorage()


function _createEmail(email) {
    return {
        id: utilService.makeId(),
        subject: email.subject === '' ? 'No Title' : email.subject,
        body: email.body === '' ? 'No content...' : email.body,
        isRead: false,
        isStared: false,
        sentAt: Date.now(),
        to: email.to
    }
}
function query(filterBy) {
    const { status, txt, isRead } = filterBy
    if (isRead === 'all') {
        switch (status) {
            case 'inbox':
                const inboxEmailsToShowAll = gEmails.filter(email => {
                    return email.subject.toLowerCase().includes(txt.toLowerCase()) && email.to === loggedinUser.email
                })
                return Promise.resolve(inboxEmailsToShowAll)
            case 'sent':
                const sentEmailsToShowAll = gEmails.filter(email => {
                    return email.subject.toLowerCase().includes(txt.toLowerCase()) && email.to !== loggedinUser.email
                })
                return Promise.resolve(sentEmailsToShowAll)
            case 'stared':
                const staredEmailsToShowAll = gEmails.filter(email => {
                    return email.isStared
                })
                return Promise.resolve(staredEmailsToShowAll)
        }
    }
    else {
        switch (status) {
            case 'inbox':
                const inboxEmailsToShowRead = gEmails.filter(email => {
                    return email.subject.toLowerCase().includes(txt.toLowerCase()) && email.to === loggedinUser.email && email.isRead === isRead
                })
            
                return Promise.resolve(inboxEmailsToShowRead)
            case 'sent':
                const sentEmailsToShowRead = gEmails.filter(email => {
                    return email.subject.toLowerCase().includes(txt.toLowerCase()) && email.to !== loggedinUser.email && email.isRead === isRead
                })
                return Promise.resolve(sentEmailsToShowRead)
            case 'stared':
                const staredEmailsToShowRead = gEmails.filter(email => {
                    return email.isStared && email.isRead === isRead
                })
                return Promise.resolve(staredEmailsToShowRead)
        }
    }
    return Promise.resolve(gEmails)
}

function saveEmailsToStorage() {
    storageService.saveToStorage(KEY, gEmails)
}

function loadEmailsFromStorage() {

    let mails = storageService.loadFromStorage(KEY)
    if (!mails || mails.length === 0) {
        mails = emails
    }
    return mails
}
function getEmailById(emailId) {
    var email = gEmails.find(function (email) {
        return email.id === emailId
    })
    return Promise.resolve(email)
}

function getNextEmailById(EmailId, diff) {
    let nextEmailIdx = getEmailIdx(EmailId) + diff
    if (nextEmailIdx === gEmails.length) nextEmailIdx = 0
    else if (nextEmailIdx === -1) nextEmailIdx = gEmails.length - 1
    return Promise.resolve(gEmails[nextEmailIdx].id)
}

function getEmailIdx(emailId) {
    return gEmails.findIndex(email => emailId === email.id)
}

function formatEmailTimestamp(timeStamp) {
    let time = new Date(timeStamp)
    var min = time.getMinutes()
    var hours = time.getHours()
    var day = time.getDate();
    var month = time.getMonth() + 1;
    var year = time.getFullYear();
    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;
    if (hours < 10) hours = `0${hours}`
    var today = day + "-" + month + "-" + year + " " + hours + ":" + min
    return today
}
function formatTimePreview(timeStamp) {
    let time = new Date(timeStamp)
    var min = time.getMinutes()
    var hours = time.getHours()
    if (hours < 10) hours = `0${hours}`
    var today = hours + ":" + min
    return today
}
function deleteEmail(emailId) {
    let emailIdx = getEmailIdx(emailId)
    gEmails.splice(emailIdx, 1)
    saveEmailsToStorage()
    return Promise.resolve()
}
function composeEmail(email) {
    var newEmail = _createEmail(email)
    if (newEmail.to !== loggedinUser.email) newEmail.isRead = true
    gEmails.unshift(newEmail)
    saveEmailsToStorage()
    return Promise.resolve()
}

function toggleReadEmail(emailIdx, decision) {
    gEmails[emailIdx].isRead = decision
    saveEmailsToStorage()
}

function getUnreadEmails() {
    let unread = gEmails.filter(email => {
        return !email.isRead && email.to === loggedinUser.email
    })
    return unread
}
function handleEmailStaring(emailIdx, isStar) {
    gEmails[emailIdx].isStared = isStar
    saveEmailsToStorage()
}