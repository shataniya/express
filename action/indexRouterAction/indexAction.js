module.exports = (req, res, next) => {
    const data = {
        title: "Hello, World!"
    }
    res.render('index', data);
}