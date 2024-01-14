let manutention = false;

module.exports = {
  get: function() { return manutention; },
  toggle: function() { manutention = !manutention; }
};
