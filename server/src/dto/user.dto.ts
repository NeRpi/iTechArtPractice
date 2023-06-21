export class UserDto {
  public id?: string;
  public name?: string;
  public surname?: string;
  public DoB?: string;
  public email: string;
  public password: string;
  public roleId?: string;

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
