import { Exclude, Expose } from 'class-transformer';
import { IUser } from '../interfaces';

interface IUserEntity extends IUser {
  get citizenStatus(): CitizenStatus;
}

type CitizenStatus = 'Child' | 'Adult' | 'Senior';

export class UserEntity implements IUserEntity {
  id: number;
  firstname: string;
  lastname: string;
  email: string;

  @Exclude()
  dateOfBirth: Date;

  @Exclude()
  password: string;

  @Expose()
  get citizenStatus(): CitizenStatus {
    const birthDate = new Date(this.dateOfBirth).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthDate;
    if (age < 18) {
      return 'Child';
    } else if (age > 18 && age < 60) {
      return 'Adult';
    } else {
      return 'Senior';
    }
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
