import { Grid } from "@mui/material";
import { CusFormInput, CusModal, CusFreeMul } from "../components";
const AwardeeForms = ({
    label,
    form,
    open,
    setOpen,
    action,
    method,
    disabled,
    updated,
    curRow,
}) => {
    let cm = curRow ? curRow.members : [];

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
                    <Grid item xs={2} sm={8} md={6}>
                        <CusFormInput
                            name="name"
                            label="Awardee"
                            required={true}
                            placeholder={
                                "Given Name/Middle Initial/Family Name"
                            }
                            value={form.values.name}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.name}
                            touch={form.touched.name}
                            disabled={disabled}
                        />
                    </Grid>

                    <Grid item xs={2} sm={8} md={6}>
                        <CusFormInput
                            name="entitlement"
                            label="Entitlement Rights"
                            required={true}
                            placeholder={"e.g. Land Title"}
                            value={form.values.entitlement}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.entitlement}
                            touch={form.touched.entitlement}
                            disabled={disabled}
                        />
                    </Grid>

                    {cm.length > 0 && (
                        <Grid item xs={2} sm={8} md={12}>
                            <CusFreeMul
                                name="members"
                                label="Members"
                                placeholder={
                                    "Choose the member needed. Type and click enter to add new member."
                                }
                                onChange={(event, value) => {
                                    // if (method != "ADD") {
                                    //     form.setFieldValue("members", [
                                    //         ...JSON.parse(
                                    //             "[" +
                                    //                 cm.replace(/(\w+)/g, "$1") +
                                    //                 "]"
                                    //         )[0],
                                    //         ...value,
                                    //     ]);
                                    // }
                                    if (method != "ADD") {
                                        form.setFieldValue("members", value);
                                    }
                                }}
                                onBlur={form.handleBlur}
                                error={form.errors.members}
                                touch={form.touched.members}
                                disabled={disabled}
                                options={
                                    method != "ADD" && cm
                                        ? JSON.parse(
                                              "[" +
                                                  cm.replace(/(\w+)/g, "$1") +
                                                  "]"
                                          )[0]
                                        : []
                                }
                            />
                        </Grid>
                    )}

                    {method == "ADD" && (
                        <Grid item xs={2} sm={8} md={12}>
                            <CusFreeMul
                                name="members"
                                label="Members"
                                placeholder={"Click enter to add new member."}
                                onChange={(event, value) => {
                                    form.setFieldValue("members", value);
                                }}
                                onBlur={form.handleBlur}
                                error={form.errors.members}
                                touch={form.touched.members}
                                disabled={disabled}
                                options={[]}
                            />
                        </Grid>
                    )}
                    <Grid item xs={2} sm={4} md={6}>
                        <CusFormInput
                            name="amortization"
                            label="Monthly Amortization"
                            placeholder={"0"}
                            value={form.values.amortization}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.amortization}
                            touch={form.touched.amortization}
                            disabled={disabled}
                            type="number"
                            inputProps={{ min: 0, step: "any" }}
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={6}>
                        <CusFormInput
                            name="arrears"
                            label="Arrears"
                            placeholder={"0"}
                            value={form.values.arrears}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.arrears}
                            touch={form.touched.arrears}
                            disabled={disabled}
                            type="number"
                            inputProps={{ min: 0, step: "any" }}
                        />
                    </Grid>

                    <Grid item xs={2} sm={4} md={12}>
                        <CusFormInput
                            name="remarks"
                            label="Remarks"
                            placeholder={"Add remarks here..."}
                            value={form.values.remarks}
                            onChange={form.handleChange}
                            onBlur={form.handleBlur}
                            error={form.errors.remarks}
                            touch={form.touched.remarks}
                            disabled={disabled}
                            multiline={true}
                        />
                    </Grid>
                </Grid>
            }
        />
    );
};

export default AwardeeForms;
