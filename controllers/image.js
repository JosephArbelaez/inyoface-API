const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: '004d2238001c45199def97c3509d590c'
   });

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
            res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'))
      }

const handleImage = (req, res, db) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('unable to get entry number'))
}

module.exports = {
    handelImage,
    handleApiCall
}