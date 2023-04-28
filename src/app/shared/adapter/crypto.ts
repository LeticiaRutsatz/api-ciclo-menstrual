import bcrypt from 'bcrypt';

export class BCryptPassword {
  async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 8);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
