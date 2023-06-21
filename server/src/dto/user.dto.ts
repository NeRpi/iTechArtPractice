export class UserDto {
  id?: string;
  name?: string;
  surname?: string;
  DoB?: string;
  email: string;
  password: string;
  roleId?: string;

  constructor(data: any) {
    ({
      id: this.id,
      name: this.name,
      surname: this.surname,
      DoB: this.DoB,
      email: this.email,
      password: this.password,
      roleId: this.roleId,
    } = data);
  }
}
