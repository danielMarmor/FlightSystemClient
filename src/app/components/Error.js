import { CenterBox, SubHeaderTypography } from "./FormStyles";

const errorColor = 'black';

const Error = () => {
    return (
        <CenterBox>
            <SubHeaderTypography sx={{ color: errorColor, fontWeight: '800' }}>
                Error !
            </SubHeaderTypography>
        </CenterBox>
    )

}

export default Error;