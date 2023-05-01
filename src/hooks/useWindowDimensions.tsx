import {
    useWindowWidth,
} from '@react-hook/window-size'

const useWindowDimensions = () => {
    const width = useWindowWidth()
    if (typeof window === 'undefined') {
        return false
    }
    const isDesktop = width >= 1680;
    const isDesktopSmall = width <= 1439;
    const isLaptop = width <= 1199;
    const isLaptopSmall = width <= 1024;
    const isTable = width <= 768;
    const isMobile = width <= 639;
    return {
        width,

        isDesktop,
        isLaptopSmall,
        isDesktopSmall,
        isLaptop,
        isTable,
        isMobile
    }
}

export default useWindowDimensions