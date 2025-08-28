export interface Course {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  price: number;
}

export interface User {
  id: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface CourseState {
  courses: Course[];
  purchasedCourses: string[];
  currentVideo: string | null;
  loading: boolean;
  error: string | null;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  confirmPassword: string;
}
