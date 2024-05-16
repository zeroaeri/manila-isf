import { Grid } from "@mui/material";
import { CusFormInput, CusSelect, CusModal } from "../components";
import { useData } from "../DataContext";
const EstateForms = ({
    label,
    form,
    open,
    setOpen,
    action,
    method,
    disabled,
}) => {
    const { districts, brgys } = useData();
    const statList = [
        "Occupied by Awardees",
        "Pending Occupation",
        "Under Construction",
        "Pending Construction",
    ];

    let dstList = [];
    districts.map((dst) => {
        dstList.push(dst.name);
    });
    dstList.sort((a, b) => a - b);

    let zoneList = [];
    let startZone = 0;
    let endZone = 0;
    districts.map((dst) => {
        if (dst.name == form.values.district) {
            startZone = dst.startZone;
            endZone = dst.endZone;
        }
    });
    for (let i = startZone; i <= endZone; i++) {
        zoneList.push(i);
    }

    let brgyList = [];
    let startBrgy = 0;
    let endBrgy = 0;

    brgys.map((data) => {
        if (data.zone == form.values.zone) {
            startBrgy = data.min;
            endBrgy = data.max;
        }
    });
    for (let i = startBrgy; i <= endBrgy; i++) {
        brgyList.push(i);
    }

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
                    <Grid item xs={2} sm={4} md={4}>
                        <CusFormInput
                            name="name"
                            label="Estate Name"
                            required={true}
                            placeholder={"Juan"}
                            value={form.values.name}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.name}
                            touch={form.touched.name}
                            disabled={disabled}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <CusFormInput
                            name="housingQuan"
                            label="No. of Housing"
                            required={true}
                            placeholder={"1"}
                            value={form.values.housingQuan}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.housingQuan}
                            touch={form.touched.housingQuan}
                            disabled={disabled}
                            type="number"
                            inputProps={{ min: 1, max: 1000 }}
                        />
                    </Grid>
                    <Grid item xs={2} sm={8} md={4}>
                        <CusSelect
                            name="status"
                            label="Status"
                            required={true}
                            value={form.values.status}
                            onChange={form.handleChange}
                            items={statList}
                            onBlur={form.handleBlur}
                            error={form.errors.status}
                            touch={form.touched.status}
                            disabled={disabled}
                        />
                    </Grid>

                    <Grid item xs={2} sm={8} md={8}>
                        <CusFormInput
                            name="address"
                            label="Address"
                            required={true}
                            placeholder={
                                "House No. / Block No. / Lot No. / Street No."
                            }
                            value={form.values.address}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.address}
                            touch={form.touched.address}
                            disabled={disabled}
                        />
                    </Grid>
                    <Grid item xs={2} sm={8} md={4}>
                        <CusFormInput
                            name="sqm"
                            label="Square Meters"
                            required={true}
                            placeholder={"0"}
                            value={form.values.sqm}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.sqm}
                            touch={form.touched.sqm}
                            disabled={disabled}
                            endAdornment={<div>sq. m</div>}
                            type="number"
                            inputProps={{ min: 0, step: "any" }}
                        />
                    </Grid>
                    <Grid item xs={2} sm={8} md={4}>
                        <CusSelect
                            name="district"
                            label="District"
                            required={true}
                            value={form.values.district}
                            onChange={form.handleChange}
                            items={dstList}
                            onBlur={form.handleBlur}
                            error={form.errors.district}
                            touch={form.touched.district}
                            disabled={disabled}
                        />
                    </Grid>

                    <Grid item xs={2} sm={4} md={4}>
                        <CusSelect
                            name="zone"
                            label="Zone"
                            required={true}
                            value={form.values.zone}
                            onChange={form.handleChange}
                            items={zoneList}
                            onBlur={form.handleBlur}
                            error={form.errors.zone}
                            touch={form.touched.zone}
                            disabled={
                                form.values.district == ""
                                    ? true
                                    : false || disabled
                            }
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4}>
                        <CusSelect
                            name="brgy"
                            label="Brgy"
                            required={true}
                            value={form.values.brgy}
                            onChange={form.handleChange}
                            items={brgyList}
                            onBlur={form.handleBlur}
                            error={form.errors.brgy}
                            touch={form.touched.brgy}
                            disabled={
                                form.values.district == ""
                                    ? true
                                    : false || form.values.zone == ""
                                    ? true
                                    : false || disabled
                            }
                        />
                    </Grid>
                </Grid>
            }
        />
    );
};

export default EstateForms;
