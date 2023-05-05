/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import { tnl } from '@/services/core/nextLeg';
import Loading from '@/components/Loading';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from "@/hooks/useActions";
import {
    Button,
    Input,
    FormControl,
    InputGroup,
    InputRightElement,
    Tooltip,
    InputLeftAddon,
    Checkbox
} from '@chakra-ui/react';
import { AiOutlineSend } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { MdImageNotSupported } from "react-icons/md";
import useWindowDimensions from '@/hooks/useWindowDimensions';
import ButtonsSetting from '@/components/ButtonsSetting';
import { useToast } from '@chakra-ui/react';
import QueueOrder from './QueueOrder';
import { useGetUser } from '@/hooks/useGetUser';
import db from '@/services/core/db.service';
import { useGetQueueFirebase } from '@/hooks/useGetQueueFirebase';

function InputPrompt() {
    const { uid } = useGetUser();
    const { thlInfo: { isLoadingPrompt, newRequest }, buttonsSettingInfo: { variant, style, checkedSettings, c3, c4, c5, c6, c7 } } = useTypedSelector(state => state);
    const { setLoadingPrompt, setCheckedSetting, setNewRequest } = useActions();
    const { queue } = useGetQueueFirebase();
    const toast = useToast();
    const [text, setText] = useState<string>('');
    const [textLink, setTextLink] = useState<string>('');
    const [openLinkInput, setOpenLinkInput] = useState<boolean>(false);
    const { isMobile }: any = useWindowDimensions();
    const handleOnChangeText = (value: string) => {
        setText(value);
    };
    const sendImage = async () => {
        const textInput: string = `${text} ${variant.code} ${style.code}`
        if (text.length > 0) {
            setLoadingPrompt(true);
            try {
                const response = !openLinkInput ? await tnl.imagine(textInput, uid ?? '') : await tnl.img2img(textInput, textLink, uid ?? '');
                db.setDocument('queue', response.messageId, {
                    prompt: textInput,
                    id: response.messageId
                })
                setNewRequest({ prompt: textInput, messageId: response.messageId })
            } catch (e: any) {
                setLoadingPrompt(false);
                toast({
                    position: 'top',
                    description: e.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }

    }
    return (
        <div className='relative'>
            <div>
                <label
                    htmlFor='email'
                    className='block mb-2 text-lg font-medium leading-5'
                >
                    Prompt
                    <Checkbox size='md' marginLeft={10} colorScheme='green' defaultChecked={checkedSettings} onChange={(e) => setCheckedSetting(e.target.checked)}>
                        Settings
                    </Checkbox>
                </label>
                <div className='flex flex-wrap py-2'>
                    <b>Queue:</b>
                    <div className='inline-flex flex-wrap ml-2'>
                        {queue?.map(({ id, prompt }, index) => (
                            <div key={id}>
                                <QueueOrder messageId={id} prompt={prompt} />
                                {index !== newRequest.length - 1 && " , "}
                            </div>
                        ))}

                    </div>
                </div>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                    }}
                >
                    <FormControl isRequired className='flex flex-wrap items-center gap-2 sm:flex-nowrap'>
                        <InputGroup overflowY='auto'>
                            {variant.code && checkedSettings &&
                                <InputLeftAddon paddingX={1} children={variant.code} />
                            }
                            {style.code && checkedSettings &&
                                <InputLeftAddon borderRadius={0} paddingX={1} children={style.code} />
                            }
                            {c3.code && checkedSettings &&
                                <InputLeftAddon borderRadius={0} paddingX={1} children={c3.code} />
                            }
                            {c4.code && checkedSettings &&
                                <InputLeftAddon borderRadius={0} paddingX={1} children={c4.code} />
                            }
                            {c5.code && checkedSettings &&
                                <InputLeftAddon borderRadius={0} paddingX={1} children={c5.code} />
                            }
                            {c6.code && checkedSettings &&
                                <InputLeftAddon borderRadius={0} paddingX={1} children={c6.code} />
                            }
                            {c7.length > 0 && checkedSettings &&
                                c7.map(el => (
                                    <InputLeftAddon key={el.code} borderRadius={0} paddingX={1} children={el.code} />
                                ))
                            }
                            <Input
                                size='md'
                                bg='whitesmoke'
                                border={0}
                                fontSize={17}
                                required={true}
                                value={text}
                                onChange={e => handleOnChangeText(e.target.value)}
                                placeholder='Enter your prompt here'
                                type="text"
                            />
                        </InputGroup>
                        <InputGroup maxW={openLinkInput ? '40%' : isMobile ? '100%' : 0} flexShrink={0}>
                            <Input
                                size='md'
                                bg='whitesmoke'
                                border={0}
                                fontSize={17}
                                required={false}
                                value={textLink}
                                onChange={e => setTextLink(e.target.value)}
                                placeholder='Enter your link image here'
                                type="text"
                                opacity={openLinkInput ? 1 : isMobile ? 1 : 0}
                            />
                            {!isMobile &&
                                <Tooltip label={openLinkInput ? 'remove an image (via link)' : 'insert an image (via link)'}>
                                    <InputRightElement right={openLinkInput ? 0 : 2} transition={'.2s'} children={
                                        !openLinkInput ?
                                            <RiImageAddFill size={30} cursor='pointer' onClick={() => setOpenLinkInput(true)} /> :
                                            <MdImageNotSupported size={30} cursor='pointer' onClick={() => (setOpenLinkInput(false), setTextLink(''))}
                                            />
                                    } />
                                </Tooltip>
                            }
                        </InputGroup>

                        <Button className='w-full sm:w-48' type="submit" colorScheme='messenger' flexShrink={0}
                            onClick={() => sendImage()}
                            rightIcon={<AiOutlineSend size={20} style={{ position: 'absolute', right: 20, bottom: 8 }} />}
                        >
                            {isLoadingPrompt ? 'Submitting...' : 'Submit'}
                        </Button>
                    </FormControl>
                </form>
                <div className='mt-2'>
                    <ButtonsSetting />
                </div>
            </div>
            {isLoadingPrompt && <Loading />}
        </div>
    )
}

export default InputPrompt