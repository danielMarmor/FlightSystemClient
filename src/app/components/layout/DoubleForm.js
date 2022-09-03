import {
    FormFrameBox,
    VerticalStack,
    HorizonStack,
    CenterBox
} from "../FormStyles";

export const primaryColor = '#15291b';

const DoubleForm = ({header, leftForm, rightFrom}) => {
    return (
        //FRAME
        <FormFrameBox sx={{
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
        }}>
            <VerticalStack>
                {/* HEADER */}
                <CenterBox flex={1}
                    sx={{
                        borderRadius: '4px',
                        backgroundColor: primaryColor,
                        paddingLeft: '10px'
                    }}>
                        {header}
                </CenterBox>
                {/* DOUBLE FORM */}
                <HorizonStack flex={10} marginTop={'5px'} spacing={2}>
                    {/* FORM LEFT */}
                    <VerticalStack marginRight={'10px'} flex={1}
                        sx={{
                            border: `4px solid ${primaryColor}`,
                            padding: '5px'
                        }}
                    >
                        {leftForm}
                    </VerticalStack>
                    {/* FORM RIGHT */}
                    <VerticalStack marginLeft={'10px'} flex={1}
                        sx={{
                            border: `4px solid ${primaryColor}`,
                            padding: '5px 5px 5px 5px'
                        }}
                    >
                        {rightFrom}
                    </VerticalStack>
                </HorizonStack>

            </VerticalStack>
        </FormFrameBox>
    )
}

export default DoubleForm;
