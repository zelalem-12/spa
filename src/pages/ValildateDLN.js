import React, { useState, useRef, useEffect } from 'react';
import { config } from '../config';
import Meta from 'components/Meta';
import { client } from '../utils/apiClient';
import InputForm from 'components/InputForm';
import TextAreaForm from 'components/textAreaForm';
import SelectFrom from 'components/SelectForm';
import InputDateForm from 'components/InputDateForm';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton, Loader, FieldsWrapper } from 'components/lib';
toast.configure();

const ValidateDln = () => {
  const pageTitle = 'Driver Licence Check';
  const [dl, setDl] = useState('');
  const [title, setTitle] = useState('');
  const [foreName, setForeName] = useState('');
  const [middleNames, setMiddleNames] = useState('');
  const [surename, setSurename] = useState('');
  const [suffix, setSuffix] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    if (!dl) {
      toast.error('Driver licence is required field!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setLoading(true);

      const dobDymFormat = dob ? dob.split('-').reverse().join('-') : '';
      const name_dob_gender = [title, foreName, middleNames, surename, suffix, dobDymFormat, gender].join('|');
      console.log({ dl, title, foreName, middleNames, surename, suffix, dob, gender, name_dob_gender });

      try {
        const {
          validateDln: { apiUrl: API_URL },
        } = config;
        const apiResponse = await client(API_URL, { data: { dl, name_dob_gender } });
        const { result, message } = apiResponse;
        if (result)
          toast.success(message || 'Validation passed!', {
            position: toast.POSITION.TOP_RIGHT,
          });
        else
          toast.error(message || 'Validation Failed!', {
            position: toast.POSITION.TOP_RIGHT,
          });
        setJsonResponse(JSON.stringify(apiResponse, undefined, 4));
      } catch (err) {
        toast.error(err.message || 'Error While Fetching', {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDateChange = event => {
    const valueLength = dob.length;
    const value = event.target.value;
    const currentInput = value
      .split('')
      .filter(el => el !== '-')
      .join('');

    if (!isNaN(currentInput)) {
      let allAllowed = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      let ValidDigits = [];
      if (valueLength === 0) {
        ValidDigits = [0, 1, 2, 3];
        if (ValidDigits.includes(parseInt(currentInput))) {
          setDob(currentInput);
        }
      } else if (valueLength === 1) {
        const firstNumChar = dob[0];
        switch (firstNumChar) {
          case '1':
          case '2':
            ValidDigits = allAllowed;
            break;
          case '0':
            ValidDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            break;
          case '3':
            ValidDigits = [0, 1];
            break;
          default:
            ValidDigits = [];
        }
        if (ValidDigits.includes(parseInt(currentInput[1]))) {
          setDob(`${currentInput}-`);
        }
      } else if (valueLength === 3) {
        ValidDigits = [0, 1];
        if (ValidDigits.includes(parseInt(currentInput[2]))) {
          setDob(value);
        }
      } else if (valueLength === 4) {
        const forthNumChar = dob[3];
        switch (forthNumChar) {
          case '0':
            ValidDigits = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            break;
          case '1':
            ValidDigits = [0, 1, 2];
            break;
          default:
            ValidDigits = [];
        }
        if (ValidDigits.includes(parseInt(currentInput[3]))) {
          setDob(`${value}-`);
        }
      } else if (valueLength === 6) {
        ValidDigits = [1, 2];
        const sixthDigit = parseInt(currentInput[4]);
        if (ValidDigits.includes(sixthDigit)) {
          const autoDigit = sixthDigit === 1 ? 9 : 0;
          setDob(`${value}${autoDigit}`);
        }
      } else if (valueLength === 8) {
        const seventhNumChar = dob[7];
        switch (seventhNumChar) {
          case '9':
            ValidDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            break;
          case '0':
            ValidDigits = [0];
            break;
          default:
            ValidDigits = [];
        }
        if (ValidDigits.includes(parseInt(currentInput[6]))) {
          setDob(value);
        }
      } else if (valueLength === 9) {
        const eightNumChar = dob[7];
        switch (eightNumChar) {
          case '9':
            ValidDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            break;
          case '0':
            ValidDigits = [0, 1, 2, 3, 4, 5, 6, 7, 8];
            break;
          default:
            ValidDigits = [];
        }
        if (ValidDigits.includes(parseInt(currentInput[7]))) {
          setDob(value);
        }
      }
    }
  };

  const handleKeyEvent = event => {
    if (event.key === 'Backspace' && dob.length) setDob(dob.slice(0, -1));
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div>
      <Meta title={pageTitle} />
      <h1>{pageTitle}</h1>
      <form className="mt-3" onSubmit={handleSubmit}>
        <FieldsWrapper>
          <InputForm
            inputRef={inputRef}
            type={'text'}
            placeholder={'Driving Licence Number'}
            value={dl}
            handleChange={event => setDl(event.target.value)}
          />
          <InputForm
            type={'text'}
            placeholder={'Title'}
            value={title}
            handleChange={event => setTitle(event.target.value)}
          />
          <InputForm
            type={'text'}
            placeholder={'Forename'}
            value={foreName}
            handleChange={event => setForeName(event.target.value)}
          />
          <InputForm
            type={'text'}
            placeholder={'Middle Name(s)'}
            value={middleNames}
            handleChange={event => setMiddleNames(event.target.value)}
          />
          <InputForm
            type={'text'}
            placeholder={'Surname'}
            value={surename}
            handleChange={event => setSurename(event.target.value)}
          />
          <InputForm
            type={'text'}
            placeholder={'Suffix'}
            value={suffix}
            handleChange={event => setSuffix(event.target.value)}
          />
          <InputDateForm
            type={'text'}
            placeholder={'DOB'}
            value={dob}
            handleChange={handleDateChange}
            handleKeyEvent={handleKeyEvent}
          />
          <SelectFrom value={gender} handleChange={event => setGender(event.target.value)} />
        </FieldsWrapper>
        <LoadingButton type="submit" className="btn btn-primary mt-2">
          {loading ? <Loader /> : 'Submit'}
        </LoadingButton>
      </form>

      <TextAreaForm jsonValue={jsonResponse} cols={20} rows={10} formLabel="Response" readOnly={true} />
    </div>
  );
};

export default ValidateDln;
