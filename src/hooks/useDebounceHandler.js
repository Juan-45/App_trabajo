import { useDebouncedCallback } from "use-debounce";

const useDebounceHandler = (callback) => {
  /*const getDebouncedHandler = (name, callback = () => {}) =>
    useDebouncedCallback((value) => callback(name, value), 150, {
      trailing: true,
    });*/

  const getDebouncedCallback = useDebouncedCallback(callback, 150, {
    trailing: true,
  });

  return getDebouncedCallback;
};

export default useDebounceHandler;
