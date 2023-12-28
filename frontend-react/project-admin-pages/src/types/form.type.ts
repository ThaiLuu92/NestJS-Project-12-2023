export interface FormDataLogin {
  email: string;
  password: string;
}
export interface I_Category {
  id: string;
  name: string;
  description: string;
  status: boolean;
}

export interface I_Question {
  id: string;
  question_text: string;
  lesson_id: string;
  courses_id: string;
}

export interface I_Answer {
  id: string;
  question_id: string;
  answer_text: string;
  is_correct: string;
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
}

export interface I_Lesson {
  id: string;
  name: string;
  status: boolean;
  lesson_img: string;
  video: string;
  exercise: string;
  courses_id:string
}

export interface I_User {
  id: string;
  user_name: string;
  email: string;
  password: string;
  role: boolean;
  status: boolean;
  dob: string;
  level: string;
  avatar?: string | "";
  phone: string | "";
  address: string | "";
};


export interface I_Payment {
  id: string;
  status: boolean;
  course_price: number;
  courses_id: string;
  user_id: string;
  category_id: string;
  createAt: string;
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