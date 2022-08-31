import {
    CustomToolbar,
    CustomToolbarTitle,
    ToolbarChildContainer,
} from "./enhancedTableToolbar/CustomComponents";
import { Button } from "@mui/material";

const EnhancedTableToolbar = ({
    toolbarTitle,
    toolbarButtonText,
    toolbarButtonOnClick,
    isSubmitting,
    children,
}) => {
    return (
        <CustomToolbar>
            <ToolbarChildContainer>
                <CustomToolbarTitle>{toolbarTitle}</CustomToolbarTitle>
                <Button variant='text' color='secondary' onClick={toolbarButtonOnClick} disabled={isSubmitting}>
                    {toolbarButtonText}
                </Button>
            </ToolbarChildContainer>
            {children}
        </CustomToolbar>
    );
};

export default EnhancedTableToolbar;