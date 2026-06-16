import { UserRoles, UserStatus } from '@/shared/types/user.types';

export class User {
  private constructor(
    public id: string,
    public email: string,
    public name: string | null,
    public phone: string | null,
    public iqama: string | null,
    public crNumber: string | null,
    public role: UserRoles,
    public status: UserStatus,
    public language: string,
    public verifiedAt: Date | null,
    public lastLoginAt: Date | null,
    public createdAt: Date,
    public updatedAt: Date
  ) {}

  static create(
    email: string,
    name: string | null,
    phone: string | null,
    iqama: string | null,
    crNumber: string | null,
    role: UserRoles,
    language: string = 'ar'
  ): User {
    return new User(
      '',
      email,
      name,
      phone,
      iqama,
      crNumber,
      role,
      UserStatus.PENDING,
      language,
      null,
      null,
      new Date(),
      new Date()
    );
  }

  verify() {
    this.status = UserStatus.VERIFIED;
    this.verifiedAt = new Date();
  }

  activate() {
    this.status = UserStatus.ACTIVE;
  }

  suspend() {
    this.status = UserStatus.SUSPENDED;
  }

  updateLastLogin() {
    this.lastLoginAt = new Date();
  }
}
