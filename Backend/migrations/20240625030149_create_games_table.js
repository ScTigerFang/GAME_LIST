exports.up = function (knex) {
  return knex.schema.createTable("games", (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.integer("gameplay").unsigned();
    table.integer("graphics").unsigned();
    table.integer("sound_design").unsigned();
    table.integer("storyline").unsigned();
    table.integer("replayability").unsigned();
    table.integer("multiplayer").unsigned();
    table.integer("accessibility").unsigned();
    table.text("notes");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("games");
};
