import { books } from '../assets/json/books.js'
import { storageService } from './storage.service.js'
import {utilService} from './util.service.js'

export const bookService = {
    query,
    getBookById,
    getNextBookById,
    getCurrDate,
    saveReview,
    getBookIdx,
    getBooksFromApi,
    onSaveBook
}
const KEY = 'bookDB'
let gBooks = _loadBookFromStorage() || books
const CACHE_TIME = 1000 * 60 * 60 * 24
const chachedData = {}


function query(filterBy) {
    if (filterBy) {
        let { title, minPrice, maxPrice } = filterBy
        maxPrice = maxPrice ? maxPrice : Infinity
        minPrice = minPrice ? minPrice : 0
        const booksToShow = gBooks.filter(book => book.title.includes(title) && book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice)
        return Promise.resolve(booksToShow)
    }
    return Promise.resolve(gBooks)
}


function getBookById(bookId) {
    var book = gBooks.find(function (book) {
        return book.id === bookId
    })
    return Promise.resolve(book)
}

function getNextBookById(bookId, diff) {
    let nextBookIdx = getBookIdx(bookId) + diff
    if (nextBookIdx === gBooks.length) nextBookIdx = 0
    else if (nextBookIdx === -1) nextBookIdx = gBooks.length - 1
    return Promise.resolve(gBooks[nextBookIdx].id)
    // איך מקבלים את זה חזרה
}

function getBookIdx(bookId) {
    return gBooks.findIndex(book => bookId === book.id)
}

function saveReview(bookId, review) {
    // let book = getBookById(bookId)
    let bookIdx = getBookIdx(bookId)
    if (!gBooks[bookIdx].reviews) gBooks[bookIdx].reviews = []
    gBooks[bookIdx].reviews.push(review)
    _saveBooksToStorage()
    return Promise.resolve()
}

function getCurrDate() {
    var date = new Date();
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;
    return today
}

function _saveBooksToStorage() {
    storageService.saveToStorage(KEY, gBooks)
}

function _loadBookFromStorage() {
    return storageService.loadFromStorage(KEY)

}



function getBooksFromApi(searchKey) {
    // const dataFromStorage = _loadBookFromStorage()
    // if (dataFromStorage && dataFromStorage.lastReq + CACHE_TIME > Date.now()) {
    //     console.log('here chached');
    //     return Promise.resolve(dataFromStorage.data)
    // }
    return  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${searchKey}&key=AIzaSyAmLAB5XFK6umPfY_dKYLvAzUTBdW4ysXs`)
        .then(res => {
            // chachedData.lastReq = Date.now()
            // chachedData.data = res.data
            // _saveBooksToStorage()
            return res.data

        })
}

function _createBook(book) {
    return {
        id: book.id,
        title: book.volumeInfo.title,
        thumbnail: book.volumeInfo.imageLinks.thumbnail,
        authors: book.volumeInfo.authors,
        description: book.volumeInfo.description,
        listPrice: {
            amount: utilService.getRandomIntInclusive(10, 200),
            isOnsale: (Math.random() > 0.5) ? true : false,
            currencyCode: 'USD'
        },
        pageCount: book.volumeInfo.pageCount,
        publishedDate: book.volumeInfo.publishedDate,
        // review: []
    }
}

function onSaveBook(book) {
    gBooks.unshift(_createBook(book))
    _saveBooksToStorage()
    return Promise.resolve()
}