import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { makeStyles } from "@mui/styles";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { FormField, formFields } from "../formConfig";

const useStyles = makeStyles(() => ({
  phoneInput: {
    marginTop: "16px",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    marginBottom: "5px",
    padding: "0px 14px",

    "& input": {
      border: "none",
      borderRadius: "4px",
      padding: "16.5px 14px",
      background: "transparent",
      outline: "none",
    },
  },
}));

const RegistrationForm: React.FC = () => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = (values: Record<string, any>) => {
    const errors: Record<string, any> = {};
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\+\d{12}$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone number must have exactly 10 digits";
    }
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phoneNumber: "",
    },
    validationSchema: Yup.object().shape(
      formFields.reduce((schema, field) => {
        schema[field.name] = field.validation;
        return schema;
      }, {} as Record<string, any>)
    ),
    validate,
    onSubmit: (values) => {
      console.log("Registration Successful", values);
      navigate("/login");
    },
  });

  return (
    <Container maxWidth="sm">
      <Box
        display={"flex"}
        alignItems={"center"}
        flexDirection={"column"}
        sx={{ boxShadow: 3, borderRadius: "16px" }}
        p={4}
      >
        <Typography variant="h4" align="center" fontWeight={"600"}>
          Registration
        </Typography>
        <Box pt={1.5}>
          <form onSubmit={formik.handleSubmit}>
            {formFields.map((field: FormField) => (
              <TextField
                key={field.name}
                fullWidth
                id={field.name}
                label={field.label}
                type={
                  field.showPasswordToggle &&
                  field.name === "password" &&
                  showPassword
                    ? "text"
                    : field.type
                }
                variant="outlined"
                margin="normal"
                error={
                  formik.touched[field.name as keyof typeof formik.touched] &&
                  Boolean(
                    formik.errors[field.name as keyof typeof formik.errors]
                  )
                }
                helperText={
                  formik.touched[field.name as keyof typeof formik.touched] &&
                  formik.errors[field.name as keyof typeof formik.errors]
                }
                InputProps={
                  field.showPasswordToggle && field.name === "password"
                    ? {
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }
                    : undefined
                }
                {...formik.getFieldProps(field.name)}
              />
            ))}

            <PhoneInput
              international
              label="phone"
              className={classes.phoneInput}
              placeholder="Enter your phone number"
              value={formik.values.phoneNumber}
              onChange={(value) => formik.setFieldValue("phoneNumber", value)}
            />
            {formik.errors.phoneNumber && formik.touched.phoneNumber && (
              <div style={{ color: "#d32f2f", fontSize: "12px" }}>
                {formik.errors.phoneNumber}
              </div>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              style={{ marginTop: "16px" }}
            >
              Register
            </Button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default RegistrationForm;
