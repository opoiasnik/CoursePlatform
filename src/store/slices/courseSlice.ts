import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseState, Course } from '../../types';
import { mockApi } from '../../api/mockApi';

const getPurchasedCourses = (userId?: string): string[] => {
  if (!userId) return [];
  return JSON.parse(localStorage.getItem(`purchasedCourses_${userId}`) || '[]');
};

const getInitialPurchases = (): string[] => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      if (user?.id) {
        return getPurchasedCourses(user.id);
      }
    } catch (error) {
      console.error('Error getting initial purchases:', error);
    }
  }
  return [];
};

const initialState: CourseState = {
  courses: [],
  purchasedCourses: getInitialPurchases(),
  currentVideo: null,
  loading: false,
  error: null,
  filter: 'all',
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async () => {
    const courses = await mockApi.getCourses();
    return courses;
  }
);

export const purchaseCourse = createAsyncThunk(
  'courses/purchaseCourse',
  async (data: { courseId: string; price: number; userId: string }, { getState }) => {
    const result = await mockApi.handlePurchase(data.courseId);
    return { ...result, price: data.price, userId: data.userId };
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    setCurrentVideo: (state, action: PayloadAction<string | null>) => {
      state.currentVideo = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setFilter: (state, action: PayloadAction<'all' | 'purchased'>) => {
      state.filter = action.payload;
    },
    loadUserPurchases: (state, action: PayloadAction<string>) => {
      state.purchasedCourses = getPurchasedCourses(action.payload);
    },
    clearUserPurchases: (state) => {
      state.purchasedCourses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      })
      .addCase(purchaseCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(purchaseCourse.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.success) {
          state.purchasedCourses.push(action.payload.courseId);
          localStorage.setItem(`purchasedCourses_${action.payload.userId}`, JSON.stringify(state.purchasedCourses));
        }
      })
      .addCase(purchaseCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Purchase failed';
      });
  },
});

export const { setCurrentVideo, clearError, setFilter, loadUserPurchases, clearUserPurchases } = courseSlice.actions;
export default courseSlice.reducer;
