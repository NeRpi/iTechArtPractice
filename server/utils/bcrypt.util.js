import bcrypt from "bcrypt";

export async function hash(data) {
  return await bcrypt.hash(data, 3);
}

export async function compare(data, hash) {
  return await bcrypt.compare(data, hash);
}
