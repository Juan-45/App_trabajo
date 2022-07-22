import { useDebouncedCallback } from "use-debounce";

const usePersonalDetailsForm = ({ setGlobalState }) => {
  const onChangeHandler = (name) => (value) => {
    setGlobalState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const debouncedSurname = useDebouncedCallback(
    onChangeHandler("surname"),
    250,
    {
      leading: true,
    }
  );

  const debouncedName = useDebouncedCallback(onChangeHandler("name"), 250, {
    leading: true,
  });

  const debouncedNationality = useDebouncedCallback(
    onChangeHandler("nationality"),
    250,
    {
      leading: true,
    }
  );

  const debouncedAge = useDebouncedCallback(onChangeHandler("age"), 250, {
    leading: true,
  });

  const debouncedBirthDate = useDebouncedCallback(
    onChangeHandler("birthDate"),
    250,
    {
      leading: true,
    }
  );

  const debouncedId = useDebouncedCallback(onChangeHandler("id"), 250, {
    leading: true,
  });

  const debouncedAddress = useDebouncedCallback(
    onChangeHandler("address"),
    250,
    {
      leading: true,
    }
  );

  const debouncedPhone = useDebouncedCallback(onChangeHandler("phone"), 250, {
    leading: true,
  });

  return {
    onChangeHandler,
    debouncedSurname,
    debouncedName,
    debouncedNationality,
    debouncedAge,
    debouncedBirthDate,
    debouncedId,
    debouncedAddress,
    debouncedPhone,
  };
};

export default usePersonalDetailsForm;
