import * as userService from './service';
import * as logger from './services/logger.service';

export async function getUser(req, res) {
  const user = await userService.getById(req.params.id);
  res.send(user);
}

export async function getUsers(req, res) {
  const users = await userService.query(req.query);
  logger.debug(users);
  res.send(users);
}

export async function deleteUser(req, res) {
  await userService.remove(req.params.id);
  res.end();
}

export async function updateUser(req, res) {
  const user = req.body;
  try {
    await userService.update(user);
    req.session.user = user;
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
}
