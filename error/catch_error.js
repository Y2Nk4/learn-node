try {
    throw new Error('I am Error')
} catch (e) {
    console.log(e.stack)
    console.log(Error.captureStackTrace(e))
}