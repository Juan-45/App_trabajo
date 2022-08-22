import { useDebouncedCallback } from "use-debounce";

const useDebounceHandler = () => {
  /*const getDebouncedHandler = (name, callback = () => {}) =>
    useDebouncedCallback((value) => callback(name, value), 150, {
      trailing: true,
    });*/

  const getDebouncedHandler = useDebouncedCallback(
    (callback) => callback,
    150,
    {
      trailing: true,
    }
  );

  return {
    getDebouncedHandler,
  };
};

export default useDebounceHandler;
