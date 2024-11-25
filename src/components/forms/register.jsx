'use client';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation'; // For Next.js 13+ routing
import { useRouter } from 'next/navigation'; // Correct import for Next.js 13+
import RouterLink from 'next/link';
import { toast } from 'react-hot-toast';
// yup
import * as Yup from 'yup';
// formik
import { useFormik, Form, FormikProvider } from 'formik';
// redux
import { useDispatch } from 'react-redux';
import { setLogin } from 'src/redux/slices/user';
// api
import { useMutation } from 'react-query';
import * as api from 'src/services';
// mui
import { Stack, TextField, IconButton, InputAdornment, MenuItem, Typography, Link } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// icons
import { MdOutlineVisibility, MdOutlineVisibilityOff, MdLock } from 'react-icons/md';
import { IoMdMale } from 'react-icons/io';
import { IoMdMail } from 'react-icons/io';
import { IoMdFemale } from 'react-icons/io';
import { FaTransgender } from 'react-icons/fa6';
import { MdLocalPhone } from 'react-icons/md';
// hooks
import { createCookies } from 'src/hooks/cookies';

export default function RegisterForm() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const redirect = searchParam.get('redirect');
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Independent toggle for confirm password

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'First name should contain only letters')
      .max(50, 'First name is too long!')
      .required('First name is required'),
    lastName: Yup.string()
      .matches(/^[A-Za-z]+$/, 'Last name should contain only letters')
      .max(50, 'Last name is too long!')
      .required('Last name is required'),
    email: Yup.string()
      .matches(emailRegex, 'Enter a valid email address')
      .required('Email is required'),
    phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Phone number is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password should be 8 characters or longer.'),
    confirmpass: Yup.string()
      .required('Confirm Password is required')
      .min(8, 'Password should be 8 characters or longer.')
      .oneOf([Yup.ref('password')], 'Passwords must match')
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phone: '',
      gender: 'male',
      email: '',
      password: '',
      confirmpass: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      setLoading(true);
      await mutate({
        ...values
      });
    }
  });

  const { mutate } = useMutation(api.register, {
    onSuccess: async (data) => {
      dispatch(setLogin(data.user));
      await createCookies('token', data.token);
      toast.success('OTP sent to your email' + ' ' + data.user.firstName);
      setLoading(false);
      router.push(redirect ? `/auth/verify-otp?redirect=${redirect}` : `/auth/verify-otp`);
    },
    onError: (err) => {
      const message = err.response?.data?.message || 'Something went wrong!';
      toast.error(message);
      setLoading(false);
    }
  });

  const { errors, touched, handleSubmit, values, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="firstName" component={'label'}>
                First Name
              </Typography>
              <TextField
                id="firstName"
                fullWidth
                type="text"
                {...getFieldProps('firstName')}
                error={Boolean(touched.firstName && errors.firstName)}
                helperText={touched.firstName && errors.firstName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoMdMale size={24} />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="lastName" component={'label'}>
                Last Name
              </Typography>
              <TextField
                fullWidth
                id="lastName"
                type="text"
                {...getFieldProps('lastName')}
                error={Boolean(touched.lastName && errors.lastName)}
                helperText={touched.lastName && errors.lastName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoMdMale size={24} />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="gender" component={'label'}>
                Gender
              </Typography>
              <TextField
                id="gender"
                select
                fullWidth
                {...getFieldProps('gender')}
                error={Boolean(touched.gender && errors.gender)}
                helperText={touched.gender && errors.gender}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      {values.gender === 'male' ? (
                        <IoMdMale size={24} />
                      ) : values.gender === 'female' ? (
                        <IoMdFemale size={24} />
                      ) : (
                        <FaTransgender />
                      )}
                    </InputAdornment>
                  )
                }}
              >
                {['Male', 'Female', 'Other'].map((option) => (
                  <MenuItem key={option} value={option.toLowerCase()}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="phone" component={'label'}>
                Phone
              </Typography>
              <TextField
                fullWidth
                id="phone"
                type="tel"
                inputProps={{ maxLength: 10 }} // Limit to 10 digits
                {...getFieldProps('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdLocalPhone size={24} />
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Stack>

          <Stack gap={0.5} width={1}>
            <Typography variant="overline" color="text.primary" htmlFor="email" component={'label'}>
              Email
            </Typography>
            <TextField
              id="email"
              fullWidth
              autoComplete="username"
              type="email"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IoMdMail size={24} />
                  </InputAdornment>
                )
              }}
            />
          </Stack>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="password" component={'label'}>
                Password
              </Typography>
              <TextField
                id="password"
                fullWidth
                autoComplete="current-password"
                type={showPassword ? 'text' : 'password'}
                {...getFieldProps('password')}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdLock size={24} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? <MdOutlineVisibility size={24} /> : <MdOutlineVisibilityOff size={24} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
            <Stack gap={0.5} width={1}>
              <Typography variant="overline" color="text.primary" htmlFor="confirmpass" component={'label'}>
                Confirm Password
              </Typography>
              <TextField
                id="confirmpass"
                fullWidth
                autoComplete="current-confirmpass"
                type={showConfirmPassword ? 'text' : 'password'}
                {...getFieldProps('confirmpass')}
                error={Boolean(touched.confirmpass && errors.confirmpass)}
                helperText={touched.confirmpass && errors.confirmpass}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdLock size={24} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ? <MdOutlineVisibility size={24} /> : <MdOutlineVisibilityOff size={24} />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Stack>
          </Stack>

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
            Register
          </LoadingButton>
        </Stack>

        <Typography variant="subtitle2" mt={3} textAlign="center">
          Already have an account? &nbsp;
          <Link href={`/auth/login${router.query?.redirect ? '?redirect=' + router.query?.redirect : ''}`} component={RouterLink}>
            Login
          </Link>
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" mt={2}>
          By registering, I agree to ttt-clothing&nbsp;
          <Link underline="always" color="text.primary" href="/terms-and-conditions" fontWeight={700}>
            Terms
          </Link>
          &nbsp;and&nbsp;
          <Link underline="always" color="text.primary" href="/privacy-policy" fontWeight={700}>
            Privacy policy
          </Link>
          .
        </Typography>
      </Form>
    </FormikProvider>
  );
}
