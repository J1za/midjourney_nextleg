import { doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import {
    HStack,
    useRadioGroup,
    Skeleton
} from "@chakra-ui/react";
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from "@/hooks/useActions";
import CustomRadio from './CustomRadio';
import { IButtonsSetting } from '@/store/slices/buttonsSetting.slice';


function ButtonsSetting() {
    const { buttonsSettingInfo: { variant, checkedSettings } } = useTypedSelector(state => state);
    const { changeVariant, changeStyle, changeC3, changeC4, changeC5, changeC6, changeC7 } = useActions();
    const [value, loading, error] = useDocument(
        doc(db, 'buttons', 'all'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    const dataButtons = value?.data() as IButtonsSetting;
    console.log(dataButtons)
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
    const { getRootProps: getRootPropsC7, getRadioProps: getRadioPropsC7 } = useRadioGroup({
        name: "btnC7"
    })

    const group1 = getRootPropsVersion();
    const group2 = getRootPropsStyle();
    const group3 = getRootPropsC3();
    const group4 = getRootPropsC4();
    const group5 = getRootPropsC5();
    const group6 = getRootPropsC6();
    const group7 = getRootPropsC7();

    return (
        <div className={`flex flex-wrap gap-5 overflow-hidden transition-all ${!checkedSettings ? 'max-h-0' : 'max-h-[2000px]'}`}>
            <HStack  {...group1} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto p-4 pl-0 pt-0'>
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
            <HStack {...group2} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto p-4 pl-0 pt-0 opacity-60 select-none pointer-events-none'>
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
            <HStack {...group3} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto p-4 pl-0 pt-0 opacity-60 select-none pointer-events-none'>
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
            <HStack {...group4} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto p-4 pl-0 pt-0 opacity-60 select-none pointer-events-none'>
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
            <HStack {...group5} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto p-4 pl-0 pt-0 opacity-60 select-none pointer-events-none'>
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
            <HStack {...group6} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto p-4 pl-0 pt-0 opacity-60 select-none pointer-events-none'>
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
            <HStack {...group7} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto p-4 pl-0 pt-0 opacity-60 select-none pointer-events-none'>
                {!loading &&
                    dataButtons.buttons.c7.map((el) => {
                        const radio = getRadioPropsC7({ value: el.name });
                        return (
                            <CustomRadio onClick={() => handleChangeC7(el.name, el.code)} key={el.code} {...radio}>
                                {el.name}
                            </CustomRadio>
                        );
                    })
                }
            </HStack>
            <Skeleton borderRadius={6} className='w-full sm:w-60 h-44 sm:ml-auto' />
        </div>
    )
}

export default ButtonsSetting;