/*
 * В приложении есть preloader который показывается в момент выполнения запросов.
 * Предположим что запрос будет выполнен очень быстро, тогда preloader отобразится на мгновение.
 * Написать React-хук usePreloaderShow, который будет показывать preloader минимум на 1 секунду.
*/

import { useState } from 'react'

export function useLoaderShow(
    timeout: number = 1000
) {

    const [isPreloaderShow, setIsPreloaderShow] = useState(true)

    setTimeout(() => {
        setIsPreloaderShow(false)
    }, timeout)

    // useEffect(() => {
    //     const timeoutId = setTimeout(() => {
    //         setIsPreloaderShow(false)
    //     }, timeout)
    //
    //     return () => {
    //         clearTimeout(timeoutId)
    //     }
    // }, [timeout])

    return { isPreloaderShow, setIsPreloaderShow }
}
