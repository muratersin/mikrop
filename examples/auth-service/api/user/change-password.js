function get(req, res) {
  res.json(200, {
    data: {
      name: 'User',
    },
  });
}

module.exports = get;
