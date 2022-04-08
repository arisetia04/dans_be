"use strict";

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("users", {
            id: {
                type: Sequelize.UUID,
                primaryKey: true
            },
            name: Sequelize.STRING,
            username: Sequelize.STRING,
            password: Sequelize.STRING,
            createdAt: Sequelize.DATE,
            updatedAt: Sequelize.DATE,
            deletedAt: Sequelize.DATE
        });
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("users");
    }
};
