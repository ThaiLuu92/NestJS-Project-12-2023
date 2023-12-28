export interface errorMessageLogin {
  msgUserName: string;
  msgEmail: string;
  msgPassword: string;
  msgConfirmPassword: string;
}


export interface errorMessageResetPassword {
  msgCode?: string;
  msgEmail?: string;
  msgPassword?: string;
  msgConfirmPassword?: string;
}

export interface errorMessageChangePassword {
  msgOldPassword?: string;
  msgNewPassword?: string;
  msgConfirmPassword?: string;
}

export interface errorMessageCheckOut {
  msgCheck?: string;
}