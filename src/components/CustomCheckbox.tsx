import {
    Box,
    useCheckbox,
    Button,
    chakra,
    Flex,
    Text
} from "@chakra-ui/react";

function CustomCheckbox(props: any) {
    const { getInputProps, getLabelProps, htmlProps } =
        useCheckbox(props)
    return (

        <Box as="label" w='100%' marginInlineStart='0 !important' {...htmlProps}>
            <input {...getInputProps()} hidden />
            <Box
                style={{ userSelect: 'none' }}
                cursor="pointer"
                borderRadius="md"
                userSelect='none'
                fontWeight={500}
                transition='.2s'
                bg='gray.400'
                _checked={{
                    bg: "teal.600",
                    color: "white",
                    borderColor: "teal.600"
                }}
                px={5}
                py={2}
                {...getLabelProps()}
                onClick={props.onClick}
            >
                {props.children}
            </Box>
        </Box>
    );
}

export default CustomCheckbox