import { Grid } from "@mui/material";
import { CusFormInput, CusSelect, CusModal } from "../components";

const DistrictForms = ({
    label,
    form,
    open,
    setOpen,
    action,
    method,
    disabled,
    updated,
}) => {
    return (
        <CusModal
            label={label}
            setOpen={setOpen}
            open={open}
            form={form}
            action={action}
            method={method}
            updated={updated}
            addFormLayout={
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 1, sm: 8, md: 12 }}
                >
                    <Grid item xs={2} sm={8} md={4}>
                        <CusFormInput
                            name="name"
                            label="District Number"
                            required={true}
                            placeholder={"1"}
                            value={form.values.name}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.name}
                            touch={form.touched.name}
                            disabled={disabled}
                            type="number"
                            inputProps={{ min: 1, max: 10 }}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <CusFormInput
                            name="startZone"
                            label="Start Zone"
                            required={true}
                            placeholder={"1"}
                            value={form.values.startZone}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.startZone}
                            touch={form.touched.startZone}
                            disabled={disabled}
                            type="number"
                            inputProps={{ min: 1, max: 100 }}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <CusFormInput
                            name="endZone"
                            label="End Zone"
                            required={true}
                            placeholder={"1"}
                            value={form.values.endZone}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.endZone}
                            touch={form.touched.endZone}
                            disabled={disabled}
                            type="number"
                            inputProps={{ min: 1, max: 100 }}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                        <CusFormInput
                            name="startBrgy"
                            label="Start Barangay"
                            required={true}
                            placeholder={"1"}
                            value={form.values.startBrgy}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.startBrgy}
                            touch={form.touched.startBrgy}
                            disabled={disabled}
                            type="number"
                            inputProps={{ min: 1, max: 1000 }}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                        <CusFormInput
                            name="endBrgy"
                            label="End Barangay"
                            required={true}
                            placeholder={"1"}
                            value={form.values.endBrgy}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.endBrgy}
                            touch={form.touched.endBrgy}
                            disabled={disabled}
                            type="number"
                            inputProps={{ min: 1, max: 1000 }}
                        />
                    </Grid>
                </Grid>
            }
        />
    );
};

export default DistrictForms;
