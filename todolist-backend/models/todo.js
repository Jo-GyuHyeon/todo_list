module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'TODO',
    {
      id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: true
      },
      pos: {
        unique: true,
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 65535
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      due_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW
      },
      completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    },
    {
      timestamps: true,
      paranoid: false,
      underscored: true
    }
  );
};
