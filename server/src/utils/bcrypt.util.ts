import bcrypt from "bcrypt";

export class BcryptUtil {
  static async hash(data: string) {
    return await bcrypt.hash(data, 3);
  }

  static async compare(data: string, hash: string) {
    return await bcrypt.compare(data, hash);
  }
}
