'use strict';

module.exports = {
  up: async (queryInterface, DataTypes, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

     await queryInterface.createTable('cashflow', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM({
          values: ['recipe', 'expense']
        }),
      },
      customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
      },
      employeeId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'employee_id',
        references: {
          model: {
            tableName: 'users',
          },
          key: 'id'
        },
      },
      serviceId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'service_id',
        references: {
          model: {
            tableName: 'services',
          },
          key: 'id'
        },
      },
      productId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'product_id',
        references: {
          model: {
            tableName: 'products',
          },
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'updated_at',
      },
      deletedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'deleted_at',
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

     await queryInterface.dropTable('cashflow');
  }
};
