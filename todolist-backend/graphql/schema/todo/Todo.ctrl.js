export const addTodo = async (_, { input }, { db, body }) => {
  let todo;
  const due_date = input.due_date ? input.due_date : null;
  const alarm = due_date ? true : false;
  try {
    todo = await db.TODO.create({ ...input, due_date: due_date, alarm: alarm });
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

  const due_date = input.due_date ? input.due_date : null;
  const now = new Date().getTime();
  const isExpired = due_date ? now - new Date(due_date).getTime() > 0 : false;

  const alarm = due_date ? (isExpired ? false : true) : false;

  try {
    todo = await db.TODO.update(
      { ...input, due_date: due_date, alarm: alarm },
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

export const checkTodosNotificaion = async (_, {}, { db, body }) => {
  const { Op } = db.Sequelize;

  try {
    await db.TODO.update(
      { alarm: false },
      {
        where: {
          due_date: {
            [Op.lt]: new Date()
          }
        },
        returning: true,
        plain: true
      }
    );
  } catch (error) {
    console.log(error);
    return false;
  }
  return true;
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
