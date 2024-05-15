import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { BASE_URL } from '../../util/Auth';

const schema = yup.object().shape({
  gender: yup.string()
    .required('성별을 선택해주세요'),
  firstname: yup.string()
    .min(1, "이름은 한 글자 이상이어야 합니다.")
    .required(),
  lastname: yup.string()
    .min(1, "성은 한 글자 이상이어야 합니다.")
    .required(),
  selectedYear: yup.string().required('연도를 선택해주세요.'),
  selectedMonth: yup.string().required('월을 선택해주세요.'),
  selectedDay: yup.string().required('일을 선택해주세요.')
    .test('minimumAge', '14세 미만은 가입할 수 없습니다.', (value, { parent }) => {
      const selectedDate = new Date(
        parseInt(parent.selectedYear),
        parseInt(parent.selectedMonth) - 1,
        parseInt(parent.selectedDay)
      );
      if (
        selectedDate.getFullYear() !== parseInt(parent.selectedYear) ||
        selectedDate.getMonth() !== parseInt(parent.selectedMonth) - 1 ||
        selectedDate.getDate() !== parseInt(parent.selectedDay)
      ) {
        return false;
      }
      const today = new Date();
      const age = today.getFullYear() - selectedDate.getFullYear();
      if (today.getMonth() < selectedDate.getMonth() || (today.getMonth() === selectedDate.getMonth() && today.getDate() < selectedDate.getDate())) {
        return age - 1 >= 14;
      }
      return age >= 14;
    }),
  email: yup.string().email().required("이메일을 입력해주세요"),
  phoneNumber: yup.string()
    .matches(/^[0-9]+$/, '숫자만 입력해주세요.')
    .required('전화번호를 입력해주세요'),
  id: yup.string().required("아이디를 입력해주세요"),
  password: yup.string()
    .min(8, "비밀번호는 8자리 이상이어야 합니다.")
    .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/, "영문자 및 숫자로 조합해주세요")
    .required('비밀번호를 입력해주세요'),
});

const RegisterPage = () => {

  const navigate = useNavigate();

  const [selectedYear, setSelectedYear] = useState('2010');
  const [selectedMonth, setSelectedMonth] = useState('1');
  const [selectedDay, setSelectedDay] = useState('1');

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
  };

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const goHome = () => {
    navigate('/');
  }

  const thisYear = new Date().getFullYear();

  const BIRTHDAY_YEAR_LIST = Array.from(
    { length: thisYear - 1950 - 13 },
    (_, i) => `${i + 1950}`,
  ).reverse();
  const BIRTHDAY_MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}`);
  const BIRTHDAY_DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}`);

  const onSubmit = (data) => {
    const { gender, firstname, lastname, email, phoneNumber, id, password } = data;
    const birth = `${selectedYear}-${selectedMonth}-${selectedDay}`;
    const registerData = {
      "gender": gender,
      "firstName": firstname,
      "lastName": lastname,
      "birth": birth,
      "email": email,
      "phone": phoneNumber,
      "accountId": id,
      "accountPassword": password
    }
    axios.post(BASE_URL+"/register", registerData, {
    })
      .then(res => {
        if (res.status === 200) {
          goHome();
        } else {
          alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
      }).catch(err => {
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
      });
  };

  return (
    <>
      <div className="max-w-lg mx-auto py-5 px-4 bg-white shadow-md rounded-lg">
        <h1 className="text-3xl font-extrabold mb-4 text-center">회원가입</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <labe className="block mb-1" l>성별</labe>
            <div className="w-80 ">
              <div className="flex rounded-md shadow-sm">
                <button onClick={() => setValue('gender', "m")} style={{ cursor: "pointer" }}
                  type="button" className="mr-1 flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-200 hover:bg-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:text-white rounded-l-md rounded-r-none">
                  남성
                </button>
                <button onClick={() => setValue('gender', "f")} style={{ cursor: "pointer" }}
                  type="button" className="flex-1 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 focus:border-blue-500 focus:bg-blue-200 hover:bg-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:text-white rounded-r-md">
                  여성
                </button>
              </div>
            </div>
            {errors.gender && <p className="text-red-500">{errors.gender.message}</p>}
          </div>
          <div>
            <label className="block mb-1">이름</label>
            <input type="text" {...register('firstname')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {errors.firstname && <p className="text-red-500">{errors.firstname.message}</p>}
            <label>성</label>
            <input type="text" {...register('lastname')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {errors.lastname && <p className="text-red-500">{errors.lastname.message}</p>}
          </div>
          <div>
            <label className="block mb-1">생년월일</label>
            <div className="birthdaySelectFrame">
              <select className="birthdayBox yearBox" onChange={handleYearChange} {...register('selectedYear')}>
                {BIRTHDAY_YEAR_LIST.map((year, index) => (
                  <option key={index}>{year}년</option>
                ))}
              </select>
              {errors.selectedYear && <p className="text-red-500">{errors.selectedYear.message}</p>}
              <select className="birthdayBox monthBox" onChange={handleMonthChange} {...register('selectedMonth')}>
                {BIRTHDAY_MONTH_LIST.map((month, index) => (
                  <option key={index}>{month}월</option>
                ))}
              </select>
              {errors.selectedMonth && <p>{errors.selectedMonth.message}</p>}
              <select className="birthdayBox dayBox" onChange={handleDayChange} {...register('selectedDay')}>
                {BIRTHDAY_DAY_LIST.map((day, index) => (
                  <option key={index}>{day}일</option>
                ))}
              </select>
              {errors.selectedDay && <p className="text-red-500">{errors.selectedDay.message}</p>}
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="email" className="block mb-1">이메일</label>
            <input type="email" {...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block mb-1">전화번호</label>
            <input type="text" {...register('phoneNumber')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
          </div>
          <div>
            <label className="block mb-1">ID</label>
            <input type="text" {...register('id')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {errors.id && <p className="text-red-500">{errors.id.message}</p>}
          </div>
          <div>
            <labe className="block mb-1" l>비밀번호</labe>
            <input type="password" {...register('password')}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-50 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <div className="flex justify-between pt-3">
            <button type="submit" className="w-1/3 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-500 focus:border-blue-500 hover:bg-blue-600">회원가입</button>
            <button type="button" onClick={goHome} className="w-1/3 py-2 text-sm font-medium text-white bg-red-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-red-500 focus:border-red-500 hover:bg-red-600">취소</button>
          </div >
        </form>
      </div >
    </>
  );
};

export default RegisterPage; 