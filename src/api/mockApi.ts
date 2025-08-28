import { Course } from '../types';

const mockCourses: Course[] = [
  {
    id: '1',
    title: 'React Fundamentals',
    description: 'Learn the basics of React including components, state, and props. Perfect for beginners who want to start their journey in modern web development.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    price: 99.99,
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Master advanced TypeScript concepts including generics, decorators, and complex type definitions for professional development.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    price: 149.99,
  },
  {
    id: '3',
    title: 'Node.js Backend Development',
    description: 'Build robust backend applications with Node.js, Express, and MongoDB. Learn REST APIs, authentication, and deployment.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    price: 199.99,
  },
  {
    id: '4',
    title: 'Redux State Management',
    description: 'Complete guide to Redux and Redux Toolkit for managing complex application state in React applications.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
    price: 129.99,
  },
  {
    id: '5',
    title: 'CSS Grid & Flexbox',
    description: 'Master modern CSS layout techniques with Grid and Flexbox. Create responsive layouts that work on all devices.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
    price: 79.99,
  },
  {
    id: '6',
    title: 'JavaScript ES6+',
    description: 'Modern JavaScript features including arrow functions, destructuring, async/await, and modules for contemporary development.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
    price: 89.99,
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApi = {
  async getCourses(): Promise<Course[]> {
    await delay(800);
    return mockCourses;
  },

  async handlePurchase(courseId: string): Promise<{ success: boolean; courseId: string; message?: string }> {
    await delay(1000);
    
    const random = Math.random();
    if (random > 0.9) {
      throw new Error('Payment failed. Please try again.');
    }
    
    return {
      success: true,
      courseId,
      message: 'Course purchased successfully!',
    };
  },
};
