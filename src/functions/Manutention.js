let emManutencao = false;

module.exports = {
  get: function() { return emManutencao; },
  toggle: function() { emManutencao = !emManutencao; }
};
