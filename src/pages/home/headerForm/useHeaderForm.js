import { useDebouncedCallback } from "use-debounce";

const useHeaderForm = ({ setIPPHeader }) => {
  const onChangeHandler = (name) => (value) => {
    setIPPHeader((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const debouncedCover = useDebouncedCallback(onChangeHandler("cover"), 250, {
    leading: true,
  });
  const debouncedIppNro = useDebouncedCallback(onChangeHandler("ippNro"), 250, {
    leading: true,
  });

  const debouncedProsecution = useDebouncedCallback(
    onChangeHandler("prosecution"),
    250,
    {
      leading: true,
    }
  );

  const debouncedCourt = useDebouncedCallback(onChangeHandler("court"), 250, {
    leading: true,
  });

  const debouncedInstructor = useDebouncedCallback(
    onChangeHandler("instructor"),
    250,
    {
      leading: true,
    }
  );

  const debouncedSecretary = useDebouncedCallback(
    onChangeHandler("secretary"),
    250,
    {
      leading: true,
    }
  );

  return {
    debouncedCover,
    debouncedIppNro,
    debouncedProsecution,
    debouncedCourt,
    debouncedInstructor,
    debouncedSecretary,
  };
};

export default useHeaderForm;
