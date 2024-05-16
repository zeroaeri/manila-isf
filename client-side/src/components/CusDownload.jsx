import { CusIconBtn } from "./CusButton";
import { DownloadOutlined } from "@mui/icons-material";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const CusDownload = ({ anchorEl, handleClick }) => {
    const open = Boolean(anchorEl);

    return (
        <CusIconBtn
            icon={
                <DownloadOutlined
                    sx={{ height: 20, width: 20, color: "#1C3055" }}
                />
            }
            aria-controls={open ? "fade-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            action={handleClick}
        />
    );
};

export default CusDownload;
