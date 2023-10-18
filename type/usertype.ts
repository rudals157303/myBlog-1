interface Iprofile {
  nickName: string;
  profileImg: string;
}

export interface IuserData {
  admin: boolean;
  name: string;
  email: string;
  profile?: Iprofile;
}
