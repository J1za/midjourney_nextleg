import { useState } from 'react';
import { doc } from 'firebase/firestore';
import { db } from '@/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import {
    HStack,
    useRadioGroup,
    useToast
} from "@chakra-ui/react";
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from "@/hooks/useActions";
import CustomRadio from './CustomRadio';
import { IButtonsSetting } from '@/store/slices/buttonsSetting.slice';


function ButtonsSetting() {
    const toast = useToast();
    const { buttonsSettingInfo: { variant, checkedSettings } } = useTypedSelector(state => state);
    const { changeVariant, changeStyle } = useActions();
    const [value, loading, error] = useDocument(
        doc(db, 'buttons', 'all'),
        {
            snapshotListenOptions: { includeMetadataChanges: true },
        }
    );
    const dataButtons = value?.data() as IButtonsSetting
    const handleChangeVariant = (name: string, code: string) => {
        changeVariant({ name, code })
    }
    const handleChangeStyle = (name: string, code: string) => {
        changeStyle({ name, code })
    }
    const { getRootProps: getRootPropsVersion, getRadioProps } = useRadioGroup({
        name: "btnVersion",
        defaultValue: variant.name
    });
    const { getRootProps: getRootPropsStyle, getRadioProps: getRadioPropsStyle } = useRadioGroup({
        name: "btnStyle"
    });

    const group1 = getRootPropsVersion();
    const group2 = getRootPropsStyle();
    return (
        <div className={`flex gap-5 overflow-hidden transition-all ${!checkedSettings ? 'max-h-0' : 'max-h-44'}`}>
            <HStack {...group1} className='!grid max-h-44 gap-1 auto-rows-min overflow-y-auto p-4 pl-0 pt-0'>
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
            <HStack {...group2} className='!grid max-h-52 gap-1 auto-rows-min overflow-y-auto'>
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
        </div>
    )
}

export default ButtonsSetting;