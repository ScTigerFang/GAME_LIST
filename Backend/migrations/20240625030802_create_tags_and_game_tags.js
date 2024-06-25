exports.up = function (knex) {
  return knex.schema
    .createTable("tags", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable().unique();
    })
    .createTable("game_tags", (table) => {
      table.increments("id").primary();
      table
        .integer("game_id")
        .unsigned()
        .references("id")
        .inTable("games")
        .onDelete("CASCADE");
      table
        .integer("tag_id")
        .unsigned()
        .references("id")
        .inTable("tags")
        .onDelete("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTable("game_tags").dropTable("tags");
};
