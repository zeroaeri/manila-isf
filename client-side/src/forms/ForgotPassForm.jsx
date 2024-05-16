import { Grid } from "@mui/material";
import { CusFormInput, CusModal } from "../components";
const ForgotPassForm = ({
    label,
    form,
    open,
    setOpen,
    action,
    method = "PROCEED",
    disabled,
}) => {
    return (
        <CusModal
            label={label}
            setOpen={setOpen}
            open={open}
            form={form}
            action={action}
            method={method}
            addFormLayout={
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 1, sm: 8, md: 12 }}
                >
                    <Grid item sm={12} md={12}>
                        <CusFormInput
                            name="email"
                            label="Email"
                            required={true}
                            value={form.values.email}
                            onChange={form.handleChange}
                            placeholder={"juan@gmail.com"}
                            onBlur={form.handleBlur}
                            error={form.errors.email}
                            touch={form.touched.email}
                            disabled={method == 'EDIT'? true : false}
                        />
                    </Grid>

                    <Grid item sm={12} md={6}>
                        <CusFormInput
                            name="password"
                            label="New Password"
                            required={true}
                            placeholder={"•••••••"}
                            type={"password"}
                            value={form.values.password}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.password}
                            touch={form.touched.password}
                        />
                    </Grid>
                    <Grid item sm={12} md={6}>
                        <CusFormInput
                            name="conpass"
                            label="Confirm New Password"
                            required={true}
                            placeholder={"•••••••"}
                            type={"password"}
                            value={form.values.conpass}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.conpass}
                            touch={form.touched.conpass}
                        />
                    </Grid>
                </Grid>
            }
        />
    );
};

export default ForgotPassForm;
