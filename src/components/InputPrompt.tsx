/* eslint-disable react/no-children-prop */
import { useState } from 'react';
import dynamic from 'next/dynamic'
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
    Tooltip
} from '@chakra-ui/react';
import { AiOutlineSend } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import { MdImageNotSupported } from "react-icons/md";
import useWindowDimensions from '@/hooks/useWindowDimensions';

function InputPrompt() {
    const [text, setText] = useState('');
    const [textLink, setTextLink] = useState('');
    const [openLinkInput, setOpenLinkInput] = useState<boolean>(false);
    const { thlInfo: { isLoadingPrompt } } = useTypedSelector(state => state);
    const { setLoadingPrompt } = useActions();
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');
    const { isMobile }: any = useWindowDimensions();
    const handleButtonAddText = (value: string) => {
        setText((text + value));
    };
    const sendImage = async () => {
        if (text.length > 0) {
            setLoadingPrompt(true);
            try {
                const response = !openLinkInput ? await tnl.imagine(text) : await tnl.img2img(text, textLink)
                setResponse(JSON.stringify(response, null, 2));
            } catch (e: any) {
                console.log(e);
                setError(e.message);
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
                </label>
                <form
                    onSubmit={e => {
                        e.preventDefault();
                    }}
                >
                    <FormControl isRequired className='flex flex-wrap items-center gap-2 sm:flex-nowrap'>
                        <InputGroup>
                            <Input
                                size='md'
                                bg='whitesmoke'
                                border={0}
                                fontSize={17}
                                required
                                value={text}
                                onChange={e => setText(e.target.value)}
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
                <div className='flex gap-1 mt-2'>
                    <button
                        className='px-4 py-1 text-white bg-gray-500 rounded hover:bg-gray-700'
                        onClick={() => handleButtonAddText('--v 4')}
                    >
                        --v 4
                    </button>
                    <button
                        className='px-4 py-1 text-white bg-gray-500 rounded hover:bg-gray-700'
                        onClick={() => handleButtonAddText('--v 5')}
                    >
                        --v 5
                    </button>
                    <button
                        className='px-4 py-1 text-white bg-gray-500 rounded hover:bg-gray-700'
                        onClick={() => handleButtonAddText('--')}
                    >
                        --
                    </button>
                </div>
            </div>
            {/* <pre>Response Message: {response}</pre>
          Error: {error} */}
            {isLoadingPrompt && <Loading />}
        </div>
    )
}

export default InputPrompt