import classes from "./Checkout.module.css";
import useInput from "../../hooks/use-input";

const isNotEmpty = (value) => value.trim() !== "";
const isNotFiveChars = (value) => value.trim().length !== "5";

const Checkout = (props) => {
  let formIsValid = false;

  const {
    value: enteredName,
    hasError: nameHasError,
    reset: resetNameInput,
    valueIsValid: nameIsValid,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: enteredAddress,
    hasError: addressHasError,
    reset: resetAddressInput,
    valueIsValid: addressIsValid,
    valueChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: enteredCity,
    hasError: cityHasError,
    reset: resetCityInput,
    valueIsValid: cityIsValid,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
  } = useInput(isNotEmpty);
  const {
    value: enteredZip,
    hasError: zipHasError,
    reset: resetZipInput,
    valueIsValid: zipIsValid,
    valueChangeHandler: zipChangeHandler,
    inputBlurHandler: zipBlurHandler,
  } = useInput(isNotFiveChars);

  if (nameIsValid && addressIsValid && zipIsValid && cityIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return <p>Form is not valid.</p>;
    }
    const orderData = {
      name: enteredName,
      address: enteredAddress,
      city: enteredCity,
      zipCode: enteredZip,
    };
    props.onConfirm(enteredName, enteredAddress, enteredCity, enteredZip);
    resetAddressInput();
    resetZipInput();
    resetCityInput();
    resetNameInput();
  };

  const nameInputClasses = !nameHasError ? classes.control : classes.invalid;
  const addressInputClasses = !addressHasError
    ? classes.control
    : classes.invalid;
  const cityInputClasses = !cityHasError ? classes.control : classes.invalid;
  const zipInputClasses = !zipHasError ? classes.control : classes.invalid;
  console.log(formIsValid);
  return (
    <form className={classes.form} onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        ></input>
      </div>
      <div className={addressInputClasses}>
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          id="address"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          value={enteredAddress}
        ></input>
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City: </label>
        <input
          type="text"
          id="city"
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
          value={enteredCity}
        ></input>
      </div>
      <div className={zipInputClasses}>
        <label htmlFor="zip">ZIP Code: </label>
        <input
          type="text"
          id="zip"
          onChange={zipChangeHandler}
          onBlur={zipBlurHandler}
          value={enteredZip}
        ></input>
      </div>
      <div className={classes.actions}>
        <button onClick={props.onCancel} type="button">
          Cancel
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
