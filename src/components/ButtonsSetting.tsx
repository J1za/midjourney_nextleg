import { doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import {
    HStack,
    useRadioGroup,
    Skeleton,
    Text,
    Box,
    useCheckboxGroup
} from "@chakra-ui/react";
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from "@/hooks/useActions";
import CustomRadio from './CustomRadio';
import CustomCheckbox from './CustomCheckbox';
import { IButtonsSetting } from '@/store/slices/buttonsSetting.slice';
import { useGetUser } from '@/hooks/useGetUser';

function ButtonsSetting() {
    const { isPremium } = useGetUser();
    const { buttonsSettingInfo: { variant, checkedSettings } } = useTypedSelector(state => state);
    const { changeVariant, changeStyle, changeC3, changeC4, changeC5, changeC6, changeC7 } = useActions();
    const [value, loading, error] = useDocument(
        doc(db, 'buttons', 'all'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    const dataButtons = value?.data() as IButtonsSetting;
    const handleChangeVariant = (name: string, code: string) => {
        changeVariant({ name, code })
    }
    const handleChangeStyle = (name: string, code: string) => {
        changeStyle({ name, code })
    }
    const handleChangeC3 = (name: string, code: string) => {
        changeC3({ name, code })
    }
    const handleChangeC4 = (name: string, code: string) => {
        changeC4({ name, code })
    }
    const handleChangeC5 = (name: string, code: string) => {
        changeC5({ name, code })
    }
    const handleChangeC6 = (name: string, code: string) => {
        changeC6({ name, code })
    }
    const handleChangeC7 = (name: string, code: string) => {
        changeC7({ name, code })
    }

    const { getRootProps: getRootPropsVersion, getRadioProps } = useRadioGroup({
        name: "btnVersion",
        defaultValue: variant.name
    });
    const { getRootProps: getRootPropsStyle, getRadioProps: getRadioPropsStyle } = useRadioGroup({
        name: "btnStyle"
    });
    const { getRootProps: getRootPropsC3, getRadioProps: getRadioPropsC3 } = useRadioGroup({
        name: "btnC3"
    })
    const { getRootProps: getRootPropsC4, getRadioProps: getRadioPropsC4 } = useRadioGroup({
        name: "btnC4"
    })
    const { getRootProps: getRootPropsC5, getRadioProps: getRadioPropsC5 } = useRadioGroup({
        name: "btnC5"
    })
    const { getRootProps: getRootPropsC6, getRadioProps: getRadioPropsC6 } = useRadioGroup({
        name: "btnC6"
    })
    const { value: valueCheckbox, getCheckboxProps } = useCheckboxGroup();
    const group1 = getRootPropsVersion();
    const group2 = getRootPropsStyle();
    const group3 = getRootPropsC3();
    const group4 = getRootPropsC4();
    const group5 = getRootPropsC5();
    const group6 = getRootPropsC6();
    const group7 = getCheckboxProps();

    return (
        <div className={`flex flex-wrap gap-5 overflow-hidden transition-all ${!checkedSettings ? 'max-h-0' : 'max-h-[2000px]'}`}>

            <Box>
                <Text fontSize='lg' fontWeight={500} marginBottom={1}>Version</Text>
                <HStack  {...group1} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto overflow-x-hidden p-4 pl-0 pt-0'>
                    {!loading &&
                        dataButtons.buttons.version.map((el) => {
                            const radio = getRadioProps({ value: el.name });
                            return (
                                <CustomRadio onClick={() => handleChangeVariant(el.name, el.code)} key={el.code} {...radio}>
                                    {el.name}
                                </CustomRadio>
                            );
                        })
                    }
                </HStack>
            </Box>
            <Box>
                <Text fontSize='lg' fontWeight={500} marginBottom={1}>Style</Text>
                <HStack {...group2} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto overflow-x-hidden p-4 pl-0 pt-0'>
                    {!loading &&
                        dataButtons.buttons.style.map((el) => {
                            const radio = getRadioPropsStyle({ value: el.name });
                            return (
                                <CustomRadio onClick={() => handleChangeStyle(el.name, el.code)} key={el.code} {...radio}>
                                    {el.name}
                                </CustomRadio>
                            );
                        })
                    }
                </HStack>
            </Box>
            <Box>
                <Text fontSize='lg' fontWeight={500} marginBottom={1}>Mode</Text>
                <HStack {...group3} className={`!grid max-h-44 gap-1 auto-rows-min overflow-y-auto overflow-x-hidden p-4 pl-0 pt-0 ${isPremium ? '' : 'opacity-60 select-none pointer-events-none'}`}>
                    {!loading &&
                        dataButtons.buttons.c3.map((el) => {
                            const radio = getRadioPropsC3({ value: el.name });
                            return (
                                <CustomRadio onClick={() => handleChangeC3(el.name, el.code)} key={el.code} {...radio}>
                                    {el.name}
                                </CustomRadio>
                            );
                        })
                    }
                </HStack>
            </Box>
            <Box>
                <Text fontSize='lg' fontWeight={500} marginBottom={1}>Art style</Text>
                <HStack {...group4} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto overflow-x-hidden p-4 pl-0 pt-0'>
                    {!loading &&
                        dataButtons.buttons.c4.map((el) => {
                            const radio = getRadioPropsC4({ value: el.name });
                            return (
                                <CustomRadio onClick={() => handleChangeC4(el.name, el.code)} key={el.code} {...radio}>
                                    {el.name}
                                </CustomRadio>
                            );
                        })
                    }
                </HStack>
            </Box>
            <Box>
                <Text fontSize='lg' fontWeight={500} marginBottom={1}>Emote</Text>
                <HStack {...group5} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto overflow-x-hidden p-4 pl-0 pt-0'>
                    {!loading &&
                        dataButtons.buttons.c5.map((el) => {
                            const radio = getRadioPropsC5({ value: el.name });
                            return (
                                <CustomRadio onClick={() => handleChangeC5(el.name, el.code)} key={el.code} {...radio}>
                                    {el.name}
                                </CustomRadio>
                            );
                        })
                    }
                </HStack>
            </Box>
            <Box>
                <Text fontSize='lg' fontWeight={500} marginBottom={1}>Colors</Text>
                <HStack {...group6} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto overflow-x-hidden p-4 pl-0 pt-0'>
                    {!loading &&
                        dataButtons.buttons.c6.map((el) => {
                            const radio = getRadioPropsC6({ value: el.name });
                            return (
                                <CustomRadio onClick={() => handleChangeC6(el.name, el.code)} key={el.code} {...radio}>
                                    {el.name}
                                </CustomRadio>
                            );
                        })
                    }
                </HStack>
            </Box>
            <Box>
                <Text fontSize='lg' fontWeight={500} marginBottom={1}>Location</Text>
                <HStack className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto overflow-x-hidden p-4 pl-0 pt-0'>
                    {!loading &&
                        dataButtons.buttons.c7.map((el) => {
                            return (
                                <CustomCheckbox key={el.code} {...getCheckboxProps({ value: el.name })} onClick={() => handleChangeC7(el.name, el.code)}>
                                    {el.name}
                                </CustomCheckbox>
                            );
                        })
                    }
                </HStack>
            </Box>
            <Skeleton borderRadius={6} className='w-full h-auto sm:w-60 sm:ml-auto' />
        </div>
    )
}

export default ButtonsSetting;