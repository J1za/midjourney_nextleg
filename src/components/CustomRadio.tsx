import {
    Box,
    useRadio,
    Button
} from "@chakra-ui/react";

function CustomRadio(props: any) {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label" w='100%' marginInlineStart='0 !important'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderRadius="md"
                transition='.3s'
                userSelect='none'
                fontWeight={500}
                bg='gray.400'
                _checked={{
                    bg: "teal.600",
                    color: "white",
                    borderColor: "teal.600"
                }}
                px={5}
                py={2}
                onClick={props.onClick}
            >
                {props.children}
            </Box>
        </Box>
    );
}

export default CustomRadio