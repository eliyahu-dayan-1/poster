import { Request, Response, NextFunction } from 'express';

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  //   console.log('middleware',req.session);

  // if (!req.session || !req.session.user) {
  //   res.status(401).end('Unauthorized!');
  //   return;
  // }
  next();
}

export async function requireAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // const user = req.session.user;
  // if (!user.isAdmin) {
  //   res.status(403).end('Unauthorized Enough..');
  //   return;
  // }
  next();
}
