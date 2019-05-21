export const addTodo = async (_, { input }, { db, body }) => {
  let todo;
  const due_date = input.due_date ? input.due_date : null;
  try {
    todo = await db.TODO.create({ ...input, due_date: due_date });
  } catch (error) {
    console.error(error);
  }
  return todo;
};

export const getTodos = async (_, { input }, { db, body }) => {
  const { max_id, limit } = input;
  const { Op } = db.Sequelize;

  let todos = [];
  try {
    todos = await db.TODO.findAll({
      where: {
        id: {
          [Op.gt]: max_id
        }
      },
      limit: limit || 50,
      order: [['pos', 'ASC']]
    });
  } catch (error) {
    console.error(error);
  }

  return todos;
};

export const updateTodo = async (_, { input }, { db, body }) => {
  let todo;

  try {
    todo = await db.TODO.update(
      { ...input, due_date: input.due_date ? input.due_date : null },
      {
        where: {
          id: input.id
        },
        returning: true,
        plain: true
      }
    );
  } catch (error) {
    console.error(error);
  }
  const updated_todo = todo[1].dataValues;

  return updated_todo;
};

export const bulkUpdateTodo = async (_, { input }, { db, body }) => {
  let todos = [];

  try {
    for (let i = 0; i < input.length; i++) {
      const todo = input[i];
      const updated_todo = await db.TODO.update(
        { ...todo, due_date: todo.due_date ? todo.due_date : null },
        {
          where: {
            id: todo.id
          },
          returning: true,
          plain: true
        }
      );
      todos.push(updated_todo[1].dataValues);
    }
  } catch (error) {
    console.error(error);
  }
  return todos;
};

export const removeTodo = async (_, { id }, { db, body }) => {
  let todo;
  try {
    todo = await db.TODO.destroy({
      where: { id: id },
      returning: true,
      plain: true
    });
  } catch (error) {
    console.error(error);
  }

  return todo;
};
