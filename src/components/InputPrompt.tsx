import { useState } from 'react';
import { tnl } from '@/services/core/nextLeg';
import Loading from '@/components/Loading';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from "@/hooks/useActions";
import {
    Button,
    Input,
    FormControl,
} from '@chakra-ui/react';
function InputPrompt() {
    const [text, setText] = useState('');
    const { thlInfo: { isLoadingPrompt } } = useTypedSelector(state => state);
    const { setLoadingPrompt } = useActions();
    const [error, setError] = useState('');
    const [response, setResponse] = useState('');
    const handleButtonAddText = (value: string) => {
        setText((text + value));
    };
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
                    <FormControl isRequired display='flex' alignItems='center' gap={2}>
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
                        <Button w="200px" my="2" type="submit" colorScheme='messenger'
                            onClick={async () => {
                                text.length > 0 &&
                                    setLoadingPrompt(true);
                                try {
                                    const response = await tnl.imagine(text)
                                    setResponse(JSON.stringify(response, null, 2));
                                } catch (e: any) {
                                    console.log(e);
                                    setError(e.message);
                                }
                            }}
                        >
                            {isLoadingPrompt ? 'Submitting...' : 'Submit'}
                        </Button>
                    </FormControl>
                </form>
                <div className='flex gap-1'>
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