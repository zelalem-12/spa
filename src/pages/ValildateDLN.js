/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useEffect } from 'react';
import { config } from '../config';
import Meta from 'components/Meta';
import { client } from '../utils/apiClient';
import InputForm from 'components/InputForm';
import TextAreaForm from 'components/textAreaForm';
import SelectFrom from 'components/SelectForm';
import InputDateForm from 'components/InputDateForm';
import { toast } from 'react-toastify';
import { getParsedDateInput } from 'utils/customDateParser';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingButton, Loader, FieldsWrapper } from 'components/lib';
import * as mq from 'styles/media-queries';
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
  const [validDobDate, setValidDobDate] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    if (!dl) {
      toast.error('Driver licence is required field!', {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setLoading(true);

      const name_dob_gender = [title, foreName, middleNames, surename, suffix, validDobDate, gender].join('|');

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

  useEffect(() => {
    if (dob && dob.length === 10 && dob[2] === '-' && dob[5] === '-') {
      setValidDobDate(dob);
    }
  }, [dob]);

  const handleDateChange = event => {
    event.preventDefault();
    const currentInput = event.target.value;
    if (currentInput && dob.length < 10) {
      const parsedValue = getParsedDateInput(dob, currentInput);
      setDob(parsedValue);
    }
  };

  const handleKeyEvent = ({ key }) => {
    if (key === 'Backspace' || key === 'Delete') setDob('');
  };
  const handleBlur = () => {
    if (validDobDate) {
      const [dd, mm, yyyy] = dob.split('-');
      const stringDate = new Date([mm, dd, yyyy].join('-')).toDateString();
      const [day, month, date, year] = stringDate.split(' ');
      const first = date[0] === '0' ? '' : date[0];
      const second = parseInt(date[1]);
      const append = second > 2 ? 'th' : second === 2 ? 'nd' : 'st';
      const formatedDte = first ? first + second + append : second + append;
      setDob([day, month, formatedDte, year].join(' '));
    } else setDob('Invalid Date');
  };
  const focusHandle = () => {
    setDob(validDobDate);
  };

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return (
    <div
      css={{
        [mq.large]: {
          maxWidth: '26%',
          marginLeft: '37%',
          marginTop: '5%',
        },

        [mq.small]: {
          minwidth: '90% !important',
        },
      }}
    >
      <Meta title={pageTitle} />
      <form onSubmit={handleSubmit}>
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
            focusHandle={focusHandle}
            handleBlur={handleBlur}
          />
          <SelectFrom value={gender} handleChange={event => setGender(event.target.value)} />
        </FieldsWrapper>
        <div className="col-md-12 text-center">
          <LoadingButton type="submit">{loading ? <Loader /> : 'Submit'}</LoadingButton>
        </div>
      </form>

      <TextAreaForm
        placeholder={'Your Result Here'.toUpperCase()}
        jsonValue={jsonResponse}
        cols={20}
        rows={10}
        formLabel="Response"
        readOnly={true}
      />
    </div>
  );
};

export default ValidateDln;
