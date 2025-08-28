import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { CourseState, Course } from '../../types';
import { mockApi } from '../../api/mockApi';

const initialState: CourseState = {
  courses: [],
  purchasedCourses: JSON.parse(localStorage.getItem('purchasedCourses') || '[]'),
  currentVideo: null,
  loading: false,
  error: null,
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
  async (courseId: string) => {
    const result = await mockApi.handlePurchase(courseId);
    return result;
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
          localStorage.setItem('purchasedCourses', JSON.stringify(state.purchasedCourses));
        }
      })
      .addCase(purchaseCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Purchase failed';
      });
  },
});

export const { setCurrentVideo, clearError } = courseSlice.actions;
export default courseSlice.reducer;
