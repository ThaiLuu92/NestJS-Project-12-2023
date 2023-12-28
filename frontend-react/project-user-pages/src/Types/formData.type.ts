export interface FormDataLogin {
  email: string;
  password: string;
}

export interface FormDataRegistration {
  user_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormDataConfirmEmail  {
  email: string;
};

export interface FormDataChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface FormDataResetPassword {
  codeResetPassword: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export interface I_Course {
  id: string;
  name: string;
  description: string;
  level: string;
  price: number;
  duration: number;
  course_img: File |string;
  category_id: string;
  status: boolean;
  isNew: boolean; 
}

export interface I_Category {
  id: string;
  name: string;
  description: string;
  status: boolean;
}

export interface I_User {
  id: string;
  user_name: string;
  email: string;
  dob?: string;
  level?: string;
  phone?: string;
  address?: string;
};

export interface I_User_Avatar {
  avatar: File |string ;
};

export interface I_UserPay {
  email: string;
  user_name: string;
  phone: string;
  address: string;
  cardName: string;
  numberCard: string;
  expDate: string;
}

export interface I_UserPayMent {
  user_id?: string;
  courses_id?: string;
  course_price?: number;
  course_name?: string;
  category_id?: string;
}


export interface I_PaymentView {
  id: string;
  course_price: number;
  createdAt: string;
  user_name: string;
  user_email: string;
  category_name: string;
  course_name: string;
}

export interface I_CourseView {
  id: string;
  status: string;
  createdAt: string;
  user_name: string;
  user_id: string;
  course_img: string;
  courses_name: string;
  course_id: string;
}

export interface I_Question {
  id: string;
  question_text: string;
  lesson_id: string;
  courses_id: string;
  answers: I_Answer[];
}

export interface I_Answer {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: string;
}