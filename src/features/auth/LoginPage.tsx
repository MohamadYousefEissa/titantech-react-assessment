import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Card,
} from "@mui/material";
import { toast } from "react-toastify";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loginUser } from "./AuthSlice";
import { useTranslation } from "react-i18next";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.auth.user);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const loginSchema = yup.object({
    username: yup
      .string()
      .required(t("login-page.form.username.validators.required")),
    password: yup
      .string()
      .required(t("login-page.form.password.validators.required"))
      .min(3, t("login-page.form.password.validators.length", { min: 3 })),
  });

  type LoginFormInputs = yup.InferType<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
    // reValidateMode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  if (user) return <Navigate to="/" replace />;

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    try {
      await dispatch(
        loginUser({ username: data.username, password: data.password }),
      ).unwrap();
      navigate("/");
      toast.success(t("login-page.logged-success"));
    } catch (err) {
      console.error(err);
      toast.error(t("errors.invalid-credentials"));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card variant="outlined" className="w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8 text-center">
          <h1 className="text-2xl font-bold">{t("login-page.title")}</h1>
          <p className="text-sm text-muted mt-1">
            {t("login-page.description")}
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <div>
            <TextField
              fullWidth
              id="username"
              label={t("login-page.form.username.label")}
              variant="outlined"
              size="medium"
              {...register("username")}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
          </div>

          <div>
            <TextField
              fullWidth
              id="password"
              label={t("login-page.form.password.label")}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              size="medium"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword((prev) => !prev)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? (
                          <VisibilityOff style={{ fontSize: "22px" }} />
                        ) : (
                          <Visibility style={{ fontSize: "22px" }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>

          <div>
            <Button variant="text" size="small">
              {t("login-page.form.forgot-password")}
            </Button>
          </div>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            loading={isSubmitting}
          >
            {t("login-page.form.signin")}
          </Button>
        </form>

        <div className="mt-8 text-center text-sm text-muted">
          {t("login-page.form.didnot-have-account")}{" "}
          <Link
            to="#"
            className="text-primary font-medium hover:text-primary/80"
          >
            {t("login-page.form.signup")}
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default LoginPage;
