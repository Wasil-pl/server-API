const NODE_ENV = process.env.NODE_ENV;

exports.DB_URI =
  NODE_ENV === 'production'
    ? 'url to remote db'
    : NODE_ENV === 'test'
    ? 'mongodb+srv://Wasil:EWHveTWdVRNpDpNh@cluster0.lvwrcbb.mongodb.net/music_festival_test?retryWrites=true&w=majority'
    : 'mongodb+srv://Wasil:EWHveTWdVRNpDpNh@cluster0.lvwrcbb.mongodb.net/music_festival?retryWrites=true&w=majority';
