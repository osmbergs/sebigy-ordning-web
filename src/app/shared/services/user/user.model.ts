
export interface UserModel {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  created: string;
  updated: string;
  status: string;
  tenant_id: string;
}

export interface CreateUserModel extends Partial<UserModel> {
  password:string;
}
