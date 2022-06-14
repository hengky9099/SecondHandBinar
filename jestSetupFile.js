import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

jest.useFakeTimers();
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist');
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((config, reducers) => reducers),
  };
});
